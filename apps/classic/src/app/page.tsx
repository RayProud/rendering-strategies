// Home / index of the classic app. Static Server Component.
export default function Home() {
  return (
    <main className="flex flex-col gap-3 max-w-2xl p-4">
      <p>
        This app runs with <code>cacheComponents: false</code> — the classic
        Next.js mental model. Every route is one of:
      </p>
      <ul className="list-disc list-inside">
        <li>
          <strong>○ Static</strong> — prerendered once at build, served from the
          CDN.
        </li>
        <li>
          <strong>ƒ Dynamic</strong> — re-rendered on every request (reads
          cookies/headers/searchParams, or opts in via a Route Segment Config).
        </li>
        <li>
          <strong>● SSG</strong> — a dynamic route prerendered per param at
          build.
        </li>
      </ul>
      <p>
        Pick an example above. The Partial Prerendering / Cache Components story
        lives in the sibling <code>apps/ppr</code> app (run{' '}
        <code>npm run dev:ppr</code>).
      </p>
    </main>
  );
}
