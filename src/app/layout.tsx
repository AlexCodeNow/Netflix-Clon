import './globals.css'
import Header from '../components/layout/Header'

export const metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix clone built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-netflix-black text-white">
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}