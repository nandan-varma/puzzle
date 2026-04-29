import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Puzzle Game',
  description: 'A collection of brain games',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <nav>
            <Link href="/" style={{ marginRight: '1rem' }}>
              Home
            </Link>
          </nav>
        </header>
        <main style={{ padding: '2rem' }}>{children}</main>
        <footer
          style={{
            padding: '1rem',
            borderTop: '1px solid #ccc',
            marginTop: '2rem',
          }}
        >
          <p>Puzzle Game Collection</p>
        </footer>
      </body>
    </html>
  );
}
