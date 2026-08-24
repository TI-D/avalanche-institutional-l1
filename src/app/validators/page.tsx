import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Validator lifecycle" };

const steps = [
  {
    title: "Initial set registered",
    detail: "Initial set from ConvertSubnetToL1Tx. initializeValidatorSet consumes the SubnetToL1ConversionMessage so the contract and P-Chain agree.",
  },
  {
    title: "Add Validator 4",
    detail: "Ops provisions a new AvalancheGo host, collects NodeID, BLS public key, and proof of possession. Nothing is in the set yet.",
  },
  {
    title: "ValidatorManager initiates registration",
    detail: "PoAManager.initiateValidatorRegistration runs churn checks and emits RegisterL1ValidatorMessage via the Warp precompile.",
  },
  {
    title: "BLS aggregation, then P-Chain",
    detail: "Origin validators aggregate BLS signatures. A relayer or operator submits RegisterL1ValidatorTx on the P-Chain with that ICM payload.",
  },
  {
    title: "P-Chain acknowledges",
    detail: "P-Chain signs L1ValidatorRegistrationMessage. That is the second BLS aggregation round, now over Primary Network validators.",
  },
  {
    title: "L1 completes registration",
    detail: "completeValidatorRegistration delivers the acknowledgement. Validator 4 is active. The set is 4/4.",
  },
  {
    title: "Remove Validator 2",
    detail: "initiateValidatorRemoval sets weight to 0, SetL1ValidatorWeightTx hits the P-Chain, completeValidatorRemoval consumes valid=0. Consensus continues.",
  },
];

export default function ValidatorsPage() {
  return (
    <DocPage
      kicker="Validator lifecycle"
      title="Adding a validator is two L1 transactions, one P-Chain transaction, and two BLS rounds."
      lede="This is the flow I wanted to be able to whiteboard. Creating three nodes is not the skill. Driving ValidatorManager against the P-Chain is."
      evidence={{
        level: "source-written",
        title: "Lifecycle ran locally. Stage 1 buttons are still JSON.",
        note: "RegisterL1ValidatorTx 26nvYesCtZBFPVzCGEXBgmbhFMJfywLzByDyMWYiSvGxFk8Psj and SetL1ValidatorWeightTx 2WrycUE8CC4tTK3QwrwBUZgpY1SFdJYLdwXf7WTbaocViv8QFh. ./scripts/add-validator still only writes the control-plane JSON.",
      }}
    >
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-white/8 bg-[#101012] p-5">
            <p className="text-[11px] tracking-[0.18em] text-[#E84142] uppercase">Step {i + 1}</p>
            <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{step.detail}</p>
          </li>
        ))}
      </ol>
      <Section title="PoA, not PoS, for Northstar">
        <p>
          Northstar is a permissioned institution. Validator membership is an access-control decision, not a staking market. The kit therefore deploys ValidatorManager owned by PoAManager. Only the PoA owner (a hardware-backed admin, ideally a 2-of-3 of institution officers) may initiate adds and removals. Anyone with RPC access can complete them once the P-Chain message exists, which keeps the happy path operable during an incident.
        </p>
      </Section>
      <Section title="Churn">
        <p>
          ValidatorManager will reject a change that moves too much weight in one window. That is why the demo adds one validator and later removes one. A production change window is planned against those parameters, not against whoever is impatient on a Friday.
        </p>
      </Section>
      <Section title="What the TypeScript SDK is for">
        <p>
          Ava&apos;s interchain SDK can orchestrate the full register/remove path: wait for Warp signatures, submit the P-Chain transaction, then call complete* on the L1. This repo does not yet wrap that SDK.{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">./scripts/add-validator</code> updates the Stage 1 model.{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">./scripts/local/add-validator</code> ran against the local network.
        </p>
      </Section>
    </DocPage>
  );
}
