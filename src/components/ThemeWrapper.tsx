'use client'

import ThemeSwitcher from './ThemeSwitcher'
import Navbar from './Navbar'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-vh-100 d-flex flex-column localbody text-body p-4">
            <ThemeSwitcher />
            <div className="card p-3">
                {children}
            </div>
        </div>
    )
}
