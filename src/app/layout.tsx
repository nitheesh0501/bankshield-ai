import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BankShield AI — Stop the Scam Before the Money Moves',
  description: 'Enterprise edge-based cognitive duress circuit-breaker & family safety escrow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Display / serif: P22 Mackinac W01 Book */}
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/9d4d074c9335825a23cce178ee03b498?family=P22+Mackinac+W01+Book"
        />
        {/* UI / sans: Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
