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
}

export default function Card({
    title,
    description,
    imageSrc,
    imageAlt = '',
    label,
    onClick,
    className = '',
    glass = false,
    children,
}: CardProps) {
    const cardClasses = [
        styles.card,
        glass && styles.glass,
        !imageSrc && styles.contentCard,
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div className={cardClasses} onClick={onClick}>
            {imageSrc ? (
                <>
                    {/* Title header above image */}
                    {title && (
                        <div className={styles.titleHeader}>
                            <h3 className={styles.title}>{title}</h3>
                        </div>
                    )}

                    {/* Image container */}
                    <div className={styles.imageContainer}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Description shown on hover at bottom */}
                        {description && (
                            <div className={styles.overlay}>
                                <div className={styles.overlayContent}>
                                    <p className={styles.description}>{description}</p>
                                </div>
                            </div>
                        )}

                        {/* Label at bottom corner */}
                        {label && (
                            <div className={styles.cardLabel}>
                                {label}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                children
            )}
        </div>
    )
}
