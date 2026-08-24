# Unvalidated skeleton. Jump SG has no host. One NAT in one AZ.
# Isolated subnets are unused. See docs/aws-kit-gaps.md.
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }
}

locals {
  azs = slice(data.aws_availability_zones.available.names, 0, 3)
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "l1" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags                 = merge(var.tags, { Name = "${var.name}-vpc", Tier = "institutional" })
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.l1.id
  tags   = merge(var.tags, { Name = "${var.name}-igw" })
}

resource "aws_subnet" "public" {
  count                   = 3
  vpc_id                  = aws_vpc.l1.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 6, count.index)
  availability_zone       = local.azs[count.index]
  map_public_ip_on_launch = false
  tags                    = merge(var.tags, { Name = "${var.name}-public-${count.index}", Tier = "public" })
}

resource "aws_subnet" "private" {
  count             = 3
  vpc_id            = aws_vpc.l1.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 6, count.index + 8)
  availability_zone = local.azs[count.index]
  tags              = merge(var.tags, { Name = "${var.name}-private-${count.index}", Tier = "validators" })
}

resource "aws_subnet" "isolated" {
  count             = 3
  vpc_id            = aws_vpc.l1.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 6, count.index + 16)
  availability_zone = local.azs[count.index]
  tags              = merge(var.tags, { Name = "${var.name}-isolated-${count.index}", Tier = "backup" })
}

resource "aws_eip" "nat" {
  domain = "vpc"
  tags   = merge(var.tags, { Name = "${var.name}-nat" })
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id
  tags          = merge(var.tags, { Name = "${var.name}-nat" })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.l1.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = merge(var.tags, { Name = "${var.name}-public-rt" })
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.l1.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
  tags = merge(var.tags, { Name = "${var.name}-private-rt" })
}

resource "aws_route_table_association" "public" {
  count          = 3
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = 3
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}

resource "aws_security_group" "validators" {
  name        = "${var.name}-validators"
  description = "Validators: P2P among themselves, metrics to monitoring, no public 9650"
  vpc_id      = aws_vpc.l1.id

  ingress {
    description = "Avalanche P2P between validators"
    from_port   = 9651
    to_port     = 9651
    protocol    = "tcp"
    self        = true
  }

  ingress {
    description     = "JSON-RPC only from RPC tier"
    from_port       = 9650
    to_port         = 9650
    protocol        = "tcp"
    security_groups = [aws_security_group.rpc.id]
  }

  ingress {
    description     = "Metrics to monitoring"
    from_port       = 9650
    to_port         = 9650
    protocol        = "tcp"
    security_groups = [aws_security_group.monitoring.id]
  }

  ingress {
    description     = "SSH from jump only"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.jump.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { Name = "${var.name}-sg-validators" })
}

resource "aws_security_group" "rpc" {
  name        = "${var.name}-rpc"
  description = "Restricted RPC. Public internet is not a principal."
  vpc_id      = aws_vpc.l1.id

  ingress {
    description = "mTLS-terminated RPC from allowlisted operator CIDRs"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.operator_cidrs
  }

  ingress {
    description     = "SSH from jump only"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.jump.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { Name = "${var.name}-sg-rpc" })
}

resource "aws_security_group" "monitoring" {
  name        = "${var.name}-monitoring"
  description = "Prometheus / Grafana, SSO only"
  vpc_id      = aws_vpc.l1.id

  ingress {
    description = "Grafana from operator CIDRs"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.operator_cidrs
  }

  ingress {
    description     = "SSH from jump only"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.jump.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { Name = "${var.name}-sg-monitoring" })
}

resource "aws_security_group" "jump" {
  name        = "${var.name}-jump"
  description = "Break-glass host. This is the only SSH ingress from operator CIDRs."
  vpc_id      = aws_vpc.l1.id

  ingress {
    description = "SSH from named operator networks"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.operator_cidrs
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { Name = "${var.name}-sg-jump" })
}
