import "./globals.css"
import Navigation from "@/components/Navigation/Navigation";
export const metadata = {
  title: "Portfolio de Nhat VO",
  description: "Développeur web passionné par React et Next.js",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}