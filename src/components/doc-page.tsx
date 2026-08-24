import type { ReactNode } from "react";
import { WithAcronyms } from "@/components/acronym";
import { EvidenceBanner } from "@/components/evidence-banner";
import type { EvidenceLevel } from "@/lib/evidence";

export function DocPage({
  kicker,
  title,
  lede,
  children,
  evidence,
}: {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
  evidence?: { level: EvidenceLevel; title: string; note: string };
}) {
  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-[12px] font-medium tracking-[0.22em] text-[#E84142] uppercase">
        <WithAcronyms>{kicker}</WithAcronyms>
      </p>
      <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        <WithAcronyms underline={false}>{title}</WithAcronyms>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
        <WithAcronyms>{lede}</WithAcronyms>
      </p>
      {evidence ? (
        <div className="mt-8">
          <EvidenceBanner level={evidence.level} title={evidence.title}>
            {evidence.note}
          </EvidenceBanner>
        </div>
      ) : null}
      <div className="mt-12 space-y-12">
        <WithAcronyms>{children}</WithAcronyms>
      </div>
    </article>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        <WithAcronyms>{title}</WithAcronyms>
      </h2>
      <div className="space-y-4 text-[15px] leading-7 text-zinc-300">
        <WithAcronyms>{children}</WithAcronyms>
      </div>
    </section>
  );
}
