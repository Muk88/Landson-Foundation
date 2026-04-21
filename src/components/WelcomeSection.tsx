import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from './ui/Button'

export default function WelcomeSection() {
    return (
        <section className="bg-white py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-16 md:gap-24">
                    {/* Our Story */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-red-soft rounded-full -z-10 animate-pulse"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                <Image
                                    src="/images/story-side.jpg"
                                    alt="Our Story"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110 contrast-[1.05]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-brand-green p-8 rounded-2xl shadow-xl hidden md:block">
                                <p className="text-white font-heading font-black text-4xl leading-none">100+</p>
                                <p className="text-white/80 text-sm font-bold uppercase tracking-widest mt-2">Lives Impacted</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="inline-block px-4 py-1.5 bg-brand-red-soft text-brand-red font-bold text-xs uppercase tracking-[0.2em] rounded-full">
                                Who We Are
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 leading-[1.1]">
                                Empowering <span className="text-brand-red">Kenya's</span> Future Champions
                            </h2>
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                Founded in the heart of Kenya's legendary highlands, the Landson Foundation was born from a simple yet powerful belief: every talented athlete deserves the opportunity to pursue both their sporting dreams and academic excellence.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-brand-green pl-6">
                                "We bridge the gap between athletic potential and educational opportunity, creating a legacy that transcends the track."
                            </p>
                            <div className="pt-4">
                                <Link href="/about">
                                    <Button variant="primary" size="lg">Learn Our Full Story</Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Our Key Focus */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-1.5 bg-brand-green-soft text-brand-green font-bold text-xs uppercase tracking-[0.2em] rounded-full">
                                What We Do
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 leading-[1.1]">
                                Excellence Through <span className="text-brand-green text-shadow-glow">Education</span>
                            </h2>
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                We provide a holistic support system that includes scholarship programs, elite athletic training, and lifelong mentorship. This comprehensive approach ensures our athletes are prepared for success in any field they choose.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {[
                                    { icon: '🎓', label: 'Full Scholarships' },
                                    { icon: '🏃', label: 'Elite Training' },
                                    { icon: '🤝', label: 'Mentorship' },
                                    { icon: '🌍', label: 'Global Exposure' }
                                ].map((item) => (
                                    <li key={item.label} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:bg-white hover:border-brand-green hover:shadow-md">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="font-bold text-gray-800">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <Link href="/programs">
                                    <Button variant="secondary" size="lg">Explore Programs</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-brand-green rotate-3 rounded-3xl transition-transform group-hover:rotate-0 duration-500"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-white">
                                <Image
                                    src="/images/future.jpg"
                                    alt="Our Focus"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110 contrast-[1.1]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
