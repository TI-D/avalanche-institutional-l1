import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "ICM" };

export default function IcmPage() {
  return (
    <DocPage
      kicker="Interchain messaging"
      title="Northstar does not need a bridge. It needs Warp, Teleporter, and a relayer."
      lede="One boring message is enough: AssetApproved on Northstar becomes ApprovalReceived on Settlement. That single path forces the interoperability architecture into the open."
      evidence={{
        level: "source-written",
        title: "Authorization is tested. Delivery is not.",
        note: "SettlementReceiver now requires the expected source blockchain and origin registry. Relayer policy is explicit. No Teleporter message has been sent on a live L1.",
      }}
    >
      <pre className="overflow-x-auto rounded-2xl border border-white/8 bg-[#101012] p-5 font-mono text-[12px] leading-6 text-zinc-300">
        {`Northstar L1                         Settlement L1
AssetApproved                   ->    ApprovalReceived
{ assetId: 82731,                    { sourceChain: Northstar,
  approved: true }                     origin: InstitutionalRegistry,
                                       assetId: 82731 }`}
      </pre>
      <Section title="The stack">
        <p>
          <strong className="text-white">Warp / ICM</strong> is the primitive. Validators of the origin L1 sign an arbitrary payload with BLS. Those signatures aggregate. The destination looks up the origin validator set and weights on the P-Chain and verifies the multi-signature. There is no extra trust committee.
        </p>
        <p>
          <strong className="text-white">TeleporterMessenger</strong> is the application interface. Northstar&apos;s InstitutionalRegistry calls{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">sendCrossChainMessage</code>. Settlement&apos;s receiver implements{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">receiveTeleporterMessage</code>. Teleporter authenticates that a message came from some origin. The application must still pin which origin is allowed.
        </p>
        <p>
          <strong className="text-white">Relayer</strong> is the transport. Messages are not stored on the Primary Network. Someone has to carry the signed bytes to Settlement and call{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">receiveCrossChainMessage</code>. Teleporter treats an empty{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">allowedRelayerAddresses</code> as permissionless delivery. This repo now sets a relayer address when one is configured. Network-level RPC allowlisting is a separate control and is not proven.
        </p>
      </Section>
      <Section title="Application authorization">
        <p>
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">SettlementReceiver</code> rejects any caller other than the Teleporter contract, any{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">sourceBlockchainID</code> other than Northstar, and any{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">originSenderAddress</code> other than the Northstar registry. Approvals are namespaced by origin chain, origin registry, and asset ID so two chains cannot collide on 82731.
        </p>
        <p>
          Foundry tests cover valid delivery, wrong messenger, wrong chain, wrong sender, namespaced asset IDs, approval flip, and both relayer policies. See{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">contracts/test/</code>.
        </p>
      </Section>
      <Section title="Why this is the institutional shape">
        <p>
          Settlement can be a different legal entity, a market utility, or Northstar&apos;s own second L1. The message is an approval, not an asset lock. Custody stays on Northstar. Settlement only learns that asset 82731 was approved by a named registry on a named chain. That is the kind of narrow, auditable cross-chain contract a compliance team will actually allow.
        </p>
      </Section>
    </DocPage>
  );
}
