import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Sidebar from '@/components/SideBar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <ThemeProvider>
        <Navbar/>
          <div className="d-flex">
            <Sidebar />
            <main className="flex-grow-1 p-4 bg-body text-body">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
  )
}
