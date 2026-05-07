import './globals.css'

export const metadata = {
  title: 'Skillora - Find Your Perfect Course',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}