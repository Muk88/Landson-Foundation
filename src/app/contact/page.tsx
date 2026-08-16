import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { createClient } from '@supabase/supabase-js'
import ContactForm from '@/components/contact/ContactForm'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: contactInfo } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single()

    return (
        <div className="flex flex-col min-h-screen"><main className="flex-grow pt-24 lg:pt-32">
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
                                        {contactInfo?.address && (
                                            <div className="flex items-start gap-6 group">
                                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-heading font-black text-lg uppercase tracking-tight text-gray-900">Location</h3>
                                                    <p className="text-gray-600 font-medium whitespace-pre-wrap">{contactInfo.address}</p>
                                                </div>
                                            </div>
                                        )}

                                        {contactInfo?.email && (
                                            <div className="flex items-start gap-6 group">
                                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-heading font-black text-lg uppercase tracking-tight text-gray-900">Email</h3>
                                                    <a href={`mailto:${contactInfo.email}`} className="text-gray-600 font-medium hover:text-brand-red transition-colors">{contactInfo.email}</a>
                                                </div>
                                            </div>
                                        )}

                                        {contactInfo?.phone && (
                                            <div className="flex items-start gap-6 group">
                                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-heading font-black text-lg uppercase tracking-tight text-gray-900">Phone</h3>
                                                    <a href={`tel:${contactInfo.phone}`} className="text-gray-600 font-medium hover:text-brand-red transition-colors">{contactInfo.phone}</a>
                                                </div>
                                            </div>
                                        )}

                                        {/* Social Links */}
                                        {(contactInfo?.facebook_url || contactInfo?.twitter_url || contactInfo?.instagram_url) && (
                                            <div className="flex items-start gap-6 group pt-2">
                                                <div className="flex gap-4">
                                                    {contactInfo.facebook_url && (
                                                        <a href={contactInfo.facebook_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 shadow-sm">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                                        </a>
                                                    )}
                                                    {contactInfo.twitter_url && (
                                                        <a href={contactInfo.twitter_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 shadow-sm">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                                        </a>
                                                    )}
                                                    {contactInfo.instagram_url && (
                                                        <a href={contactInfo.instagram_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 shadow-sm">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Google Map */}
                                    <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-video bg-gray-100 border border-gray-100">
                                        <iframe 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7144646864963!2d35.07311827496471!3d0.41340629958254355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178051a24501cdb9%3A0x1f78eceaba2a09fb!2sLandson%20Foundation!5e0!3m2!1sen!2ske!4v1786748077943!5m2!1sen!2ske" 
                                            className="absolute inset-0 w-full h-full" 
                                            style={{ border: 0 }} 
                                            allowFullScreen 
                                            loading="lazy" 
                                            referrerPolicy="strict-origin-when-cross-origin"
                                        ></iframe>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>
            </main></div>
    )
}

