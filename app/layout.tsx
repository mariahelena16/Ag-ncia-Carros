import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "Veiculos - Agência de Carros",
  description: "Gerenciamento de veiculos e clientes da agência de carros",
};

export default function RootLayout({ children }: LayoutProps <"/"> ){
  return (
    <html
      lang="en"    >
      <body className="min-h-full flex flex-col">
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
