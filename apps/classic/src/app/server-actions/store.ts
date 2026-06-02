import 'server-only';

// =============================================================================
// In-memory data store — SERVER ONLY.
// =============================================================================
// The `import 'server-only'` on line 1 is a build-time guardrail. If any module
// that ends up in the CLIENT bundle imports this file (directly or transitively),
// the build FAILS with a clear error instead of silently shipping server code to
// the browser. Use it on anything that holds secrets, DB handles, private env
// vars, or — as here — server-side state that must never be duplicated to the
// client. Try importing `messages` from a 'use client' component to see it fail.
//
// (A real app would use a database; an in-memory array keeps the example zero-dep.
// Note module state resets on server restart and is not shared across instances.)

export type Message = { id: number; text: string; at: string };

const messages: Message[] = [
  {
    id: 0,
    text: 'First message (seeded at server start)',
    at: new Date().toISOString(),
  },
];

export function getMessages(): Message[] {
  return messages;
}

export function addMessageToStore(text: string): Message {
  const message: Message = {
    id: messages.length,
    text,
    at: new Date().toISOString(),
  };
  messages.push(message);
  return message;
}
