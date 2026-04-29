'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getAdminPath } from '@/lib/admin-path'

export default function AdminDashboard() {
    const router = useRouter()
    const adminPath = getAdminPath()
    const [stats, setStats] = useState({
        totalStories: 0,
        unreadMessages: 0,
    })

    useEffect(() => {
        async function fetchStats() {
            try {
                // Get total stories
                const { count: storiesCount } = await supabase
                    .from('success_stories')
                    .select('*', { count: 'exact', head: true })

                // Get unread messages
                const { count: messagesCount } = await supabase
                    .from('contact_messages')
                    .select('*', { count: 'exact', head: true })
                    .eq('is_read', false)

                setStats({
                    totalStories: storiesCount || 0,
                    unreadMessages: messagesCount || 0,
                })
            } catch (error) {
                console.error('Error fetching stats:', error)
            }
        }

        fetchStats()
    }, [])

    const quickLinks = [
        {
            title: 'Update Metrics',
            description: 'Update the impact counters on homepage',
            href: `${adminPath}/metrics`,
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: 'Add Story',
            description: 'Create and publish a new success story',
            href: `${adminPath}/stories/new`,
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            )
        },
        {
            title: 'Check Messages',
            description: `You have ${stats.unreadMessages} unread messages`,
            href: `${adminPath}/messages`,
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
    ]

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="mb-10">
                <h1 className="text-4xl font-heading font-black text-gray-900 tracking-tight mb-2">Dashboard</h1>
                <p className="text-gray-500 text-lg">Welcome back to the admin portal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Stories Widget */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                        <span className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Success Stories</span>
                        <span className="block text-5xl font-black text-gray-900">{stats.totalStories}</span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                </div>

                {/* Messages Widget */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                        <span className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Unread Messages</span>
                        <span className="block text-5xl font-black text-brand-red">{stats.unreadMessages}</span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center">
                        <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex items-center gap-3">
                <span className="w-2 h-6 bg-brand-green rounded-full"></span>
                <h2 className="text-2xl font-heading font-black text-gray-900 tracking-tight">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-green/30 transition-all group flex flex-col items-start gap-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors">
                            {link.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-brand-green transition-colors">{link.title}</h3>
                            <p className="text-sm text-gray-500">{link.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
