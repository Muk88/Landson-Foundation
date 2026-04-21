'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
    organization: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Story', href: '/about#our-story' },
        { label: 'Founder\'s Journey', href: '/about#founder-journey' },
        { label: 'Core Values', href: '/about#core-values' },
    ],
    programs: [
        { label: 'All Programs', href: '/programs' },
        { label: 'Scholarships', href: '/programs/scholarships' },
        { label: 'Athletic Training', href: '/programs/athletic-training' },
        { label: 'Mentorship', href: '/programs/mentorship' },
    ],
    community: [
        { label: 'Success Stories', href: '/stories' },
        { label: 'Latest News', href: '/news' },
        { label: 'Contact Us', href: '/contact' },
    ]
}

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-950 text-white pt-24 pb-12 relative overflow-hidden">
            {/* Top brand line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-green via-brand-red to-brand-green"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <Image 
                                src="/images/logo1.png" 
                                alt="Landson Foundation" 
                                width={180} 
                                height={60} 
                                className="brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                            Empowering Kenya's youth through the powerful synergy of world-class athletics and quality education.
                        </p>
                        <div className="flex space-x-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a 
                                    key={social} 
                                    href="#" 
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 text-gray-400 hover:bg-brand-red hover:text-white transition-all duration-300"
                                >
                                    <span className="sr-only">{social}</span>
                                    {/* Simplified icon placeholders */}
                                    <div className="w-5 h-5 bg-current opacity-70"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links - Organization */}
                    <div>
                        <h3 className="font-heading font-extrabold text-sm uppercase tracking-widest mb-8 text-white/50">Organization</h3>
                        <ul className="space-y-4">
                            {footerLinks.organization.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-brand-red mr-0 group-hover:mr-2 transition-all"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links - Programs */}
                    <div>
                        <h3 className="font-heading font-extrabold text-sm uppercase tracking-widest mb-8 text-white/50">Programs</h3>
                        <ul className="space-y-4">
                            {footerLinks.programs.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-brand-red mr-0 group-hover:mr-2 transition-all"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-heading font-extrabold text-sm uppercase tracking-widest mb-8 text-white/50">Get in Touch</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="text-brand-red flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400">Nandi County, Kenya</span>
                            </li>
                            <li className="flex gap-4">
                                <div className="text-brand-red flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <a href="mailto:info@landsonfoundation.org" className="text-gray-400 hover:text-white transition-colors">info@landsonfoundation.org</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
                    <p>© {currentYear} Landson Foundation. All rights reserved.</p>
                    <div className="flex space-x-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                    <p>Crafted with Passion by <a href="https://anue.tech" className="text-white hover:text-brand-red transition-colors">Anue Tech</a></p>
                </div>
            </div>
        </footer>
    )
}
