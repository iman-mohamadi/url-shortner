import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import './globals.css';

// Initialize Rethink Sans for that premium editorial geometry
const rethink = Rethink_Sans({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Raya | Refine The Web',
  description: 'High-speed, analytics-driven link management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${rethink.variable} font-sans min-h-screen flex flex-col bg-[#020617] text-white selection:bg-white/20 selection:text-white`}>
        {/* Lenis Smooth Scrolling wrapper */}
        <SmoothScrollProvider>
          <Navbar />
          {/* FIX: Removed z-10 here. The page content components will now handle their own layering. */}
          <main className="flex-grow relative">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}