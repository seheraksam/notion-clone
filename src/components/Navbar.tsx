"use client"
import { UserButton } from '@clerk/nextjs'
import { SignedOut } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import Link from 'next/link'

function Navbar() {
    const { theme, toggleTheme } = useTheme()
    return (
        <nav className="navbar navbar-expand-lg bg-body border-bottom px-3" >
            <Link href={'/'} > <div className='navbar-brand fw-bold'>
                Notion</div></Link>
            <div className="container-fluid justify-content-end p-1">
                <button
                    className="navbar-toggler m-auto p-4"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="d-flex align-items-center gap-3 p-1">
                    <button className="btn m-auto" onClick={toggleTheme}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <SignedOut>
                        <SignInButton>
                            <button className="btn btn-outline-primary">Giriş Yap</button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </div>
        </nav >
    )
}

export default Navbar