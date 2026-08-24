import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = { title: "Runbooks" };

const runbooks = [
  {
    href: "/ops#validator-failure",
    file: "runbooks/validator-failure.md",
    title: "Validator failure",
    body: "Node unhealthy or instance dead. Fence the old host, measure accepted height, restore the same NodeID, do not re-key.",
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
      lede="If the only person who can recover a validator is the person who deployed it, the engagement failed. These four runbooks are drafts. They cannot be executed against this repository today."
      evidence={{
        level: "source-written",
        title: "Runbooks point at a model or at Stage 2 commands that have not been run.",
        note: "./scripts/health talks to the JSON API. A real failure runbook must fence the old host before reusing a NodeID.",
      }}
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
          1. Confirm the host is fenced so the same NodeID cannot return twice. 2. Do not run remove-validator. The identity is still in the set. 3. Snapshot disks if the host is reachable. 4. Measure accepted height on the remaining nodes. Process count is not health. 5. Restore staking keys onto a replacement. 6. Confirm NodeID match. 7. Watch last accepted height catch up. Stage 1&apos;s{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">./scripts/health</code> only reads the JSON model.
        </p>
      </section>
      <section id="validator-replacement" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-semibold">Validator replacement</h2>
        <p className="text-sm leading-7 text-zinc-300">
          Use this when the NodeID must change. Add the new validator first, wait until the new identity is in both ValidatorManager and the P-Chain, then remove the old one. Do not treat a 2/3 process count as the promised safety margin. The console buttons replay a model of the happy path.
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
          Sev1 is loss of finality (accepted height stopped) or suspected key compromise. Freeze PoA initiate* calls. Preserve logs. If a key is suspected, that is a replacement ceremony, not a restore. Write the timeline as if counsel will read it.
        </p>
      </section>
    </DocPage>
  );
}
