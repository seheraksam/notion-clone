'use client'

import { useEffect, useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import Navbar from './Navbar'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-vh-100 d-flex flex-column bg-body text-body p-4">
            <ThemeSwitcher />
            <div className="card p-3">
                <h1 className="text-primary">Bootstrap Tema Testi</h1>
                {children}
            </div>
        </div>

    )
}
