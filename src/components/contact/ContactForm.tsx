'use client'

import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import { submitContactForm } from '@/app/actions/contact'

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 5000)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setToast(null) // clear previous toast

        // Prepare FormData for Server Action
        const data = new FormData()
        data.append('firstName', formData.firstName)
        data.append('lastName', formData.lastName)
        data.append('email', formData.email)
        data.append('message', formData.message)

        const result = await submitContactForm(data)

        if (result?.error) {
            showToast(result.error, 'error')
        } else if (result?.success) {
            showToast('Message sent successfully! We will get back to you soon.', 'success')
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: ''
            })
        }

        setIsLoading(false)
    }

    return (
        <div className="bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            {/* Custom Toast Notification */}
            {toast && (
                <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 transition-all animate-fade-in-up ${toast.type === 'success' ? 'bg-brand-green text-white' : 'bg-brand-red text-white'}`}>
                    {toast.type === 'success' ? (
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    <span className="font-bold text-sm tracking-wide">{toast.message}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">First Name</label>
                        <input 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full bg-white border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium text-gray-900 shadow-sm disabled:opacity-60" 
                            placeholder="John" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Last Name</label>
                        <input 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full bg-white border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium text-gray-900 shadow-sm disabled:opacity-60" 
                            placeholder="Doe" 
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Email Address</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className="w-full bg-white border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium text-gray-900 shadow-sm disabled:opacity-60" 
                        placeholder="john@example.com" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 px-1">Message</label>
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        rows={5} 
                        className="w-full bg-white border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all font-medium text-gray-900 shadow-sm resize-none disabled:opacity-60" 
                        placeholder="Tell us how we can help..."
                    ></textarea>
                </div>

                <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth 
                    size="lg" 
                    disabled={isLoading}
                    className="py-5 shadow-2xl shadow-brand-red/30 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </Button>
            </form>
        </div>
    )
}
