import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";
import ClientModals from "@/components/ClientModals";
import StyledComponentsRegistry from "@/lib/registry";

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
    <html lang="en" suppressHydrationWarning style={{ scrollBehavior: 'smooth', backgroundColor: '#000000' }} data-scroll-behavior="smooth">
      <body className={inter.className} suppressHydrationWarning style={{ backgroundColor: '#000000' }}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <UIProvider>
              <CartProvider>
                {children}
                <ClientModals />
              </CartProvider>
            </UIProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
