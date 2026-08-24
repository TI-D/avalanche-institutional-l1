export const EVIDENCE_LEVELS = [
  "modeled",
  "source-written",
  "locally-executed",
  "fuji-executed",
  "aws-lab-executed",
  "externally-validated",
] as const;

export type EvidenceLevel = (typeof EVIDENCE_LEVELS)[number];

export type Capability = {
  id: string;
  name: string;
  level: EvidenceLevel;
  notes: string;
  evidence: string;
};

export const CLAIM_RULE =
  "No capability is called implemented, healthy, passed, or production-ready without a linked evidence artifact.";

export const capabilities: Capability[] = [
  {
    id: "docs-site",
    name: "Documentation site",
    level: "locally-executed",
    notes: "Next.js site builds and renders. That is the only locally executed surface today.",
    evidence: "npm ci && npm run build",
  },
  {
    id: "control-plane",
    name: "Ops console / operator scripts",
    level: "modeled",
    notes: "JSON file at CONTROL_PLANE_STATE. Buttons and ./scripts/* change that file. No AvalancheGo process is involved.",
    evidence: "src/lib/control-plane.ts",
  },
  {
    id: "validator-lifecycle-docs",
    name: "ValidatorManager / P-Chain lifecycle write-up",
    level: "source-written",
    notes: "The sequence is documented and matches Ava's ValidatorManager README. No repository code submits ConvertSubnetToL1Tx, RegisterL1ValidatorTx, or SetL1ValidatorWeightTx.",
    evidence: "docs/validator-lifecycle.md",
  },
  {
    id: "icm-contracts",
    name: "ICM application contracts",
    level: "source-written",
    notes: "Foundry tests cover origin authorization and relayer policy. Contracts have not been deployed to an L1.",
    evidence: "contracts/test/",
  },
  {
    id: "stage-2-local",
    name: "Local AvalancheGo L1s",
    level: "source-written",
    notes: "Wrapper scripts exist. ./scripts/local/up has not been run in this repository. No NodeIDs, chain IDs, or tx hashes are checked in.",
    evidence: "docs/stage-2-local.md",
  },
  {
    id: "terraform",
    name: "AWS Terraform modules",
    level: "source-written",
    notes: "Unvalidated design skeleton. Not applied. Known gaps are listed in docs/aws-kit-gaps.md.",
    evidence: "docs/aws-kit-gaps.md",
  },
  {
    id: "ansible",
    name: "Ansible AvalancheGo role",
    level: "source-written",
    notes: "Downloads an unverified GitHub tarball and binds HTTP to 127.0.0.1. Never executed.",
    evidence: "ansible/avalanchego/",
  },
  {
    id: "backup-restore",
    name: "Backup and restore",
    level: "modeled",
    notes: "./scripts/backup and ./scripts/restore stamp timestamps on the JSON model. No staking files are copied.",
    evidence: "scripts/backup",
  },
  {
    id: "recovery-drill",
    name: "Validator kill / restore drill",
    level: "modeled",
    notes: "Console destroy/restore flips validator.status. No process is killed. Consensus is not measured.",
    evidence: "src/lib/control-plane.ts",
  },
  {
    id: "observability",
    name: "Metrics, logs, alerts",
    level: "source-written",
    notes: "One EC2 placeholder and a CloudWatch log group. No scrape config, dashboard, or alert.",
    evidence: "terraform/monitoring/main.tf",
  },
  {
    id: "hsm",
    name: "Remote BLS / HSM signing",
    level: "source-written",
    notes: "Design notes only. TLS/NodeID custody and BLS signing are different key paths. Neither is wired.",
    evidence: "docs/production-readiness.md",
  },
  {
    id: "fuji",
    name: "Fuji dress rehearsal",
    level: "source-written",
    notes: "Plan in docs/stage-3-go-live.md. No Fuji transactions.",
    evidence: "docs/stage-3-go-live.md",
  },
  {
    id: "aws-lab",
    name: "AWS lab apply",
    level: "source-written",
    notes: "No account attached. terraform apply has not been run.",
    evidence: "docs/aws-kit-gaps.md",
  },
  {
    id: "external-review",
    name: "External validation",
    level: "source-written",
    notes: "No independent operator or security reviewer has signed off.",
    evidence: "docs/production-readiness.md",
  },
];

export function evidenceLabel(level: EvidenceLevel): string {
  switch (level) {
    case "modeled":
      return "Modeled";
    case "source-written":
      return "Source written";
    case "locally-executed":
      return "Locally executed";
    case "fuji-executed":
      return "Fuji executed";
    case "aws-lab-executed":
      return "AWS lab executed";
    case "externally-validated":
      return "Externally validated";
  }
}
