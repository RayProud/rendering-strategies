import Link from 'next/link';

// Data-driven nav. `tag` is the mode each route builds as (run `next build` to
// confirm). With cacheComponents OFF these are real ○ / ƒ / ● classifications.
const ROUTES: Array<{ href: string; label: string; tag: string }> = [
  { href: '/', label: 'Home', tag: '' },
  { href: '/server-static', label: 'Server Static', tag: '○' },
  { href: '/client-static', label: 'Client Static', tag: '○' },
  { href: '/server-dynamic', label: 'Server Dynamic', tag: 'ƒ' },
  { href: '/client-dynamic', label: 'Client Dynamic', tag: '○+use()' },
  {
    href: '/server-static-turned-dynamic',
    label: 'Turned Dynamic (child)',
    tag: 'ƒ',
  },
  { href: '/force-dynamic', label: 'force-dynamic', tag: 'ƒ' },
  {
    href: '/server-static-use-server',
    label: "Why not 'use server'",
    tag: 'ƒ',
  },
  { href: '/server-actions', label: 'Server Actions', tag: 'action' },
  { href: '/ssg', label: 'SSG', tag: '●' },
  { href: '/shared-component', label: 'Shared component', tag: 'shared' },
];

export default function Links() {
  return (
    <div className="flex flex-wrap items-center justify-center max-w-4xl">
      {ROUTES.map((route) => (
        <Link key={route.href} href={route.href}>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
