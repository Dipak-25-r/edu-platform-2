import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'EduPlatform - Master Science & Math',
  description: 'Free tools, notes, and AI-powered learning for Class 11-12 Science students',
  keywords: 'science, mathematics, education, class 11, class 12, CBSE, physics, chemistry',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
