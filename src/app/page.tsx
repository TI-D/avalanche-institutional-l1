import Link from "next/link";
import { WithAcronyms } from "@/components/acronym";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const proofs = [
  {
    n: "01",
    title: "Avalanche architecture",
    body: "EVM L1, AvalancheGo, P-Chain as validator registry, Subnet-EVM, restricted RPC, BLS keys, ValidatorManager.",
    href: "/architecture",
  },
  {
    n: "02",
    title: "Validator lifecycle",
    body: "Add Validator 4 through initiate/complete registration, ICM and BLS aggregation, then remove Validator 2 without losing the network.",
    href: "/validators",
  },
  {
    n: "03",
    title: "Institutional security",
    body: "IaC, segmented networks, encrypted storage, secrets, minimal ports, centralized logs, and an explicit HSM/KMS design.",
    href: "/security",
  },
  {
    n: "04",
    title: "Failure and recovery",
    body: "Destroy a validator, keep consensus, rebuild from staking-key backup, then prove backup/restore with evidence.",
    href: "/recovery",
  },
  {
    n: "05",
    title: "Interchain messaging",
    body: "Northstar sends AssetApproved { assetId: 82731 } to Settlement. Teleporter, relayer, Warp, and BLS are traced.",
    href: "/icm",
  },
  {
    n: "06",
    title: "Reusable kit",
    body: "Customer-specific Northstar work extracted into an Institutional Avalanche L1 Deployment Kit for the next engagement.",
    href: "/kit",
  },
];

export default function Home() {
  return (
    <WithAcronyms>
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <p className="text-[12px] font-medium tracking-[0.22em] text-[#E84142] uppercase">
          Forward Deployed Engineering · Ava Labs
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
          A permissioned Avalanche L1 you could hand to a regulated institution.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Northstar Capital asked for a private EVM-compatible Avalanche L1 for tokenized financial assets. Validators stay on approved infrastructure. Public exposure is minimized. Operations are auditable. Node failure is recoverable. The network talks to another Avalanche chain.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/status" className={cn(buttonVariants({ size: "lg" }))}>
            Open the ops console
          </Link>
          <Link href="/engagement" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Read the engagement
          </Link>
        </div>
        <dl className="mt-12 grid gap-4 sm:grid-cols-4">
          {[
            ["Network", "3/3 validators"],
            ["Consensus", "Healthy"],
            ["ValidatorManager", "PoA · 3 active"],
            ["Recovery drill", "Passed"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
              <dt className="text-[11px] tracking-[0.16em] text-zinc-500 uppercase">{k}</dt>
              <dd className="mt-1 text-lg font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Reference architecture</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Not a token, NFT, or DeFi app. Validator infrastructure, isolation, observability, and ICM.
            </p>
          </div>
          <Link href="/architecture" className={cn(buttonVariants({ variant: "ghost" }))}>
            Full topology
          </Link>
        </div>
        <ArchitectureDiagram />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Six things this project has to prove</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Scoped against the Ava Labs Senior Forward Deployed Engineer role: own an institutional engagement, ship the infrastructure, then productize the pattern.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {proofs.map((proof) => (
            <Link key={proof.n} href={proof.href} className="group">
              <Card className="h-full bg-[#101012] transition-colors group-hover:bg-[#141416]">
                <CardHeader>
                  <p className="text-[11px] tracking-[0.2em] text-[#E84142]">{proof.n}</p>
                  <CardTitle className="text-lg">{proof.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-zinc-400">{proof.body}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgb(232_65_66/0.12),transparent_42%),#101012] px-6 py-10 sm:px-10">
          <p className="text-[12px] tracking-[0.2em] text-[#E84142] uppercase">The FDE loop</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">
            Ambiguous request. Working infrastructure. Reusable capability.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
            Northstar was the customer. The kit is the product. Once the deployment worked, the customer-specific pieces stayed in the case study, and the repeatable pieces became Terraform, Ansible, contracts, scripts, and runbooks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kit" className={cn(buttonVariants())}>
              See the deployment kit
            </Link>
            <Link href="/readiness" className={cn(buttonVariants({ variant: "outline" }))}>
              Implemented vs designed
            </Link>
          </div>
        </div>
      </section>
    </div>
    </WithAcronyms>
  );
}
