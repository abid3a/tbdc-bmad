import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Horizon Web Platform",
  description: "The Horizon Web Platform for managing sessions, meetings, and connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ErrorBoundary>
          <AuthProvider>
            <Layout>
              {children}
            </Layout>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
