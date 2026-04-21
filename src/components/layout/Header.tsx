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

    const toggleDropdown = (label: string, e: React.MouseEvent) => {
        e.preventDefault()
        setActiveDropdown(activeDropdown === label ? null : label)
    }

    return (
        <header className={cn(
            'fixed top-0 left-0 right-0 z-[1020] transition-all duration-300 py-4',
            scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3' : 'bg-transparent'
        )}>
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
                    <ul className="flex items-center space-x-8">
                        {navItems.map((item) => (
                            <li key={item.label} className="relative group">
                                {item.children ? (
                                    <>
                                        <button
                                            className={cn(
                                                'font-heading font-bold text-sm uppercase tracking-wider transition-colors px-4 py-2 rounded-full flex items-center gap-1 hover:bg-brand-red-soft hover:text-brand-red',
                                                isActive(item.href) ? 'text-brand-red bg-brand-red-soft' : scrolled ? 'text-gray-900' : 'text-white',
                                            )}
                                        >
                                            {item.label}
                                            <svg className={cn("w-4 h-4 transition-transform duration-300 group-hover:rotate-180", isActive(item.href) ? "text-brand-red" : scrolled ? "text-gray-500" : "text-white/70")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <ul className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl py-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 border border-gray-100">
                                            {item.children.map((child) => (
                                                <li key={child.href}>
                                                    <Link 
                                                        href={child.href} 
                                                        className="block px-6 py-2 text-sm text-gray-700 hover:bg-brand-red-soft hover:text-brand-red transition-colors"
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
                                            'font-heading font-bold text-sm uppercase tracking-wider transition-all px-4 py-2 rounded-full relative overflow-hidden group/item',
                                            isActive(item.href) 
                                                ? 'text-brand-red bg-brand-red-soft' 
                                                : scrolled 
                                                    ? 'text-gray-900 hover:text-brand-red' 
                                                    : 'text-white hover:text-white',
                                        )}
                                    >
                                        <span className="relative z-10">{item.label}</span>
                                        {!isActive(item.href) && (
                                            <span className={cn(
                                                "absolute inset-0 transition-transform duration-300 -translate-x-full group-hover/item:translate-x-0 -z-0",
                                                scrolled ? "bg-brand-red-soft" : "bg-white/10"
                                            )}></span>
                                        )}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={cn(
                        'lg:hidden relative z-[1030] flex flex-col gap-1.5 p-2 transition-colors',
                        scrolled || mobileMenuOpen ? 'text-gray-900' : 'text-white'
                    )}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={cn('block w-6 h-0.5 bg-current transition-all', mobileMenuOpen && 'rotate-45 translate-y-2')}></span>
                    <span className={cn('block w-6 h-0.5 bg-current transition-all', mobileMenuOpen && 'opacity-0')}></span>
                    <span className={cn('block w-6 h-0.5 bg-current transition-all', mobileMenuOpen && '-rotate-45 -translate-y-2')}></span>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={cn(
                'fixed inset-0 bg-white z-[1025] flex flex-col justify-center items-center transition-all duration-500',
                mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            )}>
                <ul className="flex flex-col items-center space-y-8">
                    {navItems.map((item) => (
                        <li key={item.label} className="text-center w-full">
                            {item.children ? (
                                <div className="flex flex-col items-center">
                                    <button 
                                        onClick={(e) => toggleDropdown(item.label, e)}
                                        className={cn(
                                            'font-heading font-extrabold text-3xl uppercase tracking-tighter transition-colors flex items-center',
                                            isActive(item.href) ? 'text-brand-red' : 'text-gray-900'
                                        )}
                                    >
                                        {item.label}
                                        <svg className={cn('ml-3 w-6 h-6 transition-transform duration-300', activeDropdown === item.label && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <ul className={cn(
                                        'overflow-hidden transition-all duration-300 space-y-4 pt-4',
                                        activeDropdown === item.label ? 'max-h-60' : 'max-h-0'
                                    )}>
                                        {item.children.map(child => (
                                            <li key={child.href}>
                                                <Link 
                                                    href={child.href} 
                                                    className="text-xl font-bold text-gray-600 hover:text-brand-red"
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
                                        'font-heading font-extrabold text-3xl uppercase tracking-tighter transition-colors',
                                        isActive(item.href) ? 'text-brand-red' : 'text-gray-900'
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}
