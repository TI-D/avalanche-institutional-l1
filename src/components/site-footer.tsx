import Link from "next/link";
import { WithAcronyms } from "@/components/acronym";
import { AvalancheMark } from "@/components/avalanche-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-3">
          <AvalancheMark className="mt-0.5 size-6" />
          <div>
            <p className="text-sm font-medium">
              <WithAcronyms>Institutional Avalanche L1 Deployment Kit</WithAcronyms>
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              <WithAcronyms>
                A reusable reference for taking a regulated institution from an ambiguous L1 request to working validator, RPC, ICM, and recovery infrastructure.
              </WithAcronyms>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
          <Link href="/stages" className="hover:text-white">
            Stages
          </Link>
          <Link href="/readiness" className="hover:text-white">
            Implemented vs designed
          </Link>
          <Link href="/ops" className="hover:text-white">
            Runbooks
          </Link>
          <a
            href="https://github.com/TI-D/avalanche-institutional-l1"
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://jobs.ashbyhq.com/ava-labs/444892f3-0872-4476-9d52-20c7f1b1f8d4"
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Ava Labs <WithAcronyms>FDE</WithAcronyms> role
          </a>
        </div>
      </div>
    </footer>
  );
}
