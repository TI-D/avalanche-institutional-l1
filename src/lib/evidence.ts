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
    notes: "Next.js site builds and renders. AvalancheGo L1s, lifecycle, ICM delivery, and the host-failure restore are separate locally-executed rows.",
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
    id: "validator-lifecycle",
    name: "Validator add/remove on P-Chain",
    level: "locally-executed",
    notes: "Added NodeID-9tQ7G8jzvFGLGxSh8PuzySYh2pgKdnpg5 (RegisterL1ValidatorTx 26nvYesCtZBFPVzCGEXBgmbhFMJfywLzByDyMWYiSvGxFk8Psj) then removed it (SetL1ValidatorWeightTx 2WrycUE8CC4tTK3QwrwBUZgpY1SFdJYLdwXf7WTbaocViv8QFh). Signature aggregator must already be listening.",
    evidence: "evidence/runs/20260824T202726Z/transactions.json",
  },
  {
    id: "icm-contracts",
    name: "ICM application contracts",
    level: "locally-executed",
    notes: "Deployed Registry 0x55a4eDd8A2c051079b426E9fbdEe285368824a89 and Receiver 0xA4cD3b0Eb6E5Ab5d8CE4065BcCD70040ADAB1F00. setApproval(82731) produced Settlement ApprovalReceived in 0x13c7b1b0e88e50360558920bcd74e007854bc557bd484d20f2b36357ed2599fa. Foundry tests still cover auth.",
    evidence: "evidence/runs/20260824T202726Z/transactions.json",
  },
  {
    id: "stage-2-local",
    name: "Local AvalancheGo L1s",
    level: "locally-executed",
    notes: "avalanche-cli 1.9.6 local net: 2 primary nodes plus one extra AvalancheGo per L1. Heights increment when a tx is included. Idle 8s samples did not increment. Not a 5-validator quorum.",
    evidence: "evidence/runs/20260824T202726Z/manifest.json",
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
    level: "locally-executed",
    notes: "OpenBao -dev Transit wrapped the restic password. restic backup/restore of Settlement staking material matched sha256 and NodeID-BgLdV9zWyYUp6jp4RkxoDMvuMo6h8bj2w. Not AWS KMS / S3. ./scripts/backup is still the JSON model.",
    evidence: "evidence/runs/20260824T211518Z/test-results/backup.txt",
  },
  {
    id: "remote-signer",
    name: "Remote BLS signer prototype",
    level: "locally-executed",
    notes: "Go gRPC server implements AvalancheGo signer.proto. Official rpcsigner client verified Sign and SignProofOfPossession. Key stayed in the signer process. Not HSM. Not attached to CLI validators.",
    evidence: "evidence/runs/20260824T211518Z/test-results/signer.txt",
  },
  {
    id: "network-policy",
    name: "Restricted peers + mTLS RPC",
    level: "locally-executed",
    notes: "Envoy 1.39.0 on 127.0.0.1:9443 required a client cert. curl without a cert failed. curl with the client cert returned Settlement eth_blockNumber. Not AWS security groups. Not ALB.",
    evidence: "evidence/runs/20260824T211518Z/test-results/mtls.txt",
  },
  {
    id: "recovery-drill",
    name: "Validator kill / restore drill",
    level: "locally-executed",
    notes: "Killed pid 76552 (NodeID-CNhskLG4ridbbTh2rDVjuTNEWfP2cFmwT). Northstar RPC died and stayed down for 8s (1-of-1 stall). Restarted the same flags.json. Same NodeID. Height 22 then 23 after 0x2ad3650fd04475255123aed97d41e012aa8c4b542316d80a2bb5dfd81215feb1. Console destroy/restore is still JSON-only.",
    evidence: "evidence/runs/20260824T202726Z/transactions.json",
  },
  {
    id: "observability",
    name: "Metrics, logs, alerts",
    level: "locally-executed",
    notes: "Prometheus 3.14.0 scraped primary :9650 /ext/metrics (up=1). Alert AvalancheGoDown fired on northstar :9654 (already down). Loki 3.7.6 ingested that drill line. No Grafana. Terraform CloudWatch placeholder is unused.",
    evidence: "evidence/runs/20260824T211518Z/test-results/observe.txt",
  },
  {
    id: "hsm",
    name: "Hardware HSM custody",
    level: "source-written",
    notes: "Not implemented. The local gRPC signer is a separate row. No CloudHSM, Cubist, or Nitro enclave.",
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
