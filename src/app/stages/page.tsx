import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DocPage, Section } from "@/components/doc-page";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Stages" };

const stages = [
  {
    n: "01",
    status: "Shipped",
    title: "Architecture, kit, and operator model",
    cost: "Laptop. This site.",
    body: "The engagement, topology, ValidatorManager lifecycle, threat model, runbooks, Terraform/Ansible modules, Solidity, and the ops console. The console is a control-plane model. It does not run AvalancheGo.",
    proof: "You can whiteboard the flow and operate the demo without lying about HSM.",
    href: "/status",
    cta: "Open the Stage 1 console",
  },
  {
    n: "02",
    status: "Next",
    title: "Real local AvalancheGo network",
    cost: "CPU, RAM, disk. No AWS. No AVAX.",
    body: "Avalanche-CLI boots a local Primary Network, deploys Northstar and Settlement as PoA L1s, starts the ICM relayer, and lets you add a validator through the real P-Chain path.",
    proof: "eth_blockNumber moves. AssetApproved lands on Settlement. Kill a process, same NodeID comes back.",
    href: "/stages#stage-2",
    cta: "Read the local runbook",
  },
  {
    n: "03",
    status: "Plan only",
    title: "If Northstar were a real customer, take it live",
    cost: "Fuji is faucet AVAX plus optional cloud. Production is a real AWS bill and real AVAX.",
    body: "Customer overlay, security review, Fuji dress rehearsal, Terraform apply, ConvertSubnetToL1, drills on real hosts, then cutover. No production apply from this repo until those gates pass.",
    proof: "A Director of Engineering can see the sequence, the refusals, and where HSM is still a gap.",
    href: "/stages#stage-3",
    cta: "Read the go-live plan",
  },
];

export default function StagesPage() {
  return (
    <DocPage
      kicker="Portfolio stages"
      title="Stage 1 is shipped. Stage 2 is a local chain. Stage 3 is the live plan."
      lede="I will not collapse these. A working website is not a working L1. A working local L1 is not a bank deployment. The value of the portfolio is that the seams are visible."
    >
      <div className="grid gap-4">
        {stages.map((stage) => (
          <article key={stage.n} className="rounded-2xl border border-white/8 bg-[#101012] p-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[11px] tracking-[0.2em] text-[#E84142]">{stage.n}</p>
              <p className="text-[11px] tracking-[0.16em] text-zinc-500 uppercase">{stage.status}</p>
            </div>
            <h2 className="mt-2 text-xl font-semibold">{stage.title}</h2>
            <p className="mt-2 text-sm text-zinc-500">{stage.cost}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{stage.body}</p>
            <p className="mt-3 text-sm text-zinc-400">{stage.proof}</p>
            <Link href={stage.href} className={cn(buttonVariants({ size: "sm" }), "mt-4 inline-flex")}>
              {stage.cta}
            </Link>
          </article>
        ))}
      </div>

      <Section title="Stage 2 in one sitting">
        <p id="stage-2" className="scroll-mt-24">
          Full command list lives in <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">docs/stage-2-local.md</code>. The short path:
        </p>
        <pre className="overflow-x-auto rounded-2xl border border-white/8 bg-[#101012] p-5 font-mono text-[12px] leading-6 text-zinc-300">
          {`./scripts/local/create-l1s
./scripts/local/up
./scripts/local/deploy-contracts
./scripts/local/send-approval
./scripts/local/add-validator
./scripts/local/kill-validator 2
./scripts/local/health
./scripts/local/restart-validator 2`}
        </pre>
        <p>
          That is Avalanche-CLI&apos;s local network: Primary Network validators, two Subnet-EVM L1s, ValidatorManager, Teleporter, relayer. When those six exit criteria in the doc are green, the Stage 1 console should read live RPC instead of the JSON model.
        </p>
      </Section>

      <Section title="Stage 3 if they signed the SOW">
        <ol id="stage-3" className="scroll-mt-24 list-decimal space-y-2 pl-5">
          <li>Customer overlay: CIDRs, chain ID, PoA owners, Settlement destination. Do not fork the kit.</li>
          <li>Security review against the threat model. Say out loud what is designed and not built.</li>
          <li>Fuji dress rehearsal: convert, initialize, add, remove, destroy, restore, ICM. Keep the packet.</li>
          <li>Production Terraform + Ansible. ConvertSubnetToL1. Initialize ValidatorManager.</li>
          <li>Drills on the real hosts. Same runbooks as Stage 1 and Stage 2.</li>
          <li>Cutover to internal RPC and the allowlisted relayer. Handoff the overlay plus the kit.</li>
        </ol>
        <p>
          Detail is in <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">docs/stage-3-go-live.md</code>. The refusals matter as much as the steps: no public validator RPC, no new NodeID as a &quot;restore,&quot; no mainnet conversion before the destroy drill, no HSM theater.
        </p>
      </Section>
    </DocPage>
  );
}
