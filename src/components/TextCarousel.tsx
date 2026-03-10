'use client'

import React, { useState, useEffect } from 'react'
import styles from './TextCarousel.module.css'

const words = ['The Talent', 'The Education', 'The Future']

const TextCarousel = React.memo(function TextCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        }, 3000) // Change word every 3 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.carouselContainer}>
            {words.map((word, index) => (
                <div
                    key={word}
                    className={`${styles.carouselText} ${index === currentIndex ? styles.active : ''
                        }`}
                >
                    {word}
                </div>
            ))}
        </div>
    )
})

export default TextCarousel
