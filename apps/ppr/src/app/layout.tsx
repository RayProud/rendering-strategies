import type { Metadata } from 'next';
import localFont from 'next/font/local';
// Dev-only RSC boundary overlay (zero-cost pass-through in production).
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
  title: 'Rendering — PPR (Cache Components)',
  description: 'Partial Prerendering with cacheComponents ON',
};

// Captured at MODULE LOAD = build time. Under cacheComponents you cannot call
// `new Date()` during a static render (the current time is request-time data and
// throws); reading it once at module scope is the "frozen at build" value.
const BUILT_AT = new Date().toISOString();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RscBoundaryProvider>
          <div className="flex flex-col flex-wrap justify-center items-center p-4">
            <p className="text-xs opacity-60">ppr app — cacheComponents ON</p>
            <time dateTime={BUILT_AT}>{BUILT_AT} (build time)</time>

            <h1 className="mt-2 text-pretty text-3xl font-semibold tracking-tight mb-3">
              Partial Prerendering & Cache Components
            </h1>

            <Links />

            <ThemeProvider>{children}</ThemeProvider>
          </div>
        </RscBoundaryProvider>
      </body>
    </html>
  );
}
