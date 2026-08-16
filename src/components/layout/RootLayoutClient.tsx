'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export default function RootLayoutClient({ 
    children, 
    header, 
    footer 
}: { 
    children: React.ReactNode,
    header: React.ReactNode,
    footer: React.ReactNode
}) {
    const pathname = usePathname()
    
    // Check if the current route is part of the admin panel
    const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/landson-sergent-alfred')

    return (
        <>
            {!isAdminRoute && header}
            {children}
            {!isAdminRoute && footer}
        </>
    )
}
