import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type {
  Action,
  ControlPlane,
  IcmMessage,
  OpsEvent,
  Validator,
} from "@/lib/control-plane-types";

export type {
  Action,
  ControlPlane,
  ControlPlanePayload,
  IcmMessage,
  OpsEvent,
  Validator,
  ValidatorStatus,
} from "@/lib/control-plane-types";

const STATE_PATH = process.env.CONTROL_PLANE_STATE ?? "/tmp/northstar-control-plane.json";

const V4: Validator = {
  id: "v4",
  name: "Validator 4",
  nodeId: "NodeID-NS4K7pQ2mR8wL1cY6tH0bE3aF9dU2xV",
  blsPublicKey: "0x8f2c91a0e4b7d63c1a59f0e8b2d4c7a1",
  weight: 100,
  az: "us-east-1d",
  status: "healthy",
  role: "validator",
};

function now() {
  return new Date().toISOString();
}

function event(level: OpsEvent["level"], title: string, detail: string): OpsEvent {
  return {
    id: `evt_${Math.random().toString(36).slice(2, 10)}`,
    at: now(),
    level,
    title,
    detail,
  };
}

export function initialState(): ControlPlane {
  return {
    network: {
      customer: "Northstar Capital",
      l1Name: "Northstar L1",
      evmChainId: 431271,
      subnetId: "2nS9xYkQ4mR7wL1cT6uH0bE3aF8dP2qV",
      blockchainId: "2oT0yZlR5nS8xM2dU7vI1cF4bG9eQ3rW",
      latestBlock: 4281,
      consensus: "healthy",
      rpc: "operational",
    },
    validators: [
      {
        id: "v1",
        name: "Validator 1",
        nodeId: "NodeID-NS1A4mN8qT2wK7cY3rH9bE5aF0dU6xV",
        blsPublicKey: "0x4a91c2e0b8d7f35a1c60e9d2b4f8a7c3",
        weight: 100,
        az: "us-east-1a",
        status: "healthy",
        role: "validator",
      },
      {
        id: "v2",
        name: "Validator 2",
        nodeId: "NodeID-NS2B5nP9rU3xL8dZ4sJ0cF6bG1eV7yW",
        blsPublicKey: "0x7c03d1f9a6e248b0d52f1c8a3e7b6d04",
        weight: 100,
        az: "us-east-1b",
        status: "healthy",
        role: "validator",
      },
      {
        id: "v3",
        name: "Validator 3",
        nodeId: "NodeID-NS3C6oQ0sV4yM9eA5tK1dG7cH2fW8zX",
        blsPublicKey: "0x1e58a0c7d4b936f2e81a0d9c6f3b5e17",
        weight: 100,
        az: "us-east-1c",
        status: "healthy",
        role: "validator",
      },
    ],
    validatorManager: {
      address: "0xfacade0000000000000000000000000000000001",
      mode: "PoA",
      active: 3,
    },
    icm: {
      connected: true,
      teleporter: "0x253b2784c3d88015a53f840767b6417be6684261",
      relayer: "connected",
      lastMessage: null,
      messages: [],
    },
    recovery: {
      lastBackupAt: "2026-08-24T14:02:11.000Z",
      lastRestoreAt: null,
      lastFailureDrill: "passed",
    },
    events: [
      event(
        "success",
        "Northstar L1 online",
        "3/3 validators healthy. Restricted RPC, ValidatorManager, and ICM relayer reported ready."
      ),
    ],
  };
}

function persist(state: ControlPlane) {
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(/* turbopackIgnore: true */ STATE_PATH, JSON.stringify(state, null, 2));
}

export function readState(): ControlPlane {
  try {
    const raw = readFileSync(/* turbopackIgnore: true */ STATE_PATH, "utf8");
    return JSON.parse(raw) as ControlPlane;
  } catch {
    const fresh = initialState();
    persist(fresh);
    return fresh;
  }
}

function healthyCount(state: ControlPlane) {
  return state.validators.filter((v) => v.status === "healthy").length;
}

function recompute(state: ControlPlane) {
  const healthy = healthyCount(state);
  state.validatorManager.active = healthy;
  state.network.consensus = healthy >= 2 ? "healthy" : "degraded";
  state.network.rpc = healthy >= 1 ? (healthy >= 2 ? "operational" : "degraded") : "down";
  state.network.latestBlock += 1;
}

function pushEvent(state: ControlPlane, evt: OpsEvent) {
  state.events = [evt, ...state.events].slice(0, 40);
}

export function applyAction(action: Action, validatorId?: string): ControlPlane {
  if (action === "reset") {
    const fresh = initialState();
    persist(fresh);
    return fresh;
  }

  const state = readState();

  switch (action) {
    case "add-validator": {
      if (state.validators.some((v) => v.id === "v4")) {
        pushEvent(
          state,
          event("warn", "Validator 4 already present", "Registration is a no-op. Reset the demo to replay the lifecycle.")
        );
        break;
      }
      pushEvent(
        state,
        event(
          "info",
          "PoAManager.initiateValidatorRegistration",
          "ValidatorManager constructed RegisterL1ValidatorMessage. BLS aggregation and P-Chain RegisterL1ValidatorTx follow."
        )
      );
      state.validators.push({ ...V4, status: "healthy" });
      pushEvent(
        state,
        event(
          "success",
          "P-Chain registration complete",
          "L1ValidatorRegistrationMessage delivered. completeValidatorRegistration() finalized Validator 4. Set is now 4/4."
        )
      );
      break;
    }
    case "remove-validator": {
      const target = state.validators.find((v) => v.id === (validatorId ?? "v2"));
      if (!target) break;
      pushEvent(
        state,
        event(
          "info",
          "PoAManager.initiateValidatorRemoval",
          `${target.name} weight set to 0. SetL1ValidatorWeightTx submitted to P-Chain.`
        )
      );
      state.validators = state.validators.filter((v) => v.id !== target.id);
      pushEvent(
        state,
        event(
          "success",
          "Validator removed",
          `${target.name} acknowledged by P-Chain via L1ValidatorRegistrationMessage(valid=0). Network remains healthy.`
        )
      );
      break;
    }
    case "destroy-validator": {
      const target = state.validators.find((v) => v.id === (validatorId ?? "v2"));
      if (!target) break;
      target.status = "destroyed";
      state.recovery.lastFailureDrill = "failed";
      pushEvent(
        state,
        event(
          "error",
          `${target.name} destroyed`,
          "Instance terminated. Remaining validators continue consensus. RPC stays up on the restricted endpoint."
        )
      );
      break;
    }
    case "restore-validator": {
      const target = state.validators.find((v) => v.id === (validatorId ?? "v2") && v.status === "destroyed");
      if (!target) {
        pushEvent(state, event("warn", "Nothing to restore", "Destroy a validator first, then rebuild it from staking-key backup."));
        break;
      }
      target.status = "healthy";
      state.recovery.lastFailureDrill = "passed";
      state.recovery.lastRestoreAt = now();
      pushEvent(
        state,
        event(
          "success",
          `${target.name} rebuilt`,
          "Staking keys restored from encrypted backup. AvalancheGo rejoined the L1 validator set. Drill passed."
        )
      );
      break;
    }
    case "send-icm": {
      const message: IcmMessage = {
        id: `icm_${Math.random().toString(36).slice(2, 10)}`,
        source: "northstar",
        destination: "settlement",
        assetId: 82731,
        approved: true,
        stage: "destination-verified",
        createdAt: now(),
      };
      state.icm.lastMessage = message;
      state.icm.messages = [message, ...state.icm.messages].slice(0, 12);
      pushEvent(
        state,
        event(
          "info",
          "AssetApproved signed on Northstar L1",
          "assetId=82731 approved=true. TeleporterMessenger.sendCrossChainMessage() emitted."
        )
      );
      pushEvent(
        state,
        event(
          "info",
          "BLS signatures aggregated",
          "Quorum of Northstar validator BLS signatures aggregated into a single Warp multi-signature."
        )
      );
      pushEvent(
        state,
        event(
          "info",
          "Relayer delivered to Settlement L1",
          "ICM relayer submitted receiveCrossChainMessage on Settlement. No extra trust assumption beyond the origin validator set."
        )
      );
      pushEvent(
        state,
        event(
          "success",
          "ApprovalReceived on Settlement L1",
          "Settlement decoded AssetApproved { assetId: 82731, approved: true } and emitted ApprovalReceived."
        )
      );
      break;
    }
    case "backup": {
      state.recovery.lastBackupAt = now();
      pushEvent(
        state,
        event(
          "success",
          "Staking-key backup completed",
          "Encrypted TLS/staking/BLS material sealed with KMS and written to the isolated backup bucket."
        )
      );
      break;
    }
    case "restore-backup": {
      state.recovery.lastRestoreAt = now();
      pushEvent(
        state,
        event(
          "success",
          "Backup restore verified",
          "Keys and node identity restored into a replacement host. NodeID and BLS public key unchanged."
        )
      );
      break;
    }
    default:
      break;
  }

  recompute(state);
  persist(state);
  return state;
}

export function summarize(state: ControlPlane) {
  const healthy = healthyCount(state);
  const total = state.validators.length;
  return {
    validators: `${healthy}/${total} healthy`,
    consensus: state.network.consensus,
    rpc: state.network.rpc,
    latestBlock: state.network.latestBlock,
    validatorManager: `${state.validatorManager.active} active`,
    icm:
      state.icm.lastMessage?.stage === "destination-verified"
        ? "message received"
        : state.icm.connected
          ? "connected"
          : "down",
    recovery: state.recovery.lastFailureDrill === "passed" ? "passed" : state.recovery.lastFailureDrill,
  };
}

export function snapshot() {
  const state = readState();
  return { state, summary: summarize(state) };
}
