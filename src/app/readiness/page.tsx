import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = { title: "Production readiness" };

const rows = [
  ["Stage 1: site, kit, operator model", "Shipped", "Docs, Terraform/Ansible modules, contracts, JSON control-plane console"],
  ["Stage 2: local AvalancheGo L1s", "Planned, scripts ready", "avalanche-cli northstar + settlement. Not booted in this environment yet"],
  ["Stage 3: Fuji / production go-live", "Plan only", "docs/stage-3-go-live.md. No cloud apply, no mainnet txs"],
  ["Multi-validator topology and health model", "Stage 1 model / Stage 2 live", "Console is a model until local RPC is wired"],
  ["ValidatorManager lifecycle", "Stage 1 modeled / Stage 2 real CLI", "addValidator against local P-Chain is the Stage 2 proof"],
  ["ICM AssetApproved path", "Contracts written / Stage 2 executes", "Relayer is CLI-managed on the local network"],
  ["Terraform + Ansible", "Written, not applied", "Stage 3 dress rehearsal is the first apply"],
  ["KMS envelope encryption", "Written in Terraform", "Stage 3. No AWS account attached"],
  ["CloudHSM remote signing", "Designed", "See docs/production-readiness.md"],
  ["Dual-control PoA owner", "Designed", "2-of-3 hardware keys, Stage 3 requirement"],
  ["SIEM / packet capture retention", "Designed", "Institution-owned, not this repo"],
  ["Independent pentest", "Designed", "Out of scope for the reference"],
];

export default function ReadinessPage() {
  return (
    <DocPage
      kicker="Honesty"
      title="Implemented and tested versus designed and not built."
      lede="A reference deployment that pretends CloudHSM is running is a toy. This page is the boundary I would walk into an interview with."
    >
      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-white/5 text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Capability</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {rows.map(([cap, status, notes]) => (
              <tr key={cap}>
                <td className="px-4 py-3">{cap}</td>
                <td className={`px-4 py-3 ${status === "Implemented" ? "text-emerald-400" : "text-amber-300"}`}>
                  {status}
                </td>
                <td className="px-4 py-3 text-zinc-400">{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocPage>
  );
}
