import "./globals.css";

export const metadata = {
  title: "RefCards - Señales de Árbitro de Hockey",
  description: "Aprende las señales del árbitro de hockey sobre patines en un juego de preguntas",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RefCards"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1976d2"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1976d2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RefCards" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800;900&family=Exo+2:wght@400;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
