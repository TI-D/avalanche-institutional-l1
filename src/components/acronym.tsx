"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from "react";
import { ACRONYM_PATTERN, resolveAcronym } from "@/lib/acronyms";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function Acronym({
  term,
  children,
  className,
  underline = true,
}: {
  term: string;
  children?: ReactNode;
  className?: string;
  underline?: boolean;
}) {
  const entry = resolveAcronym(term) ?? resolveAcronym(String(children ?? ""));
  const label = children ?? term;
  if (!entry) return <>{label}</>;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <abbr
            className={cn(
              "cursor-help",
              underline
                ? "underline decoration-dotted decoration-white underline-offset-4"
                : "no-underline",
              className
            )}
            title=""
          />
        }
      >
        {label}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-72 flex-col items-start gap-1.5 rounded-xl border border-white/10 bg-[#141416] px-3 py-2.5 text-left text-zinc-100 shadow-xl"
      >
        <p className="text-[10px] font-semibold tracking-[0.16em] text-[#E84142] uppercase">
          {entry.term}
        </p>
        <p className="text-xs leading-5 text-zinc-300">{entry.standsFor}</p>
        <a
          href={entry.href}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-[#E84142] underline-offset-3 hover:underline"
        >
          Avalanche docs
        </a>
      </TooltipContent>
    </Tooltip>
  );
}

const SKIP = new Set(["code", "pre", "svg", "path", "abbr"]);

export function WithAcronyms({
  children,
  underline = true,
}: {
  children: ReactNode;
  underline?: boolean;
}): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return replaceAcronyms(String(child), underline);
    }
    if (!isValidElement<{ children?: ReactNode; className?: string }>(child)) {
      return child;
    }
    const type = child.type;
    if (type === Acronym || type === WithAcronyms) return child;
    if (typeof type === "string" && SKIP.has(type)) return child;
    if (child.props.children == null) return child;
    const nextUnderline = underline && type !== "h1";
    return cloneElement(
      child,
      undefined,
      <WithAcronyms underline={nextUnderline}>{child.props.children}</WithAcronyms>
    );
  });
}

function replaceAcronyms(text: string, underline = true): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  const pattern = new RegExp(ACRONYM_PATTERN.source, ACRONYM_PATTERN.flags);
  for (const match of text.matchAll(pattern)) {
    const raw = match[1];
    const index = match.index ?? 0;
    const entry = resolveAcronym(raw);
    if (!entry) continue;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      <Acronym key={`${raw}-${index}`} term={entry.term} underline={underline}>
        {raw}
      </Acronym>
    );
    last = index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}
