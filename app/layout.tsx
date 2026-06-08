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
      <body className={`${inter.className} bg-dark-base antialiased`}>
        <Providers>
          {/* Animated Blobs Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Blob 1: top-right, 600px, animation 10s */}
            <div
              className="blob top-0 right-0 w-[600px] h-[600px]"
              style={{
                background: 'radial-gradient(circle, rgba(232, 0, 77, 0.13) 0%, transparent 70%)',
                animation: 'blob 10s ease-in-out infinite',
              }}
            />
            {/* Blob 2: bottom-left, 400px, animation 14s reverse */}
            <div
              className="blob bottom-0 left-0 w-[400px] h-[400px]"
              style={{
                background: 'radial-gradient(circle, rgba(244, 167, 195, 0.13) 0%, transparent 70%)',
                animation: 'blob 14s ease-in-out infinite reverse',
              }}
            />
            {/* Blob 3: center, 500px, animation 16s */}
            <div
              className="blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
              style={{
                background: 'radial-gradient(circle, rgba(244, 167, 195, 0.08) 0%, transparent 70%)',
                animation: 'blob 16s ease-in-out infinite',
              }}
            />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
