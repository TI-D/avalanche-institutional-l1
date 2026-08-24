import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <DocPage
      kicker="Infrastructure and security"
      title="Built as if a bank security review is the next meeting."
      lede="Developer-friendly defaults are the wrong default. Validators are isolated, RPC is allowlisted, secrets are not files on disk, and the HSM story is written down even where it is not implemented."
    >
      <Section title="Implemented and tested">
        <ul className="list-disc space-y-2 pl-5">
          <li>Terraform VPC with public, private, and isolated subnets. Validators and backup sit in private/isolated space.</li>
          <li>Security groups that allow 9651 only between validator ENIs, 9650 only from the RPC tier, and SSH only from a break-glass source.</li>
          <li>Encrypted EBS and S3 with KMS CMKs. Staking-key backup bucket is isolated and versioned.</li>
          <li>Ansible hardening: sshd, unattended upgrades, auditd, time sync, and a minimal listening surface.</li>
          <li>Centralized logs and metrics path (node exporter + AvalancheGo metrics to Prometheus).</li>
          <li>Documented administrative access: SSO to a jump host, no validator SSH from the internet.</li>
        </ul>
      </Section>
      <Section title="Production architecture documented, not implemented">
        <ul className="list-disc space-y-2 pl-5">
          <li>AWS CloudHSM or institution-managed HSM for BLS and staking key material, with AvalancheGo remote signing.</li>
          <li>Dual-control change windows for PoA owner actions (2-of-3 hardware keys, not a single laptop).</li>
          <li>Full packet capture / VPC flow logs retained to the institution&apos;s SIEM.</li>
          <li>Independent third-party penetration test and SOC2 control mapping.</li>
        </ul>
        <p>
          Faking an HSM in a demo would make this repo less credible. The distinction is explicit in{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">docs/production-readiness.md</code>.
        </p>
      </Section>
      <Section title="HSM / KMS design">
        <p>
          Implemented path: AWS KMS CMK wraps staking TLS keys, BLS keys, and Ansible vault material. Keys are generated on the node, exported once into an encrypted backup object, and the plaintext is shredded from the operator workstation.
        </p>
        <p>
          Production path: generate BLS and staking keys inside CloudHSM or an institution PKCS#11 HSM. AvalancheGo talks to a signer sidecar. The node filesystem never holds the private BLS key. KMS is then only for envelope encryption of non-consensus secrets (Grafana, relayer wallets, backup metadata). That split is the one I would take into a security architecture review.
        </p>
      </Section>
      <Section title="Threat model, short form">
        <p>
          Highest impact: compromise of a validator signing key, compromise of the PoA owner, or an RPC that is accidentally public and writable. Highest likelihood in sloppy deployments: SSH from 0.0.0.0/0, staking keys in git, and a validator that also serves public RPC. The kit is written to make those three mistakes hard.
        </p>
      </Section>
    </DocPage>
  );
}
