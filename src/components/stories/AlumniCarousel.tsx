'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@/lib/icons'

interface Alumni {
    id: string
    name: string
    current_role?: string
    quote: string
    image_url?: string
    linkedin_url?: string
}

export default function AlumniCarousel({ alumni }: { alumni: Alumni[] }) {
    const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null)
    const [isHovered, setIsHovered] = useState(false)
    const carouselRef = useRef<HTMLDivElement>(null)

    // We duplicate the alumni array a few times to ensure we have enough items 
    // to fill a wide screen and create a seamless infinite scrolling effect.
    const duplicatedAlumni = [...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni]

    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return

        let animationFrameId: number

        const scroll = () => {
            // Only scroll if not hovered and modal is not open
            if (!isHovered && !selectedAlumni) {
                if (carousel) {
                    carousel.scrollLeft += 1 // Adjust speed here
                    
                    // If we've scrolled past the first set of items, reset seamlessly
                    // Since we have many copies, resetting halfway is safe.
                    if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                        carousel.scrollLeft = 0
                    }
                }
            }
            animationFrameId = requestAnimationFrame(scroll)
        }

        animationFrameId = requestAnimationFrame(scroll)

        return () => cancelAnimationFrame(animationFrameId)
    }, [isHovered, selectedAlumni])

    useEffect(() => {
        if (selectedAlumni) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedAlumni])

    if (!alumni || alumni.length === 0) return null

    return (
        <div className="relative w-full">
            {/* Carousel Track */}
            <div 
                ref={carouselRef}
                className="flex gap-8 overflow-x-auto hide-scrollbar py-8 px-6 lg:px-[10%]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
                style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch' }}
            >
                {duplicatedAlumni.map((person, index) => (
                    <div 
                        key={`${person.id}-${index}`} 
                        className="relative flex-shrink-0 w-[280px] sm:w-[320px] aspect-[4/5] rounded-[2rem] overflow-hidden group shadow-2xl bg-brand-green-dark cursor-pointer transform transition-transform duration-500 hover:-translate-y-2"
                        onClick={() => setSelectedAlumni(person)}
                    >
                        {/* Image */}
                        {person.image_url ? (
                            <Image 
                                src={person.image_url} 
                                alt={person.name} 
                                fill 
                                className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110" 
                                sizes="(max-width: 640px) 280px, 320px"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-brand-green-dark/50 flex items-center justify-center">
                                <Icon name="user" className="w-20 h-20 text-white/20" />
                            </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                {/* Name in stark white */}
                                <h3 className="font-heading font-black text-white text-3xl leading-tight mb-2 drop-shadow-md">
                                    {person.name}
                                </h3>
                                {person.current_role && (
                                    <p className="text-brand-red font-bold text-xs tracking-widest uppercase drop-shadow-md">
                                        {person.current_role}
                                    </p>
                                )}
                            </div>
                            
                            {/* Hover reveal statement */}
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                                <div className="overflow-hidden">
                                    <p className="pt-4 font-body text-white/90 italic text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-3">
                                        "{person.quote}"
                                    </p>
                                    <div className="pt-4 flex items-center justify-between">
                                        <span className="text-brand-green font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
                                            Read Full Story
                                            <svg className="w-4 h-4 text-brand-red transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LinkedIn Icon (Top Right) */}
                        {person.linkedin_url && (
                            <a 
                                href={person.linkedin_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md p-2.5 rounded-full hover:bg-[#0A66C2] hover:scale-110 transition-all duration-300"
                                onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking LinkedIn
                            >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* Hidden scrollbar styles */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Modal Pop-up */}
            {selectedAlumni && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setSelectedAlumni(null)}>
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
                    
                    <div 
                        className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col transform transition-all scale-100 opacity-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Pop-up Fixed Close Button */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAlumni(null);
                            }}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[60] bg-black/30 hover:bg-brand-red text-white p-2 rounded-full transition-colors backdrop-blur-md shadow-sm"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Scrollable Content Wrapper */}
                        <div className="flex flex-col md:flex-row overflow-y-auto w-full max-h-[90vh] rounded-[2rem]">
                            {/* Modal Image */}
                            <div className="w-full md:w-2/5 aspect-square md:aspect-auto md:min-h-[400px] relative bg-brand-green-dark flex-shrink-0">
                            {selectedAlumni.image_url ? (
                                <Image 
                                    src={selectedAlumni.image_url} 
                                    alt={selectedAlumni.name} 
                                    fill 
                                    className="object-cover object-[center_20%]" 
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Icon name="user" className="w-24 h-24 text-white/20" />
                                </div>
                            )}
                        </div>

                        {/* Modal Content */}
                        <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center space-y-6 bg-white">
                            <div>
                                <h2 className="font-heading font-black text-ink text-3xl md:text-4xl leading-tight mb-2">
                                    {selectedAlumni.name}
                                </h2>
                                {selectedAlumni.current_role && (
                                    <p className="text-brand-red font-bold text-sm tracking-widest uppercase">
                                        {selectedAlumni.current_role}
                                    </p>
                                )}
                            </div>

                            <div className="w-12 h-1 bg-brand-green/20 rounded-full" />

                            <div className="prose prose-lg text-gray-700 font-body leading-relaxed max-w-none">
                                <p className="italic font-medium">"{selectedAlumni.quote}"</p>
                            </div>

                            {selectedAlumni.linkedin_url && (
                                <div className="pt-4 mt-auto">
                                    <a 
                                        href={selectedAlumni.linkedin_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-[#0A66C2] text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-[#004182] transition-colors shadow-lg shadow-[#0A66C2]/20"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                        Connect on LinkedIn
                                    </a>
                                </div>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
