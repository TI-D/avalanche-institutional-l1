import type { EvidenceLevel } from "@/lib/evidence";
import { evidenceLabel } from "@/lib/evidence";
import { cn } from "@/lib/utils";

const tone: Record<EvidenceLevel, string> = {
  modeled: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  "source-written": "border-sky-400/40 bg-sky-400/10 text-sky-200",
  "locally-executed": "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  "fuji-executed": "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  "aws-lab-executed": "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  "externally-validated": "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
};

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-[0.08em] uppercase",
        tone[level]
      )}
    >
      {evidenceLabel(level)}
    </span>
  );
}
