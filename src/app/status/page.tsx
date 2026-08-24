import type { Metadata } from "next";
import { WithAcronyms } from "@/components/acronym";
import { EvidenceBanner } from "@/components/evidence-banner";
import { OpsConsole } from "@/components/ops-console";
import { snapshot } from "@/lib/control-plane";

export const metadata: Metadata = {
  title: "Ops console",
};

export const dynamic = "force-dynamic";

export default function StatusPage() {
  const data = snapshot();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[12px] font-medium tracking-[0.22em] text-[#E84142] uppercase">
        Stage 1 model
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Northstar operations console</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
        <WithAcronyms>
          Teaching UI for the ValidatorManager, ICM, backup, and recovery sequence. It writes /tmp/northstar-control-plane.json. It does not talk to AvalancheGo.
        </WithAcronyms>
      </p>
      <div className="mt-6">
        <EvidenceBanner level="modeled" title="Stage 1 simulator. Does not run AvalancheGo.">
          Cards labeled modeled-majority or modeled-up are JSON fields. They are not accepted height, peer count, or a recovery drill.
        </EvidenceBanner>
      </div>
      <div className="mt-10">
        <OpsConsole data={data} />
      </div>
    </div>
  );
}
