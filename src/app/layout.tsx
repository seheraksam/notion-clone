import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main className="min-vh-100 bg-body text-body">
              {children}
            </main>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  )
}
