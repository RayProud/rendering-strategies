import Link from 'next/link';

// PPR app nav. With cacheComponents ON, dynamic routes become ◐ (Partial
// Prerender: static shell + streamed dynamic holes) rather than ƒ. Compare each
// route with its ƒ counterpart in the classic app.
const ROUTES: Array<{ href: string; label: string; tag: string }> = [
  { href: '/', label: 'Home', tag: '' },
  {
    href: '/partial-prerendering',
    label: 'Partial Prerendering',
    tag: '◐',
  },
  { href: '/server-dynamic', label: 'Server Dynamic', tag: '◐' },
  {
    href: '/server-static-turned-dynamic',
    label: 'Turned Dynamic (contained)',
    tag: '◐',
  },
];

export default function Links() {
  return (
    <div className="flex flex-wrap items-center justify-center max-w-4xl">
      {ROUTES.map((route) => (
        <Link key={route.href} href={route.href}>
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
          >
            {route.label}{' '}
            {route.tag && (
              <span className="opacity-60 text-xs">{route.tag}</span>
            )}
          </button>
        </Link>
      ))}
    </div>
  );
}
