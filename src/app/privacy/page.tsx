import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
    title: 'Privacy Policy | Landson Foundation',
    description: 'Learn how Landson Foundation collects, uses, and protects your personal information.',
}

const sections = [
    {
        title: '1. Information We Collect',
        content: [
            'When you interact with the Landson Foundation website, we may collect the following types of information:',
            '**Contact Information:** Name, email address, phone number, and any other details you provide when filling out our contact or inquiry forms.',
            '**Usage Data:** Information about how you use our website, including pages visited, time spent on pages, browser type, and IP address — collected automatically via cookies and analytics tools.',
            '**Donation Information:** If you make a financial contribution, we collect the transaction details necessary to process your donation securely. We do not store full payment card details on our servers.',
        ],
    },
    {
        title: '2. How We Use Your Information',
        content: [
            'Landson Foundation uses the information collected for the following purposes:',
            '• To respond to your inquiries and provide requested information about our programs.',
            '• To process donations and issue receipts or acknowledgements.',
            '• To send you updates, newsletters, and impact reports — only if you have opted in.',
            '• To improve our website experience and understand how visitors engage with our content.',
            '• To comply with legal obligations and protect the rights of the Foundation.',
        ],
    },
    {
        title: '3. Information Sharing',
        content: [
            'We do not sell, trade, or rent your personal information to any third parties.',
            'We may share data with trusted service providers (such as payment processors or email platforms) solely to operate our programs — these partners are bound by confidentiality agreements.',
            'We may disclose information if required by law or to protect the safety and integrity of the Foundation and its beneficiaries.',
        ],
    },
    {
        title: '4. Cookies & Tracking',
        content: [
            'Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how our site is used.',
            'You can control cookie settings through your browser preferences. Disabling cookies may limit certain features of the website.',
            'We use analytics tools (such as Google Analytics) to collect aggregated, anonymised usage data. This data does not personally identify you.',
        ],
    },
    {
        title: '5. Data Security',
        content: [
            'We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorised access, disclosure, alteration, or destruction.',
            'However, no method of data transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.',
        ],
    },
    {
        title: '6. Data Retention',
        content: [
            'We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law.',
            'You may request deletion of your personal data at any time by contacting us at info@landsonfoundation.org.',
        ],
    },
    {
        title: '7. Your Rights',
        content: [
            'Depending on your jurisdiction, you may have the following rights regarding your personal data:',
            '• The right to access the information we hold about you.',
            '• The right to request correction of inaccurate data.',
            '• The right to request deletion of your data.',
            '• The right to withdraw consent for marketing communications at any time.',
            'To exercise any of these rights, please contact us at info@landsonfoundation.org.',
        ],
    },
    {
        title: '8. Third-Party Links',
        content: [
            'Our website may contain links to external websites such as social media platforms or partner organisations. We are not responsible for the privacy practices of those sites and encourage you to review their policies independently.',
        ],
    },
    {
        title: '9. Children\'s Privacy',
        content: [
            'Although Landson Foundation serves young athletes, our website is not directed at children under the age of 13. We do not knowingly collect personal information from children without parental consent.',
            'If you believe we have inadvertently collected such information, please contact us immediately.',
        ],
    },
    {
        title: '10. Changes to This Policy',
        content: [
            'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated version will be posted on this page with a revised effective date.',
            'We encourage you to review this page periodically to stay informed.',
        ],
    },
    {
        title: '11. Contact Us',
        content: [
            'If you have any questions or concerns about this Privacy Policy, please reach out to us:',
            '📧 info@landsonfoundation.org',
            '📍 Nandi County, Kenya',
        ],
    },
]

export default function PrivacyPage() {
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
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="container-custom relative z-10 text-center space-y-5">
                        <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-white/60 font-bold text-xs uppercase tracking-widest">
                            Legal
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-tight">
                            Privacy <span className="text-brand-red">Policy</span>
                        </h1>
                        <p className="text-gray-400 font-medium text-base max-w-xl mx-auto">
                            Your privacy matters to us. This policy explains how Landson Foundation handles your personal information.
                        </p>
                        <p className="text-gray-500 text-sm">Effective Date: January 2026</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto">
                            {/* Intro */}
                            <div className="mb-12 p-8 bg-brand-green/5 border border-brand-green/10 rounded-3xl">
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    Landson Foundation ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy describes our practices regarding the collection, use, and disclosure of information when you visit our website at <span className="font-bold text-brand-green">landsonfoundation.org</span>.
                                </p>
                            </div>

                            {/* Sections */}
                            <div className="space-y-12">
                                {sections.map((section) => (
                                    <div key={section.title} className="space-y-4">
                                        <h2 className="text-xl font-heading font-black text-gray-900 tracking-tight flex items-center gap-3">
                                            <span className="w-1 h-6 bg-brand-red rounded-full flex-shrink-0"></span>
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
                                <Link href="/terms" className="text-brand-green font-bold text-sm hover:text-brand-red transition-colors flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                    </svg>
                                    Read Terms of Service
                                </Link>
                                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-brand-green-dark transition-all duration-300 hover:-translate-y-0.5">
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
