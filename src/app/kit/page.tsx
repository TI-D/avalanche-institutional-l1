import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Deployment kit" };

export default function KitPage() {
  return (
    <DocPage
      kicker="Productization"
      title="Northstar is meant to reveal a pattern. The kit is that pattern, unfinished."
      lede="The engagement is not done when the customer network is up. It is done when the next institution can start from Terraform, Ansible, contracts, scripts, and runbooks instead of a slide deck."
      evidence={{
        level: "source-written",
        title: "Folder layout, not a proven product.",
        note: "No second customer overlay exists. Terraform is an unvalidated skeleton. Operator scripts for Stage 1 talk to JSON.",
      }}
    >
      <pre className="overflow-x-auto rounded-2xl border border-white/8 bg-[#101012] p-5 font-mono text-[12px] leading-6 text-zinc-300">
        {`avalanche-institutional-l1/
├── terraform/     network, validators, rpc, monitoring, backup
├── ansible/       avalanchego, hardening
├── contracts/     Foundry: registry, receiver, tests
├── scripts/       deploy, health, add/remove validator, backup, restore
├── docs/          architecture, threat model, lifecycle, ICM, readiness
├── runbooks/      failure, replacement, upgrade, incident
└── src/           this documentation site and ops console`}
      </pre>
      <Section title="How the next customer uses it">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Copy the kit. Fill <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">terraform.tfvars</code> with their CIDRs, validator count, and KMS key policy principals.</li>
          <li>Keep their genesis, PoA owners, and ICM payload in an engagement overlay, not in module defaults.</li>
          <li>Run <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">./scripts/deploy</code>, then the validator lifecycle and recovery drills before anyone calls it production.</li>
          <li>If three customers need the same signer or the same allowlist pattern, promote that into the kit. Do not fork it three times.</li>
        </ol>
      </Section>
      <Section title="What I would productize next">
        <p>
          A remote-signing sidecar that talks to CloudHSM. A ValidatorManager change ticket that cannot be submitted without a dual-control approval. Those come up as soon as a real deployment exists. They are listed as designed, not built.
        </p>
      </Section>
    </DocPage>
  );
}
