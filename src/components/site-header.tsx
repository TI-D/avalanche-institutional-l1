"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Acronym, WithAcronyms } from "@/components/acronym";
import { AvalancheMark } from "@/components/avalanche-mark";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#070708]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <AvalancheMark className="size-7" />
          <div className="leading-tight">
            <div className="text-[13px] font-semibold tracking-tight">
              Northstar <Acronym term="L1" underline={false} />
            </div>
            <div className="text-[11px] text-muted-foreground">Institutional Avalanche Reference</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[13px] transition-colors",
                  active ? "bg-white/8 text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                <WithAcronyms>{item.label}</WithAcronyms>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/status" className={cn(buttonVariants(), "hidden sm:inline-flex")}>
            Open console
          </Link>
          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "lg:hidden")}
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0b0b0d]">
              <SheetHeader>
                <SheetTitle>
                  Northstar <Acronym term="L1" underline={false} />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    <WithAcronyms>{item.label}</WithAcronyms>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
