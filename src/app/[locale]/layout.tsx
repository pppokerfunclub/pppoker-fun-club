import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import "./globals.css";
import { redirect, routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

async function fetchMessages(locale: string): Promise<AbstractIntlMessages> {
  const messages = await getMessages({ locale });
  if (!messages) {
    throw new Error(`Messages for locale '${locale}' not found.`);
  }
  return messages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await fetchMessages(locale || "ru")) as Record<
    string,
    Record<string, string>
  >;

  const baseUrl = "https://by.studio";

  return {
    icons: {
      icon: "/favicon-96x96.png",
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: messages.meta.keywords,
    applicationName: messages.meta.app_name,
    alternates: {
      canonical: baseUrl,
      languages: {
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
        uk: `${baseUrl}/uk`,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: baseUrl,
      locale: locale,
      alternateLocale: ["ru", "en", "uk"].filter((l) => l !== locale),
      type: "website",
      images: [
        {
          url: `${baseUrl}/assets/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: messages.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: [`${baseUrl}/assets/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-site-verification",
    },
  };
}

export const viewport = "width=device-width, initial-scale=1.0";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    redirect({ href: "/", locale: "ru" });
  }

  const messages = await fetchMessages(locale);

  return (
    <html lang={locale} className="h-full">
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1534419064597467');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1534419064597467&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${interTight.variable} antialiased h-full`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
