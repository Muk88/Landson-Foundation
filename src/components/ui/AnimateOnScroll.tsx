'use client'

import React, { useRef, useEffect, useState, type ElementType, type ReactNode } from 'react'

// ── Variant definitions ──────────────────────────────────────────────────────
export type AnimVariant =
    | 'fade-up'
    | 'fade-down'
    | 'fade-left'
    | 'fade-right'
    | 'fade-in'
    | 'scale-up'
    | 'scale-in'
    | 'slide-up'
    | 'flip-up'

const variantStyles: Record<AnimVariant, { hidden: string; visible: string }> = {
    'fade-up': {
        hidden:  'opacity-0 translate-y-12',
        visible: 'opacity-100 translate-y-0',
    },
    'fade-down': {
        hidden:  'opacity-0 -translate-y-12',
        visible: 'opacity-100 translate-y-0',
    },
    'fade-left': {
        hidden:  'opacity-0 translate-x-12',
        visible: 'opacity-100 translate-x-0',
    },
    'fade-right': {
        hidden:  'opacity-0 -translate-x-12',
        visible: 'opacity-100 translate-x-0',
    },
    'fade-in': {
        hidden:  'opacity-0',
        visible: 'opacity-100',
    },
    'scale-up': {
        hidden:  'opacity-0 scale-90',
        visible: 'opacity-100 scale-100',
    },
    'scale-in': {
        hidden:  'opacity-0 scale-75',
        visible: 'opacity-100 scale-100',
    },
    'slide-up': {
        hidden:  'opacity-0 translate-y-20',
        visible: 'opacity-100 translate-y-0',
    },
    'flip-up': {
        hidden:  'opacity-0 translate-y-8 rotate-x-12',
        visible: 'opacity-100 translate-y-0 rotate-x-0',
    },
}

// ── Duration helpers ─────────────────────────────────────────────────────────
const durationMap: Record<string, string> = {
    fast:   'duration-500',
    normal: 'duration-700',
    slow:   'duration-1000',
    xslow:  'duration-1200',
}

const easingMap: Record<string, string> = {
    smooth:  'ease-out',
    spring:  '[cubic-bezier(0.34,1.56,0.64,1)]',
    elegant: '[cubic-bezier(0.25,0.46,0.45,0.94)]',
    bounce:  '[cubic-bezier(0.68,-0.55,0.265,1.55)]',
}

// ── Component ────────────────────────────────────────────────────────────────
interface AnimateOnScrollProps {
    children: ReactNode
    variant?: AnimVariant
    delay?: number          // ms delay before animation starts
    duration?: keyof typeof durationMap
    easing?: keyof typeof easingMap
    threshold?: number      // 0–1, how much of the element must be visible
    rootMargin?: string
    triggerOnce?: boolean
    className?: string
    as?: ElementType
}

export default function AnimateOnScroll({
    children,
    variant = 'fade-up',
    delay = 0,
    duration = 'normal',
    easing = 'elegant',
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    className = '',
    as: Tag = 'div',
}: AnimateOnScrollProps) {
    const ref = useRef<HTMLElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    if (triggerOnce) observer.unobserve(el)
                } else {
                    if (!triggerOnce) setInView(false)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold, rootMargin, triggerOnce])

    const { hidden, visible } = variantStyles[variant]
    const dur = durationMap[duration]
    const ease = easingMap[easing]

    return (
        <Tag
            ref={ref as React.Ref<any>}
            className={`
                transition-all
                ${dur}
                ${ease}
                ${inView ? visible : hidden}
                ${className}
            `}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    )
}

// ── Stagger wrapper — animates children with incremental delays ───────────────
interface StaggerProps {
    children: ReactNode[]
    variant?: AnimVariant
    staggerMs?: number       // ms between each child's delay
    baseDelay?: number
    duration?: keyof typeof durationMap
    easing?: keyof typeof easingMap
    className?: string
    childClassName?: string
    threshold?: number
    as?: ElementType
    childAs?: ElementType
}

export function StaggerChildren({
    children,
    variant = 'fade-up',
    staggerMs = 100,
    baseDelay = 0,
    duration = 'normal',
    easing = 'elegant',
    className = '',
    childClassName = '',
    threshold = 0.08,
    as: Tag = 'div',
    childAs: ChildTag = 'div',
}: StaggerProps) {
    const ref = useRef<HTMLElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.unobserve(el)
                }
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    const { hidden, visible } = variantStyles[variant]
    const dur = durationMap[duration]
    const ease = easingMap[easing]

    return (
        <Tag ref={ref as React.Ref<any>} className={className}>
            {React.Children.map(children, (child, i) => (
                <ChildTag
                    className={`
                        transition-all
                        ${dur}
                        ${ease}
                        ${inView ? visible : hidden}
                        ${childClassName}
                    `}
                    style={{ transitionDelay: `${baseDelay + i * staggerMs}ms` }}
                >
                    {child}
                </ChildTag>
            ))}
        </Tag>
    )
}
