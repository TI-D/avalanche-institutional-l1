import { runDemoAction } from "@/app/status/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Action, ControlPlanePayload } from "@/lib/control-plane-types";

const actions: {
  action: Action;
  label: string;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost";
}[] = [
  { action: "add-validator", label: "Add Validator 4" },
  { action: "remove-validator", label: "Remove Validator 2", variant: "outline" },
  { action: "destroy-validator", label: "Destroy Validator 2", variant: "destructive" },
  { action: "restore-validator", label: "Restore Validator 2", variant: "secondary" },
  { action: "send-icm", label: "Send AssetApproved", variant: "outline" },
  { action: "backup", label: "Backup keys", variant: "outline" },
  { action: "restore-backup", label: "Restore backup", variant: "outline" },
  { action: "reset", label: "Reset demo", variant: "ghost" },
];

function tone(status: string) {
  if (["healthy", "operational", "connected", "passed", "destination-verified", "success"].includes(status)) {
    return "bg-emerald-500";
  }
  if (["registering", "removing", "degraded", "origin-signed", "bls-aggregated", "relayed", "info"].includes(status)) {
    return "bg-amber-400";
  }
  return "bg-[#E84142]";
}

export function OpsConsole({ data }: { data: ControlPlanePayload }) {
  const { state, summary } = data;
  const cards = [
    ["Network", summary.validators],
    ["Consensus", summary.consensus],
    ["RPC", summary.rpc],
    ["Latest block", summary.latestBlock],
    ["Validator Manager", summary.validatorManager],
    ["ICM", summary.icm],
    ["Recovery test", summary.recovery],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/8 bg-[#101012] px-4 py-4">
            <div className="text-[11px] tracking-[0.16em] text-zinc-500 uppercase">{label}</div>
            <div className="mt-2 flex items-center gap-2 text-lg font-medium capitalize">
              <span className={`size-2 rounded-full ${tone(String(value))}`} />
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/8 bg-[#101012]">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold">Validators</h2>
              <p className="text-xs text-zinc-500">Northstar L1 · EVM {state.network.evmChainId}</p>
            </div>
            <Badge variant="outline">{state.network.consensus}</Badge>
          </div>
          <ul className="divide-y divide-white/6">
            {state.validators.map((v) => (
              <li key={v.id} className="grid gap-2 px-5 py-4 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${tone(v.status)}`} />
                    <span className="font-medium">{v.name}</span>
                    <span className="text-xs text-zinc-500">{v.az}</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-zinc-500">{v.nodeId}</p>
                </div>
                <div className="text-right text-xs text-zinc-400">
                  <div className="capitalize">{v.status}</div>
                  <div>weight {v.weight}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/8 bg-[#101012] p-5">
            <h2 className="text-base font-semibold">Demonstrations</h2>
            <p className="mt-1 text-xs text-zinc-500">
              These drive a local control-plane model of the real ValidatorManager / P-Chain / ICM flow.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map((item) => (
                <form key={item.action} action={runDemoAction}>
                  <input type="hidden" name="action" value={item.action} />
                  <input type="hidden" name="validatorId" value="v2" />
                  <Button type="submit" size="sm" variant={item.variant ?? "default"}>
                    {item.label}
                  </Button>
                </form>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#101012] p-5">
            <h2 className="text-base font-semibold">Last ICM message</h2>
            {state.icm.lastMessage ? (
              <pre className="mt-3 overflow-x-auto font-mono text-[11px] leading-5 text-zinc-300">
                {JSON.stringify(
                  {
                    id: state.icm.lastMessage.id,
                    from: "Northstar L1",
                    to: "Settlement L1",
                    stage: state.icm.lastMessage.stage,
                    payload: {
                      assetId: state.icm.lastMessage.assetId,
                      approved: state.icm.lastMessage.approved,
                    },
                  },
                  null,
                  2
                )}
              </pre>
            ) : (
              <p className="mt-3 text-sm text-zinc-500">No cross-chain message yet. Send AssetApproved.</p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-[#101012]">
        <div className="border-b border-white/8 px-5 py-4">
          <h2 className="text-base font-semibold">Audit trail</h2>
        </div>
        <ol className="divide-y divide-white/6">
          {state.events.map((evt) => (
            <li key={evt.id} className="px-5 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`size-1.5 rounded-full ${tone(evt.level)}`} />
                <span className="text-sm font-medium">{evt.title}</span>
                <span className="text-[11px] text-zinc-500">{new Date(evt.at).toLocaleTimeString()}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-400">{evt.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
