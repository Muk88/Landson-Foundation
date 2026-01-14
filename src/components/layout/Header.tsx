'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Button from '../ui/Button'
import styles from './Header.module.css'

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Stories', href: '/stories' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image src="/images/logo1.png" alt="Landson Foundation" width={150} height={50} priority />
                </Link>

                <nav className={styles.nav}>
                    <ul className={styles.navLinks}>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${pathname === item.href ? styles.active : ''
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.donateButton}>
                        <Link href="/donate">
                            <Button size="small">Donate</Button>
                        </Link>
                    </div>
                </nav>

                <button
                    className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.open : ''
                        }`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.open : ''}`}>
                <ul className={styles.mobileNavLinks}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={styles.mobileNavLink}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className={styles.mobileDonateButton}>
                    <Link href="/donate">
                        <Button fullWidth>Donate</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
