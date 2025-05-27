import { UserButton } from '@clerk/nextjs'
import { SignedOut } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import ThemeWrapper from './ThemeWrapper'

function Navbar() {
    return (

        <nav className="navbar navbar-expand-lg bg-body border-bottom px-3">
            <div className="container-fluid">

                <Link className="navbar-brand fw-bold" href="/">NotionKlonu</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* Giriş yapan kullanıcıya özel linkler */}
                    <SignedIn>
                        <li className="nav-item">
                            <Link className="nav-link" href="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/pages">Sayfalar</Link>
                        </li>
                    </SignedIn>
                </ul>

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
        </div>
        </nav >
    )
}

export default Navbar