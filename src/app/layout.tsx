import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartSidebar from "@/components/CartSidebar";
import SearchModal from "@/components/SearchModal";
import AuthModal from "@/components/AuthModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R Style",
  description: "A futuristic e-commerce experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
            <CartSidebar />
            <SearchModal />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
