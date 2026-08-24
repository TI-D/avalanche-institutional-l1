export type ValidatorStatus =
  | "healthy"
  | "registering"
  | "removing"
  | "degraded"
  | "destroyed"
  | "offline";

export type Validator = {
  id: string;
  name: string;
  nodeId: string;
  blsPublicKey: string;
  weight: number;
  az: string;
  status: ValidatorStatus;
  role: "validator";
};

export type IcmMessage = {
  id: string;
  source: "northstar";
  destination: "settlement";
  assetId: number;
  approved: boolean;
  stage: "origin-signed" | "bls-aggregated" | "relayed" | "destination-verified";
  createdAt: string;
};

export type OpsEvent = {
  id: string;
  at: string;
  level: "info" | "warn" | "error" | "success";
  title: string;
  detail: string;
};

export type ControlPlane = {
  network: {
    customer: string;
    l1Name: string;
    evmChainId: number;
    subnetId: string;
    blockchainId: string;
    latestBlock: number;
    consensus: "healthy" | "degraded";
    rpc: "operational" | "degraded" | "down";
  };
  validators: Validator[];
  validatorManager: {
    address: string;
    mode: "PoA";
    active: number;
  };
  icm: {
    connected: boolean;
    teleporter: string;
    relayer: "connected" | "degraded";
    lastMessage: IcmMessage | null;
    messages: IcmMessage[];
  };
  recovery: {
    lastBackupAt: string | null;
    lastRestoreAt: string | null;
    lastFailureDrill: "passed" | "failed" | "not-run";
  };
  events: OpsEvent[];
};

export type Action =
  | "add-validator"
  | "remove-validator"
  | "destroy-validator"
  | "restore-validator"
  | "send-icm"
  | "backup"
  | "restore-backup"
  | "reset";

export type ControlPlanePayload = {
  state: ControlPlane;
  summary: Record<string, string | number>;
};
