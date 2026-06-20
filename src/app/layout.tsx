import type { Metadata } from "next";
import { Luckiest_Guy, Baloo_2 } from "next/font/google";
import "./globals.css";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest",
  weight: "400",
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slice — The Pizza",
  description: "Wood fired, hand tossed. Fresh out the oven since 1997.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${luckiestGuy.variable} ${baloo2.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
