"use client";
import dynamic from 'next/dynamic';

// Disable static generation for this page
export const dynamicGeneration = 'force-dynamic';

// Dynamically import components that use Supabase to avoid SSR issues
const GamePage = dynamic(() => import('./GamePageClient'), {
  loading: () => (
    <div className="min-h-screen hockey-bg flex items-center justify-center">
      <div className="text-primary-blue text-2xl font-mono animate-pulse">
        🏒 CARGANDO JUEGO... 🏒
      </div>
    </div>
  ),
  ssr: false
});

export default GamePage;
