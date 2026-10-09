import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';

// Dynamic import with SSR disabled for maximum client-side WebGL performance
const SpaceBackground = dynamic(() => import('@/components/SpaceBackground'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'SponsErp | Cosmic Hyper-Local Sponsorship Intelligence',
  description: 'Cinematic B2B hyper-local sponsorship intelligence platform for event organizers powered by real-time Google Maps and cosmic WebGL motion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-purple-500/30 selection:text-cyan-200">
        <ThemeProvider>
          <AuthProvider>
            {/* Non-blocking 3D Cosmic Space Particles Canvas */}
            <SpaceBackground />
            
            {/* Foreground Content Container */}
            <div className="relative z-10 min-h-screen flex flex-col">
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
