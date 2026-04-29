'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
    organization: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Story', href: '/about#our-story' },
        { label: "Founder's Journey", href: '/about#founder-journey' },
        { label: 'Core Values', href: '/about#core-values' },
    ],
    programs: [
        { label: 'All Programs', href: '/programs' },
        { label: 'Scholarships', href: '/programs/scholarship-program' },
        { label: 'Athletic Training', href: '/programs/training-equipment' },
        { label: 'Mentorship', href: '/programs/mentorship-program' },
    ],
    community: [
        { label: 'Success Stories', href: '/stories' },
        { label: 'Latest News', href: '/news' },
        { label: 'Contact Us', href: '/contact' },
    ],
}

const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        ),
    },
    {
        name: 'X (Twitter)',
        href: '#',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: '#',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
        ),
    },
    {
        name: 'YouTube',
        href: 'https://youtu.be/YDRpCPtXuFA',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
        ),
    },
]

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-gray-950 text-white overflow-hidden">

            {/* ── Layer 1: Radial dot pattern ── */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
            </div>

            {/* ── Layer 2: Diagonal line overlay ── */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_1px,transparent_0,transparent_50%)] bg-[size:16px_16px]"></div>
            </div>

            {/* ── Layer 3: Ambient glow orbs ── */}
            <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-brand-green/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-brand-red/8 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            {/* ── Top gradient bar ── */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-green via-brand-red to-brand-green"></div>

            {/* ── Main content ── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

                    {/* Brand column — spans 2 cols */}
                    <div className="lg:col-span-2 space-y-7">
                        <Link href="/" className="inline-block transition-all duration-300 hover:opacity-80 hover:scale-[1.02]">
                            <Image
                                src="/images/logo1.png"
                                alt="Landson Foundation"
                                width={180}
                                height={60}
                                className="brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-base leading-relaxed max-w-xs">
                            Empowering Kenya's youth through the powerful synergy of world-class athletics and quality education.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/8 text-gray-400 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-red/20"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Contact snippets */}
                        <div className="space-y-3 pt-1">
                            <a href="mailto:info@landsonfoundation.org" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group">
                                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                info@landsonfoundation.org
                            </a>
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3.5 h-3.5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                Nandi County, Kenya
                            </div>
                        </div>
                    </div>

                    {/* Organization links */}
                    <div className="space-y-6">
                        <h3 className="font-heading font-black text-xs uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                            <span className="w-4 h-px bg-brand-red inline-block"></span>
                            Organization
                        </h3>
                        <ul className="space-y-3.5">
                            {footerLinks.organization.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-brand-red transition-all duration-300 flex-shrink-0"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs links */}
                    <div className="space-y-6">
                        <h3 className="font-heading font-black text-xs uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                            <span className="w-4 h-px bg-brand-red inline-block"></span>
                            Programs
                        </h3>
                        <ul className="space-y-3.5">
                            {footerLinks.programs.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-brand-red transition-all duration-300 flex-shrink-0"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community links */}
                    <div className="space-y-6">
                        <h3 className="font-heading font-black text-xs uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                            <span className="w-4 h-px bg-brand-red inline-block"></span>
                            Community
                        </h3>
                        <ul className="space-y-3.5">
                            {footerLinks.community.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-brand-red transition-all duration-300 flex-shrink-0"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="border-t border-white/10 py-7 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                    <p>© {currentYear} <span className="text-white font-semibold">Landson Foundation</span>. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-brand-green transition-colors font-medium">Privacy Policy</Link>
                        <span className="w-px h-3 bg-white/20"></span>
                        <Link href="/terms" className="hover:text-brand-red transition-colors font-medium">Terms of Service</Link>
                    </div>
                    <p>Crafted with Passion by <a href="https://ascendstratus.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-green transition-colors font-bold underline decoration-brand-green/30 underline-offset-4">Ascend Stratus</a></p>
                </div>
            </div>
        </footer>
    )
}
