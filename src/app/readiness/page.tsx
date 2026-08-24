import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { EvidenceBadge } from "@/components/evidence-badge";
import { CLAIM_RULE, capabilities, evidenceLabel } from "@/lib/evidence";

export const metadata: Metadata = { title: "Evidence" };

export default function ReadinessPage() {
  return (
    <DocPage
      kicker="Honesty"
      title="Every capability has an evidence level. Nothing is production-ready."
      lede={CLAIM_RULE}
    >
      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Capability</th>
              <th className="px-4 py-3 font-medium">Level</th>
              <th className="px-4 py-3 font-medium">Notes</th>
              <th className="px-4 py-3 font-medium">Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {capabilities.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">
                  <EvidenceBadge level={row.level} />
                </td>
                <td className="px-4 py-3 text-zinc-400">{row.notes}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-zinc-500">{row.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-zinc-500">
        Levels: {["modeled", "source-written", "locally-executed", "fuji-executed", "aws-lab-executed", "externally-validated"]
          .map((level) => evidenceLabel(level as (typeof capabilities)[number]["level"]))
          .join(", ")}
        . Promoting a row requires a checked-in artifact, not a screenshot of this table.
      </p>
    </DocPage>
  );
}
