import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    loading?: boolean
    children: React.ReactNode
}

export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-heading font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
        primary: 'bg-brand-red text-white shadow-lg hover:bg-brand-red-dark hover:shadow-xl hover:-translate-y-0.5',
        secondary: 'bg-brand-green text-white shadow-lg hover:bg-brand-green-dark hover:shadow-xl hover:-translate-y-0.5',
        outline: 'bg-transparent border-2 border-gray-900 text-gray-900 hover:border-brand-red hover:text-white hover:bg-brand-red shadow-sm hover:shadow-lg hover:-translate-y-0.5',
        ghost: 'bg-transparent text-gray-900 hover:bg-gray-100'
    }

    const sizes = {
        sm: 'px-6 py-2 text-xs',
        md: 'px-8 py-3 text-sm',
        lg: 'px-10 py-4 text-base'
    }

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                loading && 'relative text-transparent transition-none hover:text-transparent',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
            {children}
        </button>
    )
}
