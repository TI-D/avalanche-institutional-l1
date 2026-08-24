import { EvidenceBanner } from "@/components/evidence-banner";
import type { LiveSnapshot } from "@/lib/live-plane";

export function LiveStatus({ data }: { data: LiveSnapshot }) {
  return (
    <div className="space-y-6">
      <EvidenceBanner level="locally-executed" title="Live RPC. Not the JSON model.">
        Heights come from eth_blockNumber. A single sample is not a finality proof. Two samples
        with an advancing height belong in evidence/runs.
      </EvidenceBanner>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.chains.map((chain) => (
          <div key={chain.name} className="rounded-2xl border border-white/8 bg-[#101012] px-4 py-4">
            <p className="text-[11px] tracking-[0.16em] text-zinc-500 uppercase">{chain.name}</p>
            <p className="mt-2 text-lg font-medium">
              {chain.reachable && chain.blockNumber !== null
                ? `height ${chain.blockNumber}`
                : "unreachable"}
            </p>
            <p className="mt-1 font-mono text-[11px] text-zinc-500">{chain.rpc}</p>
            {chain.error ? <p className="mt-2 text-sm text-[#E84142]">{chain.error}</p> : null}
            <p className="mt-2 text-[11px] text-zinc-500">{chain.fetchedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
