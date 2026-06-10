import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mapa de Calor Delictivo — Bucaramanga',
  description: 'Visualización interactiva de la criminalidad en Bucaramanga por comunas. Datos abiertos de la Alcaldía de Bucaramanga.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
