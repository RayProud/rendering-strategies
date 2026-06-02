import type { Metadata } from 'next';
import localFont from 'next/font/local';
// Dev-only RSC boundary overlay (zero-cost pass-through in production). In
// `next dev` it outlines client components (orange) vs server regions (blue).
import { RscBoundaryProvider } from '@rsc-boundary/next';
import ThemeProvider from './theme-provider';
import './globals.css';
import Links from '@/app/links';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Rendering — classic (no PPR)',
  description: 'Static / dynamic / SSG with cacheComponents OFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The layout is a static Server Component, rendered once at build and reused
  // for every route. The clock below uses `new Date()` directly: in a static
  // render that simply bakes the BUILD time into the HTML (it never ticks).
  // Without cacheComponents this is allowed — `new Date()` doesn't make a route
  // dynamic, it just runs whenever the component runs (here: at build).
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RscBoundaryProvider>
          <div className="flex flex-col flex-wrap justify-center items-center p-4">
            <p className="text-xs opacity-60">
              classic app — cacheComponents OFF
            </p>
            <time suppressHydrationWarning>
              built at {new Date().toLocaleTimeString()}
            </time>

            <h1 className="mt-2 text-pretty text-3xl font-semibold tracking-tight mb-3">
              Rendering strategies — the classic model
            </h1>

            <Links />

            <ThemeProvider>{children}</ThemeProvider>
          </div>
        </RscBoundaryProvider>
      </body>
    </html>
  );
}
