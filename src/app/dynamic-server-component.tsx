import { cookies } from 'next/headers';

export default function DynamicServerComponent() {
  const cookieStore = cookies();
  if (cookieStore) {
    console.log('Server Side Static page');
  }
  return (
    <div>
      <h1>This is where you can check how prefetching and RSC files works</h1>
      <p>
        <time
          dateTime={new Date().toLocaleTimeString()}
          suppressHydrationWarning
        >
          {new Date().toLocaleTimeString()}
        </time>
      </p>
    </div>
  );
}
