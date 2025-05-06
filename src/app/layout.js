import './globals.css'
import Header from './components/Header/Header'

export const metadata = {
  title: 'Skillora - Online Course Finder',
  description: 'Find the best online courses',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}