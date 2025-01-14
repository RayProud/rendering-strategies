import DynamicServerComponent from '@/app/dynamic-server-component';

export const runtime = 'edge';

export default function ServerStaticTurnedDynamic() {
  console.log('\nStatic Server Side Turned Dynamic page');
  return (
    <div>
      <h1>
        I was meant to be a static server page, but am being build at request
        time{' '}
        <time
          dateTime={new Date().toLocaleTimeString()}
          suppressHydrationWarning
        >
          {new Date().toLocaleTimeString()}
          <DynamicServerComponent />
        </time>
      </h1>
    </div>
  );
}
