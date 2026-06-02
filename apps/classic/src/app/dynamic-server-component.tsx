import { cookies } from 'next/headers';

// A reusable async Server Component that reads request-time data. The single
// `await cookies()` below is "infectious": any route that renders this component
// inherits a dynamic dependency and becomes ƒ. See server-static-turned-dynamic.

export default async function DynamicServerComponent() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? '(none)';
  console.log('DynamicServerComponent — reads cookies() at request time');
  return (
    <span>
      {' '}
      [dynamic child read cookie <code>theme={theme}</code>]
    </span>
  );
}
