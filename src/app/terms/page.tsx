import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
    title: 'Terms of Service | Landson Foundation',
    description: 'Read the Terms of Service governing your use of the Landson Foundation website and services.',
}

const sections = [
    {
        title: '1. Acceptance of Terms',
        content: [
            'By accessing and using the Landson Foundation website (landsonfoundation.org), you agree to be bound by these Terms of Service and all applicable laws and regulations.',
            'If you do not agree with any part of these terms, please discontinue your use of the website immediately.',
            'These Terms apply to all visitors, users, donors, and anyone else who accesses or uses the site.',
        ],
    },
    {
        title: '2. About Landson Foundation',
        content: [
            'Landson Foundation is a non-profit organisation based in Nandi County, Kenya, dedicated to empowering youth through the integration of world-class athletics and quality education.',
            'Content on this website is intended to inform the public about our mission, programs, and impact — and to facilitate donations and inquiries in support of our work.',
        ],
    },
    {
        title: '3. Use of the Website',
        content: [
            'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. Specifically, you may not:',
            '• Use the site to transmit any unlawful, harmful, or offensive material.',
            '• Attempt to gain unauthorised access to any part of the site or its systems.',
            '• Impersonate Landson Foundation, its staff, or any other individual or entity.',
            '• Use automated tools (bots, scrapers, crawlers) to extract content without prior written consent.',
            '• Engage in any activity that disrupts or interferes with the normal operation of the website.',
        ],
    },
    {
        title: '4. Intellectual Property',
        content: [
            'All content on this website — including but not limited to text, images, videos, logos, graphics, and program descriptions — is the property of Landson Foundation and is protected by applicable intellectual property laws.',
            'You may share or reference our content for non-commercial, educational, or journalistic purposes provided you give proper attribution and a link back to the original page.',
            'Reproduction of content for commercial purposes without written consent from Landson Foundation is strictly prohibited.',
        ],
    },
    {
        title: '5. Donations',
        content: [
            'Donations made through our website are voluntary contributions to support the mission of Landson Foundation.',
            'All donations are processed securely. We do not store complete payment card information on our servers.',
            'Donations are generally non-refundable. If you believe an error has occurred with your transaction, please contact us promptly at info@landsonfoundation.org.',
            'Landson Foundation will use donations in accordance with its stated mission and programs. Restricted gifts will be honoured as designated.',
        ],
    },
    {
        title: '6. Third-Party Links',
        content: [
            'Our website may contain links to external websites, social media platforms, or partner organisations. These links are provided for your convenience.',
            'Landson Foundation does not control or endorse external sites and accepts no responsibility for their content, privacy practices, or accuracy.',
            'Visiting external links is at your own discretion and risk.',
        ],
    },
    {
        title: '7. Disclaimer of Warranties',
        content: [
            'The Landson Foundation website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied.',
            'We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
            'We make no guarantees about the accuracy, completeness, or timeliness of any content published on the site.',
        ],
    },
    {
        title: '8. Limitation of Liability',
        content: [
            'To the fullest extent permitted by law, Landson Foundation shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website.',
            'This includes, without limitation, any loss of data, business interruption, or financial loss resulting from reliance on information provided on this site.',
        ],
    },
    {
        title: '9. Privacy',
        content: [
            'Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.',
            'Please review our Privacy Policy to understand our data collection and usage practices.',
        ],
    },
    {
        title: '10. Modifications to Terms',
        content: [
            'Landson Foundation reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website.',
            'Your continued use of the website after changes are posted constitutes your acceptance of the updated terms.',
            'We recommend reviewing this page periodically.',
        ],
    },
    {
        title: '11. Governing Law',
        content: [
            'These Terms of Service are governed by and construed in accordance with the laws of the Republic of Kenya.',
            'Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in Kenya.',
        ],
    },
    {
        title: '12. Contact Us',
        content: [
            'If you have any questions about these Terms of Service, please contact us:',
            '📧 info@landsonfoundation.org',
            '📍 Nandi County, Kenya',
        ],
    },
]

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero */}
                <section className="relative bg-gray-950 overflow-hidden pt-32 pb-20">
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-green via-brand-red to-brand-green"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/8 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="container-custom relative z-10 text-center space-y-5">
                        <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-white/60 font-bold text-xs uppercase tracking-widest">
                            Legal
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-tight">
                            Terms of <span className="text-brand-red">Service</span>
                        </h1>
                        <p className="text-gray-400 font-medium text-base max-w-xl mx-auto">
                            Please read these terms carefully before using the Landson Foundation website or engaging with our services.
                        </p>
                        <p className="text-gray-500 text-sm">Effective Date: January 2026</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto">
                            {/* Intro */}
                            <div className="mb-12 p-8 bg-brand-red/5 border border-brand-red/10 rounded-3xl">
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    These Terms of Service ("Terms") govern your access to and use of the Landson Foundation website and any related services. By using our site, you confirm that you have read, understood, and agreed to these Terms.
                                </p>
                            </div>

                            {/* Sections */}
                            <div className="space-y-12">
                                {sections.map((section) => (
                                    <div key={section.title} className="space-y-4">
                                        <h2 className="text-xl font-heading font-black text-gray-900 tracking-tight flex items-center gap-3">
                                            <span className="w-1 h-6 bg-brand-green rounded-full flex-shrink-0"></span>
                                            {section.title}
                                        </h2>
                                        <div className="space-y-3 pl-4">
                                            {section.content.map((para, idx) => (
                                                <p key={idx} className="text-gray-600 leading-relaxed text-base">
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer CTA */}
                            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-6 justify-between">
                                <Link href="/privacy" className="text-brand-green font-bold text-sm hover:text-brand-red transition-colors flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Read Privacy Policy
                                </Link>
                                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-red-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-red/20">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
