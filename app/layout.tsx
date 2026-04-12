import "./globals.css"

export const metadata = {
  title: "Portfolio de Nhat VO",
  description: "Développeur web passionné par React et Next.js",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}