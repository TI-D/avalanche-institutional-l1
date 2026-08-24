import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = { title: "Production readiness" };

const rows = [
  ["Multi-validator topology and health model", "Implemented", "Local control plane + IaC modules"],
  ["Restricted RPC / validator split", "Implemented", "Terraform SG + network modules"],
  ["ValidatorManager lifecycle scripts", "Implemented", "Modeled against ACP-77/99; live L1 needs funded Fuji keys"],
  ["ICM AssetApproved path", "Implemented", "Contracts + console trace; relayer binary is documented"],
  ["Staking-key backup / restore", "Implemented", "Scripts + Terraform backup bucket"],
  ["Ansible hardening", "Implemented", "sshd, auditd, upgrades, listening surface"],
  ["Observability skeleton", "Implemented", "Prometheus / Grafana module"],
  ["KMS envelope encryption", "Implemented", "Terraform CMKs for disks, backups, secrets"],
  ["CloudHSM remote signing", "Designed", "See docs/production-readiness.md"],
  ["Dual-control PoA owner", "Designed", "2-of-3 hardware keys, not shipped"],
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
