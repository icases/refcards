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
  {/* Fonts are now loaded globally in pages/_document.js */}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
