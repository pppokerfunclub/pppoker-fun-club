import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "PPPOKER FUN CLUB - Фан-клуб любителей покера",
  description:
    "Наш клуб объединяет людей, которые просто любят покер. Это лёгкая, дружеская среда, где ценится сам процесс и энергия игры.",
  keywords: "покер, клуб, игра, карты, фан-клуб, PPPOKER",
  authors: [{ name: "PPPOKER FUN CLUB" }],
  creator: "PPPOKER FUN CLUB",
  publisher: "PPPOKER FUN CLUB",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = "width=device-width, initial-scale=1.0";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${interTight.variable} antialiased h-full`}>
        {children}
      </body>
    </html>
  );
}
