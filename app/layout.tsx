import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Glow Beauty — Premium Skincare & Cosmetics',
  description: 'Discover luxury beauty rituals crafted for your radiance. Premium skincare, cosmetics, and wellness essentials.',
  openGraph: {
    title: 'Glow Beauty',
    description: 'Discover luxury beauty rituals crafted for your radiance.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-mesh-light antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
