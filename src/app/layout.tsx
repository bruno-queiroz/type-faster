import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "../../lib/ReactQueryProvider";
import { NextAuthProvider } from "../../lib/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TypeFaster",
  description: "Increase your typing speed with TypeFaster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <Header />
            {children}
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
