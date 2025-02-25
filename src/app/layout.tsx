import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CartProvider } from "./[slug]/menu/context/Cart";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Menu Digital - FSW Donalds",
  description: "Compre seu lanche diretamente do nosso menu digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <CartProvider>
        {children}
        </CartProvider>

        <Toaster />
      </body>
    </html>
  );
}
