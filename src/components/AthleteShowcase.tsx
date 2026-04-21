import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './ui/Button'

const athletes = [
    {
        image: '/images/athlete 2.jpg',
        name: 'Track & Field',
        tagline: 'Born to run. Built to succeed.',
        stat: '100+',
        statLabel: 'Athletes Supported',
    },
    {
        image: '/images/athletes 1.jpg',
        name: 'Long Distance',
        tagline: 'Nandi\'s finest. Kenya\'s pride.',
        stat: '40+',
        statLabel: 'Scholarships Awarded',
    },
    {
        image: '/images/athlete 3.jpg',
        name: 'Cross Country',
        tagline: 'From the highlands to the world.',
        stat: '15+',
        statLabel: 'International Athletes',
    },
    {
        image: '/images/runner.jpg',
        name: 'Elite Training',
        tagline: 'Excellence is our standard.',
        stat: '7+',
        statLabel: 'Years of Impact',
    },
]

export default function AthleteShowcase() {
    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-6">
                    <span className="inline-block px-4 py-1.5 bg-brand-red-soft text-brand-red font-bold text-xs uppercase tracking-[0.2em] rounded-full">
                        Our Athletes
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 leading-tight">
                        Our Athletes. <span className="text-brand-red italic">Our Pride.</span>
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                        Every runner carries the dreams of Nandi County. We ensure those dreams reach the world stage through unwavering support and world-class training.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {athletes.map((athlete, index) => (
                        <div key={index} className="group relative h-[500px] rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                            <Image
                                src={athlete.image}
                                alt={athlete.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.1]"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                            
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                <span className="font-heading font-black text-2xl uppercase tracking-tighter mb-2">{athlete.name}</span>
                                <p className="text-white/80 text-sm font-medium mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {athlete.tagline}
                                </p>
                                <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                                    <div>
                                        <span className="block text-3xl font-black text-brand-red leading-none">{athlete.stat}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{athlete.statLabel}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-red transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/programs">
                        <Button variant="primary" size="lg" className="min-w-[240px]">View Our Programs</Button>
                    </Link>
                    <Link href="/stories">
                        <Button variant="outline" size="lg" className="min-w-[240px]">Read Their Stories</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
