import type { Metadata } from "next";
import localFont from "next/font/local";
// import ThemeProvider from "./theme-provider";
import "./globals.css";
// import StateComponent from "./state-component-client-wrapper";
import Links from "./links";

// <ThemeProvider>
//   <StateComponent />
//   {children}
// </ThemeProvider>

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Layout - meant to be Static (?) Server");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <time
          dateTime={new Date().toLocaleTimeString()}
          suppressHydrationWarning
        >
          {new Date().toLocaleTimeString()}
        </time>
        <Links />
        {children}
      </body>
    </html>
  );
}
