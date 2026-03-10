import React from 'react'
import Image from 'next/image'
import styles from './Card.module.css'

interface CardProps {
    title?: string
    description?: string
    imageSrc?: string
    imageAlt?: string
    label?: string
    onClick?: () => void
    className?: string
    glass?: boolean
    children?: React.ReactNode
    forceShowOverlay?: boolean
}

const Card = React.memo(function Card({
    title,
    description,
    imageSrc,
    imageAlt = '',
    label,
    onClick,
    className = '',
    glass = false,
    children,
    forceShowOverlay = false,
}: CardProps) {
    const cardClasses = [
        styles.card,
        glass && styles.glass,
        forceShowOverlay && styles.forceOverlay,
        !imageSrc && styles.contentCard,
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div className={cardClasses} onClick={onClick}>
            {imageSrc ? (
                <div className={styles.imageContainer}>
                    {/* Red label bar at top */}
                    {label && (
                        <div className={styles.label}>
                            {label}
                        </div>
                    )}

                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Green gradient overlay with description on hover */}
                    {description && (
                        <div className={styles.overlay}>
                            <p className={styles.description}>{description}</p>
                        </div>
                    )}
                </div>
            ) : (
                children
            )}
        </div>
    )
})

export default Card
