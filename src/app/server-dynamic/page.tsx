import { cookies } from "next/headers";
import ServerComponent from "../server-component";

// dynamic
// client side
// RSC uses the data from the first prerender on the server (client routing will show the server time)
// it's being updated once a minute

export default function Nav({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  console.log("Server Side Dynamic page", theme);
  // what makes a route dynamic?
  // use of
  //  cookies()
  //  headers()
  //  searchParams
  // Will the children routes become dynamic routes too?
  console.log({ searchParams });
  return (
    <div>
      <h1>This is where you can check how prefetching and RSC files works</h1>
      <p>
        <time
          dateTime={new Date().toLocaleTimeString()}
          suppressHydrationWarning
        >
          {new Date().toLocaleTimeString()}
          <ServerComponent />
        </time>
      </p>
    </div>
  );
}
