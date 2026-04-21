import React from 'react'
import Image from 'next/image'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

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
    return (
        <div 
            className={cn(
                'group relative overflow-hidden transition-all duration-500 rounded-[2rem]',
                !imageSrc && 'bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1',
                glass && 'bg-white/10 backdrop-blur-md border border-white/20',
                onClick && 'cursor-pointer',
                className
            )} 
            onClick={onClick}
        >
            {imageSrc ? (
                <div className="relative aspect-[4/5] overflow-hidden">
                    {/* Red label bar at top */}
                    {label && (
                        <div className="absolute top-6 left-6 z-20">
                            <span className="px-4 py-2 bg-brand-red text-white font-black text-[10px] uppercase tracking-widest rounded-lg shadow-lg">
                                {label}
                            </span>
                        </div>
                    )}

                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Green gradient overlay with description on hover */}
                    <div className={cn(
                        'absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/40 to-transparent flex flex-col justify-end p-8 transition-opacity duration-500',
                        forceShowOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    )}>
                        {title && <h3 className="text-2xl font-heading font-black text-white mb-2">{title}</h3>}
                        {description && (
                            <p className="text-white/90 text-sm font-medium leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                children
            )}
        </div>
    )
})

export default Card
