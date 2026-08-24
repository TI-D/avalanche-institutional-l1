import type { Metadata } from "next";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <DocPage
      kicker="Infrastructure and security"
      title="Write the security review before claiming the controls exist."
      lede="Developer-friendly defaults are the wrong default. The intended design isolates validators, allowlists RPC, and keeps signing keys off operator laptops. The Terraform in this repo does not yet implement that design."
      evidence={{
        level: "source-written",
        title: "Nothing here is implemented and tested.",
        note: "Modules are an unvalidated skeleton. Secrets are still designed as files on disk. Backup IAM is too wide. See docs/aws-kit-gaps.md.",
      }}
    >
      <Section title="Source written, not applied">
        <ul className="list-disc space-y-2 pl-5">
          <li>Terraform VPC with public, private, and isolated subnets. Isolated subnets are unused by the backup module.</li>
          <li>Security groups intend 9651 between validators and 9650 from the RPC tier. No private bootstrap peer list or advertised staking host is configured.</li>
          <li>A jump-host security group exists. No jump host is provisioned. SSM is not configured.</li>
          <li>Encrypted EBS and a versioned S3 backup bucket are sketched. Every validator role can read every backup object with the shared KMS key.</li>
          <li>Ansible would drop TLS and BLS files under /etc/avalanchego/staking. That contradicts any claim that secrets are not files on disk.</li>
          <li>Monitoring is one EC2 instance and a disconnected CloudWatch log group. There is no Prometheus, Grafana, or alert.</li>
        </ul>
      </Section>
      <Section title="Designed, not built">
        <ul className="list-disc space-y-2 pl-5">
          <li>Private ALB or an NLB-plus-proxy path with real mTLS. Current code creates an internal NLB with no listener, target group, or targets. AvalancheGo is templated to bind HTTP to 127.0.0.1.</li>
          <li>AWS CloudHSM or institution PKCS#11 for BLS remote signing. AvalancheGo 1.13.5 has a BLS RPC signer. That is not wired. Staking TLS / NodeID is a different key path.</li>
          <li>Dual-control change windows for PoA owner actions (2-of-3 hardware keys).</li>
          <li>VPC flow logs retained to an institution SIEM.</li>
          <li>Independent third-party penetration test and SOC2 control mapping.</li>
        </ul>
      </Section>
      <Section title="HSM / KMS design">
        <p>
          Intended envelope path: AWS KMS wraps backup ciphertext and non-consensus secrets. That is not the same as HSM signing.
        </p>
        <p>
          Intended production path: generate BLS keys inside CloudHSM or an institution PKCS#11 HSM only after confirming that device can do the exact BLS12-381 operations AvalancheGo needs. AvalancheGo talks to a signer sidecar. The node filesystem should not hold the private BLS key. Staking TLS / NodeID may still be file-backed unless a separate custody design is written. KMS then envelopes Grafana, relayer wallets, and backup metadata. None of that is running.
        </p>
      </Section>
      <Section title="Threat model, short form">
        <p>
          Highest impact: compromise of a validator signing key, compromise of the PoA owner, or an RPC that is accidentally public and writable. Highest likelihood in sloppy deployments: SSH from 0.0.0.0/0, staking keys in git, and a validator that also serves public RPC. The current backup IAM would let one compromised validator read the others&apos; identity backups. That is a defect, not a control.
        </p>
      </Section>
    </DocPage>
  );
}
