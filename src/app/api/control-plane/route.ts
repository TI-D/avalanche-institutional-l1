import { NextResponse } from "next/server";
import { applyAction, readState, summarize, type Action } from "@/lib/control-plane";

const ACTIONS = new Set<Action>([
  "add-validator",
  "remove-validator",
  "destroy-validator",
  "restore-validator",
  "send-icm",
  "backup",
  "restore-backup",
  "reset",
]);

export function GET() {
  const state = readState();
  return NextResponse.json({ state, summary: summarize(state) });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    action?: Action;
    validatorId?: string;
  };
  if (!body.action || !ACTIONS.has(body.action)) {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  const state = applyAction(body.action, body.validatorId);
  return NextResponse.json({ state, summary: summarize(state) });
}
