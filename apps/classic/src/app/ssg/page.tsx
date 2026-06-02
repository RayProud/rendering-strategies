import Link from 'next/link';

// Static index for the SSG demo. This page is itself statically generated; it
// links to the per-slug pages produced by generateStaticParams in [slug]/page.tsx.
export default function SsgIndex() {
  const slugs = ['hello-world', 'rendering-101', 'ppr'];
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-semibold">Statically Generated pages</h1>
      <p>Each link was prerendered at build time:</p>
      <ul className="list-disc list-inside">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link className="text-blue-600 underline" href={`/ssg/${slug}`}>
              /ssg/{slug}
            </Link>
          </li>
        ))}
      </ul>
      <p className="opacity-50 text-xs">
        Visiting /ssg/anything-else returns 404 (the page calls notFound() for
        slugs outside generateStaticParams).
      </p>
    </div>
  );
}
