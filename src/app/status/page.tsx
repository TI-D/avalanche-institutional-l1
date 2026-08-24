import type { Metadata } from "next";
import { WithAcronyms } from "@/components/acronym";
import { OpsConsole } from "@/components/ops-console";
import { snapshot } from "@/lib/control-plane";

export const metadata: Metadata = {
  title: "Ops console",
};

export const dynamic = "force-dynamic";

export default function StatusPage() {
  const data = snapshot();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[12px] font-medium tracking-[0.22em] text-[#E84142] uppercase">
        Live demonstration
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Northstar operations console</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
        <WithAcronyms>
          This is the entire UI on purpose. Status, validator lifecycle, ICM, backup, and recovery. The point is infrastructure you can operate, break, and restore, not a financial application.
        </WithAcronyms>
      </p>
      <div className="mt-10">
        <OpsConsole data={data} />
      </div>
    </div>
  );
}
