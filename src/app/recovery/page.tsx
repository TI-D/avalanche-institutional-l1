import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Recovery" };

export default function RecoveryPage() {
  return (
    <DocPage
      kicker="Disaster recovery"
      title="Actually kill something. Then write down what happened."
      lede="Most portfolio demos never leave the happy path. This one treats a destroyed validator and a backup restore as first-class evidence."
    >
      <Section title="Failure drill">
        <div className="overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Phase</th>
                <th className="px-4 py-3 font-medium">V1</th>
                <th className="px-4 py-3 font-medium">V2</th>
                <th className="px-4 py-3 font-medium">V3</th>
                <th className="px-4 py-3 font-medium">Network</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              <tr>
                <td className="px-4 py-3">Healthy</td>
                <td className="px-4 py-3 text-emerald-400">up</td>
                <td className="px-4 py-3 text-emerald-400">up</td>
                <td className="px-4 py-3 text-emerald-400">up</td>
                <td className="px-4 py-3">finalizing</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Destroy V2</td>
                <td className="px-4 py-3 text-emerald-400">up</td>
                <td className="px-4 py-3 text-[#E84142]">down</td>
                <td className="px-4 py-3 text-emerald-400">up</td>
                <td className="px-4 py-3">continues (2/3)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Rebuild V2</td>
                <td className="px-4 py-3 text-emerald-400">up</td>
                <td className="px-4 py-3 text-emerald-400">up</td>
                <td className="px-4 py-3 text-emerald-400">up</td>
                <td className="px-4 py-3">healthy</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Destroying the instance is not the same as removing the validator. The P-Chain still lists V2. The remaining nodes keep consensus because they still have a quorum of the registered set. Rebuild uses the same NodeID and BLS key from backup so you do not owe the network a registration ceremony during an outage.
        </p>
      </Section>
      <Section title="Backup and restore">
        <p>
          A second exercise copies staking TLS, BLS, and node identity into the encrypted backup bucket, then restores them onto a replacement host. Success means the replacement advertises the original NodeID and reconnects to peers without a ValidatorManager change. Failure usually means the operator generated a new key by accident and created a fourth identity that the P-Chain does not know.
        </p>
      </Section>
      <Section title="Evidence">
        <p>
          Run the console actions or{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">./scripts/health</code>,{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">./scripts/backup</code>, and the destroy/restore buttons. The audit trail on the status page is the evidence artifact. In a real engagement that trail is Prometheus + Loki + the change ticket.
        </p>
      </Section>
    </DocPage>
  );
}
