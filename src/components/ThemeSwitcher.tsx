'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }, [theme])
    
    return (
        <div className="d-flex justify-content-end p-2">
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
        </div>
    )
}