import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Sidebar from '@/components/SideBar'
import { Toaster } from "react-hot-toast";
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
    <html lang="en">
        <head>
          <Script src="https://unpkg.com/trix@2.0.8/dist/trix.umd.min.js" strategy="beforeInteractive" />
        </head>
      <body>
        <ThemeProvider>
        <Navbar/>
          <div className="d-flex">
            <Sidebar />
            <main className="flex-grow-1 p-4 localbody text-body">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
  )
}
