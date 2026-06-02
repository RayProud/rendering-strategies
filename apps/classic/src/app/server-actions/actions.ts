'use server';

// =============================================================================
// SERVER ACTIONS  (this is what 'use server' is actually for)
// =============================================================================
// A file-level 'use server' marks EVERY export as a Server Action: an async
// function that runs only on the server but is callable from the client. Next.js
// gives each export a private RPC endpoint and, on the client, replaces the
// function with a fetch() to that endpoint. The client never sees the body.
//
// WHAT HAPPENS IF SERVER-ACTION CODE "LEAKS" TO THE CLIENT:
//   • The function body never ships — only a reference (an action id) does. So
//     secrets inside the body stay on the server... with one caveat:
//   • CLOSED-OVER VALUES are serialized and sent to the client so they can be
//     sent back when the action is invoked. If you close over a secret
//     (`const apiKey = process.env.SECRET; return async () => useKey(apiKey)`),
//     that secret is encrypted in the payload but IS round-tripped. Never close
//     server actions over secrets; read env/secrets INSIDE the action instead.
//   • Inputs are untrusted. The endpoint is public — validate every argument as
//     if it came from a hostile client (because it can).
//
// LEAK GUARDRAIL: this action imports `store.ts`, which is `import 'server-only'`.
// If a client component tried to import these helpers, the build would fail.

import { revalidatePath } from 'next/cache';
import { actionsLog } from '@/logging/logger';
import { addMessageToStore } from './store';

export type AddMessageState = {
  ok: boolean;
  error?: string;
  lastText?: string;
};

export async function addMessage(
  _prev: AddMessageState,
  formData: FormData,
): Promise<AddMessageState> {
  // Runs on the server. `actionsLog` here writes through the SERVER LogTape
  // config (instrumentation.ts) → server terminal.
  const text = String(formData.get('text') ?? '').trim();
  actionsLog.info('addMessage invoked with text length {len}', {
    len: text.length,
  });

  // Validate untrusted input — the action endpoint is public.
  if (!text) {
    return { ok: false, error: 'Message cannot be empty.' };
  }
  if (text.length > 140) {
    return { ok: false, error: 'Message too long (max 140 chars).' };
  }

  addMessageToStore(text);

  // Tell Next the cached render of this route is stale so the server-rendered
  // list below the form refreshes with the new message.
  revalidatePath('/server-actions');

  return { ok: true, lastText: text };
}
