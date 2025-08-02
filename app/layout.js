import { Header } from "@/app/_components";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "@/app/_features/reservation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: { template: "%s / Wildhaven", default: "Welcome / Wildhaven" },
  description:
    "Luxury hotel in the heart of the Italian Alps and the Dolomites. Experience the best of Italian hospitality and cuisine. Wildhaven is a 5-star hotel located in the heart of the Italian Alps and the Dolomites. It is a perfect place for a romantic getaway, a family vacation, or a business trip. The hotel is located in the heart of the Italian Alps and the Dolomites. It is a perfect place for a romantic getaway, a family vacation, or a business trip.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header />
        <div className="grid flex-1 px-8 py-12">
          <ReservationProvider>
            <main className="mx-auto w-full max-w-7xl">
              {children}
              <SpeedInsights />
            </main>
          </ReservationProvider>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
