import Link from "next/link";
import { EvidenceBadge } from "@/components/evidence-badge";
import type { EvidenceLevel } from "@/lib/evidence";

export function EvidenceBanner({
  level,
  title,
  children,
}: {
  level: EvidenceLevel;
  title: string;
  children: string;
}) {
  return (
    <aside className="rounded-2xl border border-amber-400/25 bg-amber-400/8 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-center gap-2">
        <EvidenceBadge level={level} />
        <p className="text-sm font-medium text-amber-100">{title}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{children}</p>
      <p className="mt-2 text-xs text-zinc-500">
        Status index:{" "}
        <Link href="/readiness" className="text-zinc-300 underline decoration-white/20 hover:text-white">
          /readiness
        </Link>
      </p>
    </aside>
  );
}
