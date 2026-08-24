import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = { title: "Runbooks" };

const runbooks = [
  {
    href: "/ops#validator-failure",
    file: "runbooks/validator-failure.md",
    title: "Validator failure",
    body: "Node unhealthy or instance dead. Confirm quorum, page on-call, rebuild from backup, do not re-key.",
  },
  {
    href: "/ops#validator-replacement",
    file: "runbooks/validator-replacement.md",
    title: "Validator replacement",
    body: "Planned remove + add through ValidatorManager. Two L1 txs, one P-Chain tx, two BLS rounds.",
  },
  {
    href: "/ops#network-upgrade",
    file: "runbooks/network-upgrade.md",
    title: "Network upgrade",
    body: "Rolling AvalancheGo upgrade. One validator at a time. Never upgrade RPC and consensus in the same window.",
  },
  {
    href: "/ops#incident-response",
    file: "runbooks/incident-response.md",
    title: "Incident response",
    body: "Severity, comms, freeze PoA changes, preserve logs, regulator-friendly timeline.",
  },
];

export default function OpsPage() {
  return (
    <DocPage
      kicker="Operations"
      title="Runbooks are part of the product."
      lede="If the only person who can recover a validator is the person who deployed it, the engagement failed. These four runbooks are the minimum I would hand a Northstar NOC."
    >
      <div className="grid gap-4">
        {runbooks.map((rb) => (
          <Link key={rb.file} href={rb.href} className="rounded-2xl border border-white/8 bg-[#101012] p-5 hover:bg-[#141416]">
            <p className="font-mono text-[11px] text-[#E84142]">{rb.file}</p>
            <h2 className="mt-2 text-lg font-semibold">{rb.title}</h2>
            <p className="mt-2 text-sm text-zinc-400">{rb.body}</p>
          </Link>
        ))}
      </div>
      <section id="validator-failure" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">Validator failure</h2>
        <p className="text-sm leading-7 text-zinc-300">
          1. Check <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">./scripts/health</code>. If two of three are healthy, the chain is up. 2. Do not run remove-validator. The identity is still in the set. 3. Snapshot disks if the host is reachable. 4. Launch replacement in the same AZ from Terraform. 5. Restore staking keys. 6. Confirm NodeID match. 7. Watch peer count and last accepted height. Full text in the repo runbook.
        </p>
      </section>
      <section id="validator-replacement" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">Validator replacement</h2>
        <p className="text-sm leading-7 text-zinc-300">
          Use this when the NodeID must change. Add the new validator first, wait until 4/4 is healthy, then remove the old one. Never drop below the quorum you promised the institution. The console buttons replay the happy path.
        </p>
      </section>
      <section id="network-upgrade" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">Network upgrade</h2>
        <p className="text-sm leading-7 text-zinc-300">
          Pin the AvalancheGo version in Ansible. Drain one validator from traffic (not from the set). Upgrade, wait for healthy, proceed. RPC nodes are last. Genesis-incompatible upgrades get a dedicated change window and a written rollback.
        </p>
      </section>
      <section id="incident-response" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">Incident response</h2>
        <p className="text-sm leading-7 text-zinc-300">
          Sev1 is loss of quorum or suspected key compromise. Freeze PoA initiate* calls. Preserve logs. If a key is suspected, that is a replacement ceremony, not a restore. Write the timeline as if counsel will read it.
        </p>
      </section>
    </DocPage>
  );
}
