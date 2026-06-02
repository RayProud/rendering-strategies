import DynamicServerComponent from '@/app/dynamic-server-component';

// =============================================================================
// "STATIC PAGE THAT TURNS DYNAMIC"  (ƒ Dynamic)
// =============================================================================
// This page's own code reads nothing request-specific — yet it's ƒ, not ○. Why?
//
// Because it renders <DynamicServerComponent/>, which awaits cookies().
// Dynamic-ness propagates UPWARD: to produce a parent's HTML, React must render
// its children, so a single request-dependent descendant flips the ENTIRE route
// to dynamic. The dynamic API is nowhere in this file, but the route is ƒ.
//
// Proof: the heading clock below now ticks per request, even though "nothing
// here" is dynamic — the whole route re-renders because of the child.
//
// (In the PPR app, wrapping that child in <Suspense> contains the blast radius
// so the shell stays static and only the child streams. See apps/ppr.)

export default function ServerStaticTurnedDynamic() {
  console.log('Static Server page Turned Dynamic (runs per REQUEST)');
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        I was meant to be static —{' '}
        <time suppressHydrationWarning>{new Date().toLocaleTimeString()}</time>
        <DynamicServerComponent />
      </h1>
    </div>
  );
}
