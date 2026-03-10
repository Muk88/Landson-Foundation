'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import styles from './TrioCarousel.module.css'

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

const TrioCarousel = React.memo(function TrioCarousel({ cards }: TrioCarouselProps) {
    const router = useRouter()

    const handleCardClick = React.useCallback((link: string) => {
        router.push(link)
    }, [router])

    // Always show all cards in grid (no carousel on any screen size)
    return (
        <div className={styles.desktopGrid}>
            {cards.map((card, index) => (
                <div key={index} className={styles.cardWrapper}>
                    <Card
                        description={card.description}
                        label={card.label}
                        imageSrc={card.image}
                        imageAlt={card.title}
                        onClick={() => handleCardClick(card.link)}
                        forceShowOverlay={false}
                    />
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
            ))}
        </div>
    )
})

export default TrioCarousel
