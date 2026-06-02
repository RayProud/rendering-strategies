// =============================================================================
// SERVER-SIDE STATIC  (○ Static)
// =============================================================================
// A Server Component that reads nothing request-specific → Next prerenders it
// once at build time and serves identical HTML to everyone. No JS ships for it.
//
// The clock proves it: `new Date()` runs when this component renders, and for a
// static page that's at BUILD time, so the value is frozen. Reload forever — it
// never changes. (`new Date()` does NOT make a route dynamic; only reading
// cookies/headers/searchParams does.)

export default function ServerStatic() {
  console.log('Server Side Static page (runs at BUILD time)');
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Server Side Static</h1>
      <p>
        Frozen at build:{' '}
        <time suppressHydrationWarning>{new Date().toLocaleTimeString()}</time>
      </p>
    </div>
  );
}
