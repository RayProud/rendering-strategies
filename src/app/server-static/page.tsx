// static — the
// server side

export const runtime = 'nodejs';

export default function Server() {
  console.log('Server Side Static page');
  return (
    <div>
      <h1>
        Server Side Static page{' '}
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
