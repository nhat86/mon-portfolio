import { Inter, Poppins } from 'next/font/google'
import "./globals.css"
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
// Configurer Inter pour le texte courant
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Configurer Poppins pour les titres
const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})


export const metadata = {
  title: "Portfolio de Nhat VO",
  description: "Développeur web passionné par React et Next.js",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}