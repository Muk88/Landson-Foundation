'use client'

import React, { useState, useEffect } from 'react'

const words = ['The Talent', 'The Education', 'The Future']

const TextCarousel = React.memo(function TextCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-16 relative overflow-hidden flex items-center justify-center lg:justify-start">
            {words.map((word, index) => (
                <div
                    key={word}
                    className={`absolute inset-0 flex items-center justify-center lg:justify-start transition-all duration-700 ease-in-out font-heading font-black text-3xl md:text-4xl uppercase tracking-widest ${
                        index === currentIndex 
                        ? 'opacity-100 translate-y-0 text-brand-red' 
                        : 'opacity-0 -translate-y-8 text-white'
                    }`}
                >
                    {word}
                </div>
            ))}
        </div>
    )
})

export default TextCarousel
