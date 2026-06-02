import { Suspense } from 'react';
import { connection } from 'next/server';
import MessageForm from './message-form';
import { getMessages } from './store';

// =============================================================================
// SERVER ACTIONS demo  (ƒ Dynamic)
// =============================================================================
// This page is a SERVER Component that reads the in-memory store directly (no
// fetch, no API route) and hands interactivity to the client <MessageForm/>.
// `await connection()` opts it into request-time rendering so the list always
// reflects fresh state after the action calls revalidatePath('/server-actions'),
// making the route ƒ. (Server Actions themselves are independent of
// cacheComponents — they work the same in both apps.)

export default function ServerActionsPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-semibold">Server Actions</h1>
      <p>
        Submit the form — it calls a server action, mutates server state, and
        revalidates this route. Watch logs in BOTH the server terminal (action)
        and the browser console (form).
      </p>

      {/* Client island: the interactive form. */}
      <MessageForm />

      {/* Dynamic island: server-rendered list, fresh on every request. */}
      <Suspense fallback={<p>Loading messages…</p>}>
        <MessageList />
      </Suspense>
    </div>
  );
}

async function MessageList() {
  // `connection()` opts this subtree into request-time rendering so it always
  // shows the latest store contents (and re-renders after revalidatePath).
  await connection();
  const messages = getMessages();
  return (
    <ul className="list-disc list-inside">
      {messages.map((m) => (
        <li key={m.id}>
          {m.text} <span className="opacity-50 text-xs">({m.at})</span>
        </li>
      ))}
    </ul>
  );
}
