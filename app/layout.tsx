import type { Metadata } from 'next';
import './globals.css';
import AuthGuard from './components/AuthGuard';

export const metadata: Metadata = {
  title: 'Invent Berry',
  description: 'Sistema moderno de controle de estoque e movimentações',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#09090b] text-white antialiased">
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
