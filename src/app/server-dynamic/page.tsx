import { cookies } from 'next/headers';
// import ServerComponent from '../server-component';

export const runtime = 'edge';

// dynamic
// client side
// RSC uses the data from the first prerender on the server (client routing will show the server time)
// it's being updated once a minute

export default function ServerDynamic() {
  const cookieStore = cookies();

  // what makes a route dynamic?
  // use of
  //  cookies()
  //  headers()
  //  searchParams
  // Will the children routes become dynamic routes too?
  if (cookieStore) {
    console.log('\nServer Side Dynamic page');
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
          {/*<ServerComponent />*/}
        </time>
      </p>
    </div>
  );
}
