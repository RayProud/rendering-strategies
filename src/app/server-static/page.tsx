// static — the
// server side

export default function Test() {
  console.log("Server Side Static page");
  return (
    <div>
      <h1>
        Hello Again{" "}
        <time
          dateTime={new Date().toLocaleTimeString()}
          suppressHydrationWarning
        >
          {new Date().toLocaleTimeString()}
        </time>
      </h1>
    </div>
  );
}
