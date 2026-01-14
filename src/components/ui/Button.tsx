import React from 'react'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'small' | 'medium' | 'large'
    fullWidth?: boolean
    loading?: boolean
    children: React.ReactNode
}

export default function Button({
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    loading = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button
            className={buttonClasses}
            disabled={disabled || loading}
            {...props}
        >
            {children}
        </button>
    )
}
