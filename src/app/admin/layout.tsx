'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { getAdminPath, isAdminLoginPath } from '@/lib/admin-path'
import styles from './layout.module.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const adminPath = getAdminPath()

    useEffect(() => {
        const checkAuth = async () => {
            // Check if user is authenticated with Supabase
            const { data: { session } } = await supabase.auth.getSession()

            if (!session && !isAdminLoginPath(pathname)) {
                // Clear any stale local storage
                localStorage.removeItem('admin_session')
                router.push(`${adminPath}/login`)
            } else {
                setLoading(false)
            }
        }

        checkAuth()
    }, [pathname, router, adminPath])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        localStorage.removeItem('admin_session')
        router.push(`${adminPath}/login`)
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
            </div>
        )
    }

    // Don't show sidebar on login page
    if (isAdminLoginPath(pathname)) {
        return <>{children}</>
    }

    const navItems = [
        { label: 'Dashboard', href: adminPath, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { label: 'Impact Metrics', href: `${adminPath}/metrics`, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { label: 'News', href: `${adminPath}/news`, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { label: 'Programs', href: `${adminPath}/programs`, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { label: 'Success Stories', href: `${adminPath}/stories`, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { label: 'Messages', href: `${adminPath}/messages`, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { label: 'Contact Info', href: `${adminPath}/settings`, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ]

    return (
        <div className={styles.layout}>
            {/* Mobile Header */}
            <div className={styles.mobileHeader}>
                <div style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--color-red)' }}>LANDSON ADMIN</div>
                <button
                    className={styles.menuButton}
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Overlay */}
            <div
                className={`${styles.overlay} ${isSidebarOpen ? styles.open : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles.logo}>
                    <span>LANDSON</span>
                    <span style={{ fontWeight: 400, fontSize: '0.8em', color: '#666', marginLeft: 'auto' }}>ADMIN</span>
                </div>

                <nav className={styles.navWrapper}>
                    <ul className={styles.nav}>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.logoutButton}>
                    <Button variant="outline" fullWidth onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </aside>

            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}
