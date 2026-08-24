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
        <text x="460" y="134" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">
          Restricted RPC layer
        </text>
        <text x="460" y="154" textAnchor="middle" fill="#a1a1aa" fontSize="11">
          Private ALB · mTLS · allowlisted CIDRs
        </text>

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
            <text x={node.x + 22} y="272" fill="#a1a1aa" fontSize="11">
              {node.sub}
            </text>
          </g>
        ))}

        <line x1="170" y1="290" x2="170" y2="318" stroke="#3f3f46" />
        <line x1="460" y1="290" x2="460" y2="318" stroke="#3f3f46" />
        <line x1="750" y1="290" x2="750" y2="318" stroke="#3f3f46" />
        <line x1="170" y1="318" x2="750" y2="318" stroke="#3f3f46" />
        <line x1="460" y1="318" x2="460" y2="340" stroke="#3f3f46" />

        <rect x="300" y="340" width="320" height="54" rx="12" fill="url(#box)" stroke="#E84142" />
        <text x="460" y="372" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">
          Northstar Avalanche L1
        </text>

        <line x1="460" y1="394" x2="460" y2="418" stroke="#3f3f46" />
        <rect x="300" y="418" width="320" height="54" rx="12" fill="url(#box)" stroke="#3f3f46" />
        <text x="460" y="450" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">
          ValidatorManager · PoA
        </text>

        <line x1="460" y1="472" x2="460" y2="496" stroke="#3f3f46" />
        <rect x="160" y="496" width="240" height="62" rx="12" fill="url(#box)" stroke="#3f3f46" />
        <text x="280" y="522" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">
          P-Chain registry
        </text>
        <text x="280" y="542" textAnchor="middle" fill="#a1a1aa" fontSize="11">
          Source of truth for validators
        </text>

        <text x="460" y="518" textAnchor="middle" fill="#E84142" fontSize="11" fontWeight="600">
          ICM
        </text>
        <line x1="400" y1="532" x2="520" y2="532" stroke="#E84142" />

        <rect x="520" y="496" width="240" height="62" rx="12" fill="url(#box)" stroke="#3f3f46" />
        <text x="640" y="522" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">
          Settlement L1
        </text>
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
