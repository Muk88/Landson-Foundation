'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navItems = [
    { label: 'Home', href: '/' },
    {
        label: 'About',
        href: '/about',
        children: [
            { label: 'Our Story', href: '/about#our-story' },
            { label: "Founder's Journey", href: '/about#founder-journey' },
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
        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20)
                    ticking = false
                })
                ticking = true
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    useEffect(() => {
        setMobileMenuOpen(false)
        setActiveDropdown(null)
    }, [pathname])

    // Close mobile menu on scroll
    useEffect(() => {
        if (!mobileMenuOpen) return
        const handleScrollClose = () => {
            if (window.scrollY > 50) {
                setMobileMenuOpen(false)
                setActiveDropdown(null)
            }
        }
        window.addEventListener('scroll', handleScrollClose, { passive: true })
        return () => window.removeEventListener('scroll', handleScrollClose)
    }, [mobileMenuOpen])

    const toggleDropdown = (label: string, e: React.MouseEvent) => {
        e.preventDefault()
        setActiveDropdown(activeDropdown === label ? null : label)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-[1020] bg-white border-b border-gray-100 shadow-sm py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link href="/" className="relative z-[1030] flex items-center">
                    <Image
                        src="/images/logo1.png"
                        alt="Landson Foundation"
                        width={140}
                        height={46}
                        className="transition-transform duration-300 hover:scale-105"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center">
                    <ul className="flex items-center space-x-2">
                        {navItems.map((item) => (
                            <li key={item.label} className="relative group">
                                {item.children ? (
                                    <>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'font-bold text-[11px] uppercase tracking-[0.18em] transition-colors px-4 py-2 rounded-full flex items-center gap-1 hover:bg-brand-red-soft hover:text-brand-red',
                                                isActive(item.href) ? 'text-brand-red bg-brand-red-soft' : 'text-gray-900',
                                            )}
                                            style={{ fontFamily: '"Montreal Sans", sans-serif' }}
                                        >
                                            {item.label}
                                            <svg className={cn("w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180", isActive(item.href) ? "text-brand-red" : "text-gray-500")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </Link>
                                        <ul className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl py-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 border border-gray-100">
                                            {item.children.map((child) => (
                                                <li key={child.href}>
                                                    <Link
                                                        href={child.href}
                                                        className="block px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-brand-red-soft hover:text-brand-red transition-colors"
                                                        style={{ fontFamily: '"Montreal Sans", sans-serif' }}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'font-bold text-[11px] uppercase tracking-[0.18em] transition-all duration-200 px-4 py-2 rounded-full',
                                            isActive(item.href)
                                                ? 'text-brand-red bg-brand-red-soft'
                                                : 'text-gray-900 hover:text-brand-red hover:bg-brand-red-soft',
                                        )}
                                        style={{ fontFamily: '"Montreal Sans", sans-serif' }}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden relative z-[1030] flex flex-col gap-1.5 p-2 text-gray-900"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={cn('block w-6 h-0.5 bg-current transition-all duration-300', mobileMenuOpen && 'rotate-45 translate-y-2')}></span>
                    <span className={cn('block w-6 h-0.5 bg-current transition-all duration-300', mobileMenuOpen && 'opacity-0')}></span>
                    <span className={cn('block w-6 h-0.5 bg-current transition-all duration-300', mobileMenuOpen && '-rotate-45 -translate-y-2')}></span>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={cn(
                'fixed inset-0 bg-brand-green z-[1025] flex flex-col transition-all duration-500 ease-in-out',
                mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            )}>
                {/* Radial dot pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
                </div>

                {/* Gradient glow accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="flex-1 flex flex-col justify-center px-8 relative z-10 pt-20">
                    <ul className="flex flex-col space-y-6">
                        {navItems.map((item, idx) => (
                            <li
                                key={item.label}
                                className="w-full"
                                style={{
                                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                                    opacity: mobileMenuOpen ? 1 : 0,
                                    transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + idx * 0.05}s`
                                }}
                            >
                                {item.children ? (
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between w-full">
                                            <Link
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={cn(
                                                    'font-black text-xl uppercase tracking-[0.08em] transition-colors',
                                                    isActive(item.href) ? 'text-brand-red' : 'text-white hover:text-brand-red/80'
                                                )}
                                                style={{ fontFamily: '"Montreal Sans", sans-serif' }}
                                            >
                                                {item.label}
                                            </Link>
                                            <button
                                                onClick={(e) => toggleDropdown(item.label, e)}
                                                className="p-2 text-white hover:text-brand-red transition-colors"
                                                aria-label="Toggle dropdown"
                                            >
                                                <svg className={cn('w-6 h-6 transition-transform duration-300', activeDropdown === item.label && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                        <ul className={cn(
                                            'overflow-hidden transition-all duration-300 space-y-3 border-l-2 border-white/10',
                                            activeDropdown === item.label ? 'max-h-60 opacity-100 mt-3 pl-4' : 'max-h-0 opacity-0 pl-4'
                                        )}>
                                            {item.children.map(child => (
                                                <li key={child.href}>
                                                    <Link
                                                        href={child.href}
                                                        className="text-base font-semibold text-white/70 hover:text-brand-red block py-1 transition-colors"
                                                        style={{ fontFamily: '"Montreal Sans", sans-serif' }}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'block font-black text-xl uppercase tracking-[0.08em] transition-colors',
                                            isActive(item.href) ? 'text-brand-red' : 'text-white hover:text-brand-red'
                                        )}
                                        style={{ fontFamily: '"Montreal Sans", sans-serif' }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom Quick Actions */}
                <div
                    className="p-8 relative z-10 border-t border-white/10 mt-auto"
                    style={{
                        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                        opacity: mobileMenuOpen ? 1 : 0,
                        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.4s`
                    }}
                >
                    <p className="font-display text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                        <span className="w-4 h-px bg-brand-red inline-block"></span>
                        Connect with us
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="mailto:info@landsonfoundation.org" className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-brand-red hover:border-brand-red transition-all duration-300 flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <Link href="/contact" className="flex-1 h-12 flex items-center justify-center bg-brand-red text-white font-display font-black text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-black/20" onClick={() => setMobileMenuOpen(false)}>
                            Support the Mission
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
