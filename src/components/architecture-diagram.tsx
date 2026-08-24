import { WithAcronyms } from "@/components/acronym";

function Label({
  x,
  y,
  width,
  text,
  className,
}: {
  x: number;
  y: number;
  width: number;
  text: string;
  className: string;
}) {
  return (
    <foreignObject x={x} y={y} width={width} height="28" overflow="visible">
      <div className={`text-center leading-5 ${className}`}>
        <WithAcronyms>{text}</WithAcronyms>
      </div>
    </foreignObject>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#0c0c0e] p-4 sm:p-6">
      <svg viewBox="0 0 920 620" className="mx-auto h-auto w-full min-w-[720px] max-w-4xl" role="img">
        <title>Northstar Capital Avalanche L1 architecture</title>
        <defs>
          <linearGradient id="box" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#111113" />
          </linearGradient>
        </defs>

        <rect x="280" y="16" width="360" height="58" rx="12" fill="url(#box)" stroke="#E84142" />
        <text x="460" y="40" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600">
          Northstar Capital
        </text>
        <text x="460" y="58" textAnchor="middle" fill="#a1a1aa" fontSize="11">
          Restricted operators, compliance, audit
        </text>

        <line x1="460" y1="74" x2="460" y2="108" stroke="#3f3f46" />

        <rect x="300" y="108" width="320" height="62" rx="12" fill="url(#box)" stroke="#3f3f46" />
        <Label x={300} y={120} width={320} text="Restricted RPC layer" className="text-[13px] font-semibold text-white" />
        <Label x={300} y={142} width={320} text="Intended: private ALB + mTLS. Terraform: NLB, no listener" className="text-[11px] text-zinc-400" />

        <line x1="460" y1="170" x2="460" y2="200" stroke="#3f3f46" />
        <line x1="170" y1="200" x2="750" y2="200" stroke="#3f3f46" />
        <line x1="170" y1="200" x2="170" y2="220" stroke="#3f3f46" />
        <line x1="460" y1="200" x2="460" y2="220" stroke="#3f3f46" />
        <line x1="750" y1="200" x2="750" y2="220" stroke="#3f3f46" />

        {[
          { x: 70, label: "Validator 1", sub: "AvalancheGo · 1a" },
          { x: 360, label: "Validator 2", sub: "AvalancheGo · 1b" },
          { x: 650, label: "Validator 3", sub: "AvalancheGo · 1c" },
        ].map((node) => (
          <g key={node.label}>
            <rect x={node.x} y="220" width="200" height="70" rx="12" fill="url(#box)" stroke="#3f3f46" />
            <circle cx={node.x + 22} cy="246" r="5" fill="#22c55e" />
            <text x={node.x + 36} y="250" fill="#fff" fontSize="13" fontWeight="600">
              {node.label}
            </text>
            <Label x={node.x} y={256} width={200} text={node.sub} className="text-[11px] text-zinc-400" />
          </g>
        ))}

        <line x1="170" y1="290" x2="170" y2="318" stroke="#3f3f46" />
        <line x1="460" y1="290" x2="460" y2="318" stroke="#3f3f46" />
        <line x1="750" y1="290" x2="750" y2="318" stroke="#3f3f46" />
        <line x1="170" y1="318" x2="750" y2="318" stroke="#3f3f46" />
        <line x1="460" y1="318" x2="460" y2="340" stroke="#3f3f46" />

        <rect x="300" y="340" width="320" height="54" rx="12" fill="url(#box)" stroke="#E84142" />
        <Label x={300} y={356} width={320} text="Northstar Avalanche L1" className="text-[13px] font-semibold text-white" />

        <line x1="460" y1="394" x2="460" y2="418" stroke="#3f3f46" />
        <rect x="300" y="418" width="320" height="54" rx="12" fill="url(#box)" stroke="#3f3f46" />
        <Label x={300} y={434} width={320} text="ValidatorManager · PoA" className="text-[13px] font-semibold text-white" />

        <line x1="460" y1="472" x2="460" y2="496" stroke="#3f3f46" />
        <rect x="160" y="496" width="240" height="62" rx="12" fill="url(#box)" stroke="#3f3f46" />
        <Label x={160} y={508} width={240} text="P-Chain registry" className="text-[13px] font-semibold text-white" />
        <text x="280" y="542" textAnchor="middle" fill="#a1a1aa" fontSize="11">
          Source of truth for validators
        </text>

        <Label x={400} y={500} width={120} text="ICM" className="text-[11px] font-semibold text-[#E84142]" />
        <line x1="400" y1="532" x2="520" y2="532" stroke="#E84142" />

        <rect x="520" y="496" width="240" height="62" rx="12" fill="url(#box)" stroke="#3f3f46" />
        <Label x={520} y={508} width={240} text="Settlement L1" className="text-[13px] font-semibold text-white" />
        <text x="640" y="542" textAnchor="middle" fill="#a1a1aa" fontSize="11">
          ApprovalReceived
        </text>

        <text x="460" y="590" textAnchor="middle" fill="#71717a" fontSize="11">
          Monitoring · logs · backups · recovery · runbooks
        </text>
      </svg>
    </div>
  );
}
