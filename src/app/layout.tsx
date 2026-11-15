import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "E-commerce and inventory management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
