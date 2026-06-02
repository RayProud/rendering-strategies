// Home / index of the PPR app. Static shell (the shell of every PPR route).
export default function Home() {
  return (
    <main className="flex flex-col gap-3 max-w-2xl p-4">
      <p>
        This app runs with <code>cacheComponents: true</code> — Next.js 16
        Partial Prerendering. The flag is APP-WIDE and changes the rules:
      </p>
      <ul className="list-disc list-inside">
        <li>
          Every route ships an instant <strong>static shell</strong>, then
          streams its <strong>dynamic holes</strong> → routes are{' '}
          <strong>◐</strong>, not ƒ.
        </li>
        <li>
          Any runtime read (<code>await cookies()</code>,{' '}
          <code>searchParams</code>,<code>new Date()</code>) outside{' '}
          <code>&lt;Suspense&gt;</code> / <code>&apos;use cache&apos;</code> /{' '}
          <code>connection()</code> is a build error.
        </li>
        <li>
          Route Segment Configs (<code>dynamic</code>,{' '}
          <code>dynamicParams</code>, …) are forbidden — use{' '}
          <code>&lt;Suspense&gt;</code> / <code>connection()</code>
          instead.
        </li>
      </ul>
      <p>
        Each route here has a ƒ twin in the classic app (run{' '}
        <code>npm run dev:classic</code>) — compare them side by side.
      </p>
    </main>
  );
}
