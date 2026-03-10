'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Button from '../ui/Button'
import styles from './Header.module.css'

const navItems = [
    { label: 'Home', href: '/' },
    {
        label: 'About',
        href: '/about',
        children: [
            { label: 'Our Story', href: '/about#our-story' },
            { label: 'Founder\'s Journey', href: '/about#founder-journey' },
            { label: 'Core Values', href: '/about#core-values' },
        ]
    },
    { label: 'Programs', href: '/programs' },
    { label: 'Stories', href: '/stories' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const pathname = usePathname() || '/'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // ... existing useEffect ...

    // Helper to check active state
    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    useEffect(() => {
        setMobileMenuOpen(false)
        setActiveDropdown(null)
    }, [pathname])

    // Handle mobile dropdown toggle
    const toggleDropdown = (label: string, e: React.MouseEvent) => {
        e.preventDefault()
        setActiveDropdown(activeDropdown === label ? null : label)
    }

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image src="/images/logo1.png" alt="Landson Foundation" width={150} height={50} priority />
                </Link>

                <nav className={styles.nav}>
                    <ul className={styles.navLinks}>
                        {navItems.map((item) => (
                            <li key={item.label} className={item.children ? styles.hasDropdown : ''}>
                                {item.children ? (
                                    <>
                                        <Link
                                            href={item.href}
                                            className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                                        >
                                            {item.label}
                                            <span className={styles.dropdownArrow}>▼</span>
                                        </Link>
                                        <ul className={styles.dropdownMenu}>
                                            {item.children.map((child) => (
                                                <li key={child.href}>
                                                    <Link href={child.href} className={styles.dropdownItem}>
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        prefetch={true}
                                        className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.donateButton}>
                        <Link href="/donate" prefetch={true}>
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
                        <li key={item.label}>
                            {item.children ? (
                                <div className={styles.mobileDropdownWrapper}>
                                    <div className={styles.mobileDropdownHeader} onClick={(e) => toggleDropdown(item.label, e)}>
                                        <span className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.active : ''}`}>
                                            {item.label}
                                        </span>
                                        <span className={`${styles.mobileArrow} ${activeDropdown === item.label ? styles.rotate : ''}`}>▼</span>
                                    </div>
                                    <ul className={`${styles.mobileDropdownMenu} ${activeDropdown === item.label ? styles.show : ''}`}>
                                        {item.children.map(child => (
                                            <li key={child.href}>
                                                <Link href={child.href} className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <Link href={item.href} prefetch={true} className={styles.mobileNavLink}>
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
                <div className={styles.mobileDonateButton}>
                    <Link href="/donate" prefetch={true}>
                        <Button fullWidth>Donate</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
