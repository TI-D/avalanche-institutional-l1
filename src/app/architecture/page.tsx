import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { DocPage, Section } from "@/components/doc-page";

export const metadata: Metadata = { title: "Architecture" };

export default function ArchitecturePage() {
  return (
    <DocPage
      kicker="Architecture"
      title="AvalancheGo, the P-Chain, and a permissioned EVM L1."
      lede="The topology is institutional on purpose: validators never face the internet, RPC is a separate concern, and the P-Chain remains the source of truth for the validator set."
    >
      <ArchitectureDiagram />
      <Section title="AvalancheGo">
        <p>
          Every validator and RPC node in this design runs AvalancheGo. Validators participate in consensus for the Northstar L1 and keep a partial-sync view of the Primary Network so they can read P-Chain validator state without paying the cost of a full C-Chain archive. RPC nodes run the same binary with different chain configs: they do not stake, they serve JSON-RPC, and they sit behind the restricted access layer.
        </p>
      </Section>
      <Section title="P-Chain is the registry">
        <p>
          After ACP-77, an L1 still begins life as a Subnet. <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">CreateSubnetTx</code> and{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">CreateChainTx</code> create the Subnet and the EVM chain.{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">ConvertSubnetToL1Tx</code> converts it to an L1 and registers the initial validators with their BLS keys. From that point the P-Chain stores the validator set. The on-chain ValidatorManager is the policy engine that is allowed to ask the P-Chain to add, reweight, or remove validators.
        </p>
      </Section>
      <Section title="Subnet-EVM and the permissioned L1">
        <p>
          The execution environment is Subnet-EVM. Genesis pins the EVM chain ID, fee config, Warp/ICM settings, and precompiles. For Northstar the important precompiles are the Warp messenger, allowlists for deployers, and (if they later leave PoA) the native minter. This is still Ethereum JSON-RPC for application teams. It is not a public chain.
        </p>
      </Section>
      <Section title="Validator set and BLS">
        <p>
          Each AvalancheGo node holds a NodeID, TLS staking certs, and a BLS key. BLS matters twice: validator registration on the P-Chain requires a BLS public key and proof of possession, and ICM/Warp messages are signed by validators and aggregated into one multi-signature. If you cannot explain those two uses of the same key material, you do not yet understand the stack.
        </p>
      </Section>
      <Section title="RPC is not a validator">
        <p>
          Institutions constantly collapse these. Validators produce blocks. RPC nodes serve wallets, custodians, and internal services. Mixing them widens the attack surface and couples query load to consensus. Northstar therefore has a private RPC tier: archive for audit and debug, pruned for transaction intake, both reached only through an allowlisted, mTLS-terminated endpoint.
        </p>
      </Section>
      <Section title="Why this matches Ava Labs tooling">
        <p>
          This is the same shape <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px]">avalanche-deploy</code> promotes: Terraform for VPC, validators, RPC, monitoring, and backups; Ansible for AvalancheGo and node config; optional ICM relayer and ValidatorManager initialization. The kit does not invent a parallel universe. It adds the institutional controls on top of the pattern Ava is already shipping.
        </p>
      </Section>
    </DocPage>
  );
}
