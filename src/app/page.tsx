import Link from "next/link";
import { WithAcronyms } from "@/components/acronym";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { EvidenceBanner } from "@/components/evidence-banner";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const proofs = [
  {
    n: "01",
    title: "Avalanche architecture",
    body: "Documented: EVM L1, AvalancheGo, P-Chain as validator registry, Subnet-EVM, restricted RPC, two BLS uses, ValidatorManager. Not running here.",
    href: "/architecture",
  },
  {
    n: "02",
    title: "Validator lifecycle",
    body: "Documented and then run locally: RegisterL1ValidatorTx and SetL1ValidatorWeightTx are in evidence/runs/20260824T202726Z. Stage 1 ./scripts/add-validator is still JSON.",
    href: "/validators",
  },
  {
    n: "03",
    title: "Institutional security",
    body: "AWS Terraform is still an unvalidated skeleton. Local substitutes (Envoy mTLS, gRPC signer, Prometheus/Loki, OpenBao+restic) are on /readiness. Hardware HSM is not implemented.",
    href: "/security",
  },
  {
    n: "04",
    title: "Failure and recovery",
    body: "Host kill/restore ran on Northstar (same NodeID). restic restore matched Settlement staking files. Console backup is still the JSON model.",
    href: "/recovery",
  },
  {
    n: "05",
    title: "Interchain messaging",
    body: "Foundry still covers auth. Live setApproval(82731) produced Settlement ApprovalReceived. Relayer had to stay up as a process.",
    href: "/icm",
  },
  {
    n: "06",
    title: "Reusable kit",
    body: "Northstar and Meridian overlays live under overlays/. Same create/deploy scripts. Terraform apply has not been run.",
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
          A permissioned Avalanche L1 design you can audit, not a live bank chain.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Northstar Capital is a fictional regulated asset manager. This repo is the engagement packet and kit skeleton for that request: private EVM L1, restricted operators, recoverable validators, one ICM approval to a Settlement L1.
        </p>
        <div className="mt-8">
          <EvidenceBanner level="locally-executed" title="Stage 2 ran on this laptop. The Stage 1 console is still a JSON model.">
            Heights, P-Chain add/remove, ICM delivery, and a same-NodeID restore have artifacts. Vercel never hosts the chain. Hardware HSM and AWS apply are not implemented.
          </EvidenceBanner>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/status" className={cn(buttonVariants({ size: "lg" }))}>
            Open the Stage 1 console
          </Link>
          <Link href="/readiness" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Evidence index
          </Link>
        </div>
        <dl className="mt-12 grid gap-4 sm:grid-cols-4">
          {[
            ["Evidence mode", "Locally executed"],
            ["AvalancheGo", "Local CLI net"],
            ["P-Chain txs", "Add + remove"],
            ["Recovery drill", "Same NodeID"],
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
            <h2 className="text-2xl font-semibold tracking-tight">Intended architecture</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Design drawing. The Terraform today does not implement the RPC path shown. See the gap list.
            </p>
          </div>
          <Link href="/architecture" className={cn(buttonVariants({ variant: "ghost" }))}>
            Full topology
          </Link>
        </div>
        <ArchitectureDiagram />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Six things this project still has to prove</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Scoped against the Ava Labs Senior Forward Deployed Engineer role. Documentation is not the same as operation.
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
            Ambiguous request. Then working infrastructure. Then a reusable kit.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
            Stage 1 is the request, architecture, and kit skeleton. Stage 2 ran locally. Sprint 5-8 are local substitutes. Sprint 9 is the Meridian overlay. The Stage 1 console buttons still only write JSON.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/stages" className={cn(buttonVariants())}>
              See the stages
            </Link>
            <Link href="/kit" className={cn(buttonVariants({ variant: "outline" }))}>
              Kit layout
            </Link>
          </div>
        </div>
      </section>
    </div>
    </WithAcronyms>
  );
}
