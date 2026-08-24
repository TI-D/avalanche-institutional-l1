import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Recovery" };

export default function RecoveryPage() {
  return (
    <DocPage
      kicker="Disaster recovery"
      title="A restore is not proven until the NodeID is the same and height advances."
      lede="A 1-of-1 host kill/restore already ran on Northstar. A restic restore of Settlement staking files already matched NodeID. Neither is AWS, and neither is a 5-validator quorum."
      evidence={{
        level: "locally-executed",
        title: "Host restore and restic restore have artifacts. Console backup is still JSON.",
        note: "Kill/restore: evidence/runs/20260824T202726Z. OpenBao+restic: make backup-test. ./scripts/backup still only stamps the Stage 1 JSON model.",
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
      <Section title="Local restic substitute">
        <p>
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">make backup-test</code>{" "}
          uses OpenBao <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">-dev</code> Transit
          to wrap a restic password, then backups staking material from a live{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">flags.json</code>.
          Restore hashes and NodeID matched{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">NodeID-BgLdV9zWyYUp6jp4RkxoDMvuMo6h8bj2w</code>.
          That is not a host-replacement drill and not AWS KMS / S3 Object Lock.
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
