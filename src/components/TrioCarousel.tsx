'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TrioCard {
    title: string
    description: string
    label: string
    image: string
    link: string
}

interface TrioCarouselProps {
    cards: TrioCard[]
}

export default function TrioCarousel({ cards }: TrioCarouselProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {cards.map((card, index) => (
                <Link 
                    key={card.title} 
                    href={card.link}
                    className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 hover:border-brand-red/20"
                >
                    <div className="relative h-[300px] overflow-hidden">
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 contrast-[1.1]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                        <div className="absolute bottom-6 left-8">
                            <span className="px-4 py-2 bg-brand-red text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg shadow-xl drop-shadow-md">
                                {card.label}
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-10 flex-grow flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-heading font-black text-gray-900 group-hover:text-brand-red transition-colors leading-tight">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {card.description}
                            </p>
                        </div>
                        
                        <div className="pt-4 flex items-center gap-3 text-brand-green font-bold text-sm uppercase tracking-widest group-hover:gap-5 transition-all">
                            Learn More
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
