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
  status: "modeled-up",
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
    mode: "stage-1-json-model",
    network: {
      customer: "Northstar Capital",
      l1Name: "Northstar L1",
      evmChainId: 431271,
      subnetId: "model-subnet-not-on-p-chain",
      blockchainId: "model-blockchain-not-on-p-chain",
      latestBlock: 0,
      consensus: "modeled-majority",
      rpc: "modeled-up",
    },
    validators: [
      {
        id: "v1",
        name: "Validator 1",
        nodeId: "NodeID-NS1A4mN8qT2wK7cY3rH9bE5aF0dU6xV",
        blsPublicKey: "0x4a91c2e0b8d7f35a1c60e9d2b4f8a7c3",
        weight: 100,
        az: "us-east-1a",
        status: "modeled-up",
        role: "validator",
      },
      {
        id: "v2",
        name: "Validator 2",
        nodeId: "NodeID-NS2B5nP9rU3xL8dZ4sJ0cF6bG1eV7yW",
        blsPublicKey: "0x7c03d1f9a6e248b0d52f1c8a3e7b6d04",
        weight: 100,
        az: "us-east-1b",
        status: "modeled-up",
        role: "validator",
      },
      {
        id: "v3",
        name: "Validator 3",
        nodeId: "NodeID-NS3C6oQ0sV4yM9eA5tK1dG7cH2fW8zX",
        blsPublicKey: "0x1e58a0c7d4b936f2e81a0d9c6f3b5e17",
        weight: 100,
        az: "us-east-1c",
        status: "modeled-up",
        role: "validator",
      },
    ],
    validatorManager: {
      address: "0x0000000000000000000000000000000000000000",
      mode: "PoA",
      active: 3,
    },
    icm: {
      connected: false,
      teleporter: "0x0000000000000000000000000000000000000000",
      relayer: "modeled",
      lastMessage: null,
      messages: [],
    },
    recovery: {
      lastBackupAt: null,
      lastRestoreAt: null,
      lastFailureDrill: "not-run",
    },
    events: [
      event(
        "info",
        "Stage 1 model initialized",
        "This JSON file is a teaching control plane. AvalancheGo is not running. NodeIDs, BLS keys, subnet IDs, and block height are placeholders."
      ),
    ],
  };
}

function persist(state: ControlPlane) {
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(/* turbopackIgnore: true */ STATE_PATH, JSON.stringify(state, null, 2));
}

function isModelState(value: unknown): value is ControlPlane {
  return Boolean(value && typeof value === "object" && (value as ControlPlane).mode === "stage-1-json-model");
}

export function readState(): ControlPlane {
  try {
    const raw = readFileSync(/* turbopackIgnore: true */ STATE_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!isModelState(parsed)) {
      const fresh = initialState();
      persist(fresh);
      return fresh;
    }
    return parsed;
  } catch {
    const fresh = initialState();
    persist(fresh);
    return fresh;
  }
}

function upCount(state: ControlPlane) {
  return state.validators.filter((v) => v.status === "modeled-up").length;
}

function recompute(state: ControlPlane) {
  const up = upCount(state);
  state.validatorManager.active = up;
  // Teaching hypothesis only. Avalanche liveness is not a 2/3 PBFT quorum.
  // Real health is advancing accepted height and acceptance latency.
  state.network.consensus = up >= 2 ? "modeled-majority" : "modeled-minority";
  state.network.rpc = up >= 1 ? (up >= 2 ? "modeled-up" : "modeled-degraded") : "modeled-down";
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
          event("warn", "Model: Validator 4 already present", "Reset the demo to replay the modeled lifecycle.")
        );
        break;
      }
      pushEvent(
        state,
        event(
          "info",
          "Model: initiateValidatorRegistration",
          "No Warp message was built. No P-Chain RegisterL1ValidatorTx was submitted. The model appends a fourth placeholder validator."
        )
      );
      state.validators.push({ ...V4, status: "modeled-up" });
      pushEvent(
        state,
        event(
          "success",
          "Model: registration complete",
          "completeValidatorRegistration was not called. The set is now 4 modeled entries."
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
          "Model: initiateValidatorRemoval",
          `${target.name} removed from the JSON array. SetL1ValidatorWeightTx was not submitted.`
        )
      );
      state.validators = state.validators.filter((v) => v.id !== target.id);
      pushEvent(
        state,
        event("success", "Model: validator removed", `${target.name} deleted from local state.`)
      );
      break;
    }
    case "destroy-validator": {
      const target = state.validators.find((v) => v.id === (validatorId ?? "v2"));
      if (!target) break;
      target.status = "modeled-down";
      state.recovery.lastFailureDrill = "modeled-down";
      pushEvent(
        state,
        event(
          "error",
          `Model: ${target.name} marked down`,
          "No host was terminated. Remaining entries stay modeled-up. This is not evidence of continued finality."
        )
      );
      break;
    }
    case "restore-validator": {
      const target = state.validators.find((v) => v.id === (validatorId ?? "v2") && v.status === "modeled-down");
      if (!target) {
        pushEvent(state, event("warn", "Model: nothing to restore", "Mark a validator down first."));
        break;
      }
      target.status = "modeled-up";
      state.recovery.lastFailureDrill = "modeled-restore";
      state.recovery.lastRestoreAt = now();
      pushEvent(
        state,
        event(
          "success",
          `Model: ${target.name} marked up`,
          "No staking files were restored. No NodeID was verified. A real restore must fence the old host first."
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
          "success",
          "Model: AssetApproved recorded",
          "No Teleporter message left this process. Foundry tests cover authorization. Live delivery is Stage 2."
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
          "Model: backup timestamp written",
          "No TLS, BLS, or database files were copied. This timestamp is not a backup artifact."
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
          "Model: restore timestamp written",
          "No identity was restored. A real restore must fence the previous host before reusing a NodeID."
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
  const up = upCount(state);
  const total = state.validators.length;
  return {
    mode: state.mode,
    validators: `${up}/${total} modeled-up`,
    consensus: state.network.consensus,
    rpc: state.network.rpc,
    latestBlock: `model ${state.network.latestBlock}`,
    validatorManager: `${state.validatorManager.active} modeled`,
    icm: state.icm.lastMessage ? "modeled message" : "no modeled message",
    recovery: state.recovery.lastFailureDrill,
  };
}

export function snapshot() {
  const state = readState();
  return { state, summary: summarize(state) };
}
