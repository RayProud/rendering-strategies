'use client';

// =============================================================================
// The interactive form — a Client Component.
// =============================================================================
// Forms that call Server Actions live on the client so they can use the action
// hooks and provide instant feedback:
//   • useActionState(action, initial) → [state, formAction, isPending]
//       Binds the server action to the <form>; `state` is whatever the action
//       returned (here {ok, error, lastText}); the form posts to the action.
//   • useFormStatus() → { pending } — must be read by a component rendered
//       INSIDE the <form>, hence the separate <SubmitButton/>.
//
// PROGRESSIVE ENHANCEMENT: because the form's `action` is a real server endpoint,
// it works even before JS hydrates — submitting posts to the action directly.
// Once hydrated, you get the pending state and no full-page reload.
//
// NOTE: we import the action from a 'use server' module. Importing the action
// (a reference) is fine on the client. Importing store.ts (server-only) would
// NOT be — that's the boundary the build enforces.

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { uiLog } from '@/logging/logger';
import { addMessage, type AddMessageState } from './actions';

const initialState: AddMessageState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
    >
      {pending ? 'Saving…' : 'Add message'}
    </button>
  );
}

export default function MessageForm() {
  const [state, formAction] = useActionState(addMessage, initialState);

  // `uiLog` runs in the BROWSER → writes through the CLIENT LogTape config
  // (instrumentation-client.ts) → devtools console. Same logger API as the
  // server action's `actionsLog`, different runtime + sink. NOTE: logging is a
  // side effect, so it lives in useEffect, not in render. (Logging during render
  // also trips Next's "Date.now() in a Client Component" prerender guard, since
  // LogTape timestamps each record.)
  useEffect(() => {
    uiLog.debug('MessageForm result ok={ok}', { ok: state.ok });
  }, [state.ok]);

  return (
    <form action={formAction} className="flex flex-col gap-2 max-w-md">
      <input
        name="text"
        placeholder="Type a message…"
        className="border rounded px-3 py-2 text-black"
      />
      <SubmitButton />
      {state.error && <p className="text-red-600">{state.error}</p>}
      {state.ok && state.lastText && (
        <p className="text-green-600">Added: “{state.lastText}”</p>
      )}
    </form>
  );
}
