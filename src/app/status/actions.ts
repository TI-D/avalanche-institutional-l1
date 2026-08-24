"use server";

import { revalidatePath } from "next/cache";
import { applyAction, type Action } from "@/lib/control-plane";

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

export async function runDemoAction(formData: FormData) {
  const action = String(formData.get("action") ?? "") as Action;
  const validatorId = String(formData.get("validatorId") ?? "v2");
  if (!ACTIONS.has(action)) return;
  applyAction(action, validatorId);
  revalidatePath("/status");
}
