import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MultiMessengerWidget from "@/components/shared/MultiMessengerWidget";
import LenisProvider from "@/components/shared/LenisProvider";
import StructuredData from "@/components/shared/StructuredData";

// Fill these in when domain is connected
const GTM_ID = "";      // e.g. "GTM-XXXXXXX"
const CLARITY_ID = "";  // e.g. "abcde12345"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vendita Auto Usate Napoli — Noleggio, Officina, Lavaggio | Auto Per Tutti",
  description:
    "Ricerca auto nuove e usate a Napoli. Finanziamento rapido, permuta valutata, garanzia 12 mesi. Tre sedi a Napoli, Agnano, Carrara.",
  keywords: "auto usate napoli, noleggio auto napoli, officina napoli, autolavaggio napoli, autopertutti, finanziamento auto, permuta",
  openGraph: {
    title: "Vendita Auto Usate Napoli — Noleggio, Officina, Lavaggio | Auto Per Tutti",
    description: "Ricerca auto nuove e usate a Napoli. Finanziamento rapido, permuta valutata, garanzia 12 mesi. Tre sedi a Napoli, Agnano, Carrara.",
    url: "https://www.autopertutti.net",
    siteName: "Auto Per Tutti",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#1A1A1A]">
        <LenisProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MultiMessengerWidget />
        </LenisProvider>

        {/* Google Tag Manager — attivare con dominio reale */}
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}</Script>
        )}

        {/* Microsoft Clarity — attivare con dominio reale */}
        {CLARITY_ID && (
          <Script id="clarity" strategy="afterInteractive">{`
            (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${CLARITY_ID}");
          `}</Script>
        )}
      </body>
    </html>
  );
}
