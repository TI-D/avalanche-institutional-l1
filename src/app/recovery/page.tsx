import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Recovery" };

export default function RecoveryPage() {
  return (
    <DocPage
      kicker="Disaster recovery"
      title="A restore is not proven until the NodeID is the same and height advances."
      lede="The intended drill is to fence a dead validator, restore its staking identity, and show the same NodeID catching up. The table below is a hypothesis for that drill, not a measurement."
      evidence={{
        level: "modeled",
        title: "No backup file exists. No process has been killed.",
        note: "./scripts/backup writes a timestamp on the JSON model. Avalanche consensus is not a generic 2/3 quorum. Health must be accepted height and acceptance latency.",
      }}
    >
      <Section title="Intended failure drill">
        <div className="overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Phase</th>
                <th className="px-4 py-3 font-medium">V1</th>
                <th className="px-4 py-3 font-medium">V2</th>
                <th className="px-4 py-3 font-medium">V3</th>
                <th className="px-4 py-3 font-medium">What must be measured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              <tr>
                <td className="px-4 py-3">Healthy</td>
                <td className="px-4 py-3">up</td>
                <td className="px-4 py-3">up</td>
                <td className="px-4 py-3">up</td>
                <td className="px-4 py-3">accepted height advancing on all three</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Fence and stop V2</td>
                <td className="px-4 py-3">up</td>
                <td className="px-4 py-3 text-[#E84142]">fenced / down</td>
                <td className="px-4 py-3">up</td>
                <td className="px-4 py-3">height still advancing on V1 and V3, or it is not</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Restore same NodeID</td>
                <td className="px-4 py-3">up</td>
                <td className="px-4 py-3">up</td>
                <td className="px-4 py-3">up</td>
                <td className="px-4 py-3">NodeID match, then V2 accepted height catching up</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Destroying an instance is not the same as removing the validator. The P-Chain identity remains. Whether the remaining nodes keep finalizing depends on weights, Snow sampling, connectivity, and actual chain progress. I will not call that a 2/3 quorum. Three equal-weight validators may or may not tolerate one loss. Stage 2 should use five equal-weight validators if the goal is a clean N-1 demonstration.
        </p>
        <p>
          Rebuild must reuse the same NodeID and BLS key. Before that process starts, fence the old host so the identity cannot come back twice. Generating a new key during an outage creates a fourth identity the P-Chain does not know.
        </p>
      </Section>
      <Section title="Backup and restore, when they exist">
        <p>
          A real backup copies staking TLS, the BLS signer material or remote-signer identity, node config, and enough state to resync. It records hashes, encryption metadata, and which validator the blob belongs to. Restore verifies those hashes, fences the previous host, and checks NodeID equality before the node is allowed to advertise.
        </p>
      </Section>
      <Section title="What the Stage 1 buttons do">
        <p>
          Console destroy/restore and{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">./scripts/backup</code>{" "}
          change <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">/tmp/northstar-control-plane.json</code>.
          That audit trail is a model log, not operational evidence.
        </p>
      </Section>
    </DocPage>
  );
}
