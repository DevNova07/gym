import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { AudioToggle } from '@/components/ui/AudioToggle';
import { Loader } from '@/components/ui/Loader';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ChatbotWidget } from '@/components/ui/ChatbotWidget';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Elevate Fitness | Transform Your Body',
  description: 'Elite fitness platform engineered for peak performance. Join the world\'s most premium fitness experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased dark`} suppressHydrationWarning>
      <body className="bg-[#030303] text-white font-sans min-h-screen flex flex-col selection:bg-purple-500/30">
        <Loader />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
          <ChatbotWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
