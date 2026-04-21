import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-24 lg:pt-32">
                <section className="py-20 md:py-32 bg-white">
                    <div className="container-custom">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                {/* Contact Info */}
                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <span className="inline-block px-4 py-1.5 bg-brand-red-soft text-brand-red font-black text-xs uppercase tracking-[0.2em] rounded-full">
                                            Contact Us
                                        </span>
                                        <h1 className="text-5xl md:text-6xl font-heading font-black text-gray-900 tracking-tighter leading-none">
                                            Get in <br />
                                            <span className="text-brand-green italic">Touch.</span>
                                        </h1>
                                        <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md">
                                            Have questions about our programs or want to support our mission? We'd love to hear from you.
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-6 group">
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-gray-900">Location</h3>
                                                <p className="text-gray-600 font-medium">Nandi County, Kenya</p>
                                                <p className="text-gray-400 text-sm italic mt-1">Source of Champions</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-6 group">
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-gray-900">Email</h3>
                                                <a href="mailto:info@landsonfoundation.org" className="text-gray-600 font-medium hover:text-brand-red transition-colors">info@landsonfoundation.org</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Map Preview Placeholder */}
                                    <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-video bg-gray-100 border border-gray-100">
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                            Map Location Preview
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div className="bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    
                                    <form className="space-y-8 relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">First Name</label>
                                                <input type="text" className="w-full bg-white border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Last Name</label>
                                                <input type="text" className="w-full bg-white border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="Doe" />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Email Address</label>
                                            <input type="email" className="w-full bg-white border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium text-gray-900 shadow-sm" placeholder="john@example.com" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Message</label>
                                            <textarea rows={5} className="w-full bg-white border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium text-gray-900 shadow-sm resize-none" placeholder="Tell us how we can help..."></textarea>
                                        </div>

                                        <Button variant="primary" fullWidth size="lg" className="py-5 shadow-2xl shadow-brand-red/30">Send Message</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
