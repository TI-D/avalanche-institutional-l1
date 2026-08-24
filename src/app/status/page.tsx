import type { Metadata } from "next";
import { WithAcronyms } from "@/components/acronym";
import { EvidenceBanner } from "@/components/evidence-banner";
import { LiveStatus } from "@/components/live-status";
import { OpsConsole } from "@/components/ops-console";
import { snapshot } from "@/lib/control-plane";
import { readLiveSnapshot } from "@/lib/live-plane";

export const metadata: Metadata = {
  title: "Ops console",
};

export const dynamic = "force-dynamic";

export default async function StatusPage() {
  const live = await readLiveSnapshot();
  const data = snapshot();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[12px] font-medium tracking-[0.22em] text-[#E84142] uppercase">
        {live ? "Local RPC" : "Stage 1 model"}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Northstar operations console</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
        <WithAcronyms>
          {live
            ? "Reading configured NORTHSTAR_RPC and SETTLEMENT_RPC. The model buttons stay below and still only write JSON."
            : "Set NORTHSTAR_RPC and SETTLEMENT_RPC after make local-up to replace this model with eth_blockNumber. Until then this page writes /tmp/northstar-control-plane.json."}
        </WithAcronyms>
      </p>
      {live ? (
        <div className="mt-10">
          <LiveStatus data={live} />
        </div>
      ) : (
        <div className="mt-6">
          <EvidenceBanner level="modeled" title="Stage 1 simulator. Does not run AvalancheGo.">
            Cards labeled modeled-majority or modeled-up are JSON fields. They are not accepted height, peer count, or a recovery drill.
          </EvidenceBanner>
        </div>
      )}
      <div className="mt-10">
        <OpsConsole data={data} />
      </div>
    </div>
  );
}
