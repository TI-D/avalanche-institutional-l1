import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Engagement" };

export default function EngagementPage() {
  return (
    <DocPage
      kicker="The engagement"
      title="Northstar Capital needed a private Avalanche L1. They did not have a spec."
      lede="This is the Forward Deployed shape of the work: take an institutional request that is strategically clear and technically incomplete, turn it into an architecture, make it run, then extract the reusable kit."
      evidence={{
        level: "source-written",
        title: "Fictional engagement. No customer, no live network.",
        note: "The inbound request and the refuse-to-build list are real FDE framing. The operate and interoperate steps have not been executed against AvalancheGo.",
      }}
    >
      <Section title="The inbound request">
        <p>
          Northstar Capital is a fictional regulated asset manager. Their Director of Engineering asked for a private, permissioned, EVM-compatible Avalanche L1 for tokenized financial assets. Validators had to be controlled by approved infrastructure. Public exposure had to be minimized. Operations had to be auditable. Node failure had to be recoverable. The network had to speak to a second Avalanche chain used for settlement.
        </p>
        <p>
          That is a real institutional sentence. It is also not an architecture. There is no validator count, no key-custody model, no network diagram, no recovery RPO, and no statement of which Avalanche primitives they actually need.
        </p>
      </Section>
      <Section title="What I refused to build">
        <p>
          A token. An NFT drop. A DeFi demo. A hello-world subnet. Those would have been faster and would have missed the job. The gap in the Ava Labs Senior Forward Deployed Engineer posting is not Solidity for a marketplace. It is AvalancheGo, validators, ICM, restricted networking, KMS/HSM, failover, and the instinct to productize the pattern.
        </p>
      </Section>
      <Section title="How this engagement should be run">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong className="text-white">Understand.</strong> Run AvalancheGo locally. Touch the EVM. Read the P-Chain as the validator registry. Add and remove validators by hand before automating anything. Status: not executed in this repo.
          </li>
          <li>
            <strong className="text-white">Operate.</strong> Stand up validators. Break one. Fence the old host. Restore the same NodeID. Watch accepted height. Status: JSON model only.
          </li>
          <li>
            <strong className="text-white">Interoperate.</strong> Deploy Teleporter, run a relayer, send AssetApproved, and verify ApprovalReceived with origin checks. Status: contracts and Foundry tests written. No live delivery.
          </li>
          <li>
            <strong className="text-white">Secure.</strong> Threat-model the system. Segment validator and RPC networks. Write down key custody, including the HSM design that is not faked. Status: prose plus an unvalidated Terraform skeleton.
          </li>
          <li>
            <strong className="text-white">Automate.</strong> Only then Terraform, Ansible, and operator scripts that talk to real nodes.
          </li>
          <li>
            <strong className="text-white">Productize.</strong> Split Northstar-specific policy from the kit after a second overlay proves reuse.
          </li>
        </ol>
      </Section>
      <Section title="What stays customer-specific">
        <p>
          Northstar&apos;s legal entity, their allowlisted operator CIDRs, their PoA admin set, their EVM chain ID, and the AssetApproved payload they send to Settlement. Those belong in an engagement folder, not in the kit defaults.
        </p>
      </Section>
      <Section title="What becomes the kit">
        <p>
          Network isolation, validator and RPC split, ValidatorManager lifecycle, staking-key backup, ICM wiring, observability, and the runbooks. The next institution should get those as a starting system. That extraction is not proven until a second overlay exists.
        </p>
      </Section>
    </DocPage>
  );
}
