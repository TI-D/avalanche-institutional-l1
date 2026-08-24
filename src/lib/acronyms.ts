export type AcronymEntry = {
  term: string;
  standsFor: string;
  href: string;
};

export const ACRONYMS: Record<string, AcronymEntry> = {
  ValidatorManager: {
    term: "ValidatorManager",
    standsFor: "On-chain contract that initiates validator add, remove, and weight changes for an Avalanche L1.",
    href: "https://build.avax.network/docs/avalanche-l1s/validator-manager/contract",
  },
  PoAManager: {
    term: "PoAManager",
    standsFor: "Proof of Authority manager. The owner-gated contract that is allowed to change a permissioned L1 validator set.",
    href: "https://build.avax.network/docs/avalanche-l1s/validator-manager/contract",
  },
  "Subnet-EVM": {
    term: "Subnet-EVM",
    standsFor: "The Ethereum Virtual Machine implementation that runs as the execution engine on an Avalanche L1.",
    href: "https://build.avax.network/docs/avalanche-l1s",
  },
  AvalancheGo: {
    term: "AvalancheGo",
    standsFor: "The official Avalanche node client. Validators and RPC nodes both run this binary.",
    href: "https://build.avax.network/docs/nodes",
  },
  Teleporter: {
    term: "Teleporter",
    standsFor: "Application-level ICM contracts (TeleporterMessenger) used to send and receive cross-L1 messages.",
    href: "https://build.avax.network/docs/cross-chain/icm-contracts/overview",
  },
  TeleporterMessenger: {
    term: "TeleporterMessenger",
    standsFor: "The ICM contract interface applications call to send a cross-chain message.",
    href: "https://build.avax.network/docs/cross-chain/icm-contracts/overview",
  },
  "P-Chain": {
    term: "P-Chain",
    standsFor: "Platform Chain. The Primary Network chain that is the source of truth for validator sets and L1 conversion.",
    href: "https://build.avax.network/docs/api-reference/p-chain/txn-format",
  },
  "C-Chain": {
    term: "C-Chain",
    standsFor: "Contract Chain. The Primary Network EVM chain.",
    href: "https://build.avax.network/docs/api-reference/c-chain/api",
  },
  "X-Chain": {
    term: "X-Chain",
    standsFor: "Exchange Chain. The Primary Network chain used for asset creation and transfers.",
    href: "https://build.avax.network/docs/api-reference/x-chain/txn-format",
  },
  "JSON-RPC": {
    term: "JSON-RPC",
    standsFor: "JSON Remote Procedure Call. The API wallets and services use to talk to an EVM node.",
    href: "https://build.avax.network/docs/api-reference/c-chain/api",
  },
  CloudHSM: {
    term: "CloudHSM",
    standsFor: "Cloud Hardware Security Module. Production path for keeping BLS and staking keys off the node disk.",
    href: "https://build.avax.network/docs/nodes",
  },
  NodeID: {
    term: "NodeID",
    standsFor: "The unique identity of an AvalancheGo node, derived from its staking TLS certificate.",
    href: "https://build.avax.network/docs/nodes",
  },
  "ACP-77": {
    term: "ACP-77",
    standsFor: "Avalanche Community Proposal 77, Reinventing Subnets. Defines L1 conversion and validator messages.",
    href: "https://github.com/avalanche-foundation/ACPs/tree/main/ACPs/77-reinventing-subnets",
  },
  "ACP-99": {
    term: "ACP-99",
    standsFor: "Avalanche Community Proposal 99. The standard Validator Manager contract interface.",
    href: "https://github.com/avalanche-foundation/ACPs/tree/main/ACPs/99-validatorsetmanager-contract",
  },
  Warp: {
    term: "Warp",
    standsFor: "Avalanche Warp Messaging. The BLS-signed primitive under ICM.",
    href: "https://build.avax.network/docs/cross-chain/avalanche-warp-messaging/overview",
  },
  ICM: {
    term: "ICM",
    standsFor: "Interchain Messaging. Native cross-L1 communication verified against P-Chain validator sets.",
    href: "https://build.avax.network/docs/cross-chain/avalanche-warp-messaging/overview",
  },
  EVM: {
    term: "EVM",
    standsFor: "Ethereum Virtual Machine. The execution environment Northstar uses so existing Ethereum tooling works.",
    href: "https://build.avax.network/docs/avalanche-l1s/evm-configuration",
  },
  RPC: {
    term: "RPC",
    standsFor: "Remote Procedure Call. The JSON-RPC interface for queries and transactions. Kept off validator hosts.",
    href: "https://build.avax.network/docs/api-reference/c-chain/api",
  },
  BLS: {
    term: "BLS",
    standsFor: "Boneh-Lynn-Shacham. The signature scheme Avalanche validators use for Warp messages and proofs of possession.",
    href: "https://build.avax.network/docs/cross-chain/avalanche-warp-messaging/deep-dive",
  },
  PoA: {
    term: "PoA",
    standsFor: "Proof of Authority. A permissioned validator set controlled by an owner, not an open staking market.",
    href: "https://build.avax.network/docs/avalanche-l1s/validator-manager/contract",
  },
  PoS: {
    term: "PoS",
    standsFor: "Proof of Stake. Validator membership and rewards determined by staked value.",
    href: "https://build.avax.network/docs/avalanche-l1s/validator-manager/contract",
  },
  HSM: {
    term: "HSM",
    standsFor: "Hardware Security Module. Production key custody for BLS and staking keys. Designed here, not faked.",
    href: "https://build.avax.network/docs/nodes",
  },
  KMS: {
    term: "KMS",
    standsFor: "Key Management Service. Implemented path for envelope-encrypting staking-key backups and disks.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  IaC: {
    term: "IaC",
    standsFor: "Infrastructure as Code. Terraform and Ansible that provision the L1 the same way every time.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  mTLS: {
    term: "mTLS",
    standsFor: "Mutual Transport Layer Security. Both client and server present certificates before RPC is allowed.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  ACP: {
    term: "ACP",
    standsFor: "Avalanche Community Proposal. The process used to specify protocol changes such as L1s.",
    href: "https://github.com/avalanche-foundation/ACPs",
  },
  FDE: {
    term: "FDE",
    standsFor: "Forward Deployed Engineer. Owns an institutional engagement from ambiguous request to working infrastructure.",
    href: "https://jobs.ashbyhq.com/ava-labs/444892f3-0872-4476-9d52-20c7f1b1f8d4",
  },
  NFT: {
    term: "NFT",
    standsFor: "Non-Fungible Token. Intentionally not what this reference builds.",
    href: "https://build.avax.network/docs",
  },
  DeFi: {
    term: "DeFi",
    standsFor: "Decentralized Finance. Intentionally not what this reference builds.",
    href: "https://build.avax.network/docs",
  },
  L1: {
    term: "L1",
    standsFor: "Layer 1. A sovereign Avalanche blockchain with its own validator set, converted from a Subnet via ACP-77.",
    href: "https://build.avax.network/docs/avalanche-l1s",
  },
  VM: {
    term: "VM",
    standsFor: "Virtual Machine. The execution engine an Avalanche chain runs, such as Subnet-EVM.",
    href: "https://build.avax.network/docs/primary-network/virtual-machines",
  },
  SG: {
    term: "SG",
    standsFor: "Security Group. Cloud firewall rules that keep validator ports off the public internet.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  CMK: {
    term: "CMK",
    standsFor: "Customer Managed Key. The KMS key that encrypts disks and staking-key backups.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  ENI: {
    term: "ENI",
    standsFor: "Elastic Network Interface. The private network attachment on each validator host.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  EBS: {
    term: "EBS",
    standsFor: "Elastic Block Store. Encrypted disks used for AvalancheGo data.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  VPC: {
    term: "VPC",
    standsFor: "Virtual Private Cloud. The isolated network the L1 nodes live in.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  NLB: {
    term: "NLB",
    standsFor: "Network Load Balancer. Internal front door for restricted RPC.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  ALB: {
    term: "ALB",
    standsFor: "Application Load Balancer. TLS-terminated entry for allowlisted operator access.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  CIDR: {
    term: "CIDR",
    standsFor: "Classless Inter-Domain Routing. The IP ranges allowed to reach RPC, Grafana, and the jump host.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  CIDRs: {
    term: "CIDRs",
    standsFor: "Classless Inter-Domain Routing blocks. Operator networks allowed through the firewall.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/deploy-l1",
  },
  TLS: {
    term: "TLS",
    standsFor: "Transport Layer Security. Also the staking certificate that defines an Avalanche NodeID.",
    href: "https://build.avax.network/docs/nodes",
  },
  SSH: {
    term: "SSH",
    standsFor: "Secure Shell. Administrative access, only from the jump host, never from the internet onto validators.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/operations",
  },
  SSO: {
    term: "SSO",
    standsFor: "Single Sign-On. How operators reach Grafana and the jump host.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/operations",
  },
  SIEM: {
    term: "SIEM",
    standsFor: "Security Information and Event Management. Where production logs and VPC flow records should land.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/operations",
  },
  NOC: {
    term: "NOC",
    standsFor: "Network Operations Center. The team that runs the validator failure and replacement runbooks.",
    href: "https://build.avax.network/docs/tooling/avalanche-deploy/operations",
  },
  Fuji: {
    term: "Fuji",
    standsFor: "Avalanche's public test network, used before mainnet ceremonies.",
    href: "https://build.avax.network/docs/tooling/faucet",
  },
};

export const ACRONYM_PATTERN = new RegExp(
  `\\b(${Object.keys(ACRONYMS)
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})s?\\b`,
  "g"
);

export function resolveAcronym(raw: string): AcronymEntry | null {
  if (ACRONYMS[raw]) return ACRONYMS[raw];
  if (raw.endsWith("s") && ACRONYMS[raw.slice(0, -1)]) return ACRONYMS[raw.slice(0, -1)];
  return null;
}
