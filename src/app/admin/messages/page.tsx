'use client'

import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { supabase, type ContactMessage } from '@/lib/supabase'
import styles from './page.module.css'

export default function MessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'unread'>('all')

    useEffect(() => {
        fetchMessages()
    }, [filter])

    async function fetchMessages() {
        try {
            let query = supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false })

            if (filter === 'unread') {
                query = query.eq('is_read', false)
            }

            const { data, error } = await query

            if (error) throw error
            setMessages(data || [])
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setLoading(false)
        }
    }

    async function toggleRead(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({ is_read: !currentStatus })
                .eq('id', id)

            if (error) throw error
            fetchMessages()
        } catch (error) {
            console.error('Error toggling read status:', error)
        }
    }

    async function deleteMessage(id: string) {
        if (!confirm('Are you sure you want to delete this message?')) return

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchMessages()
        } catch (error) {
            console.error('Error deleting message:', error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Contact Messages</h1>
                    <p className={styles.subtitle}>Manage inquiries from the website</p>
                </div>
                <div className={styles.controls}>
                    <Button
                        variant={filter === 'all' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                    >
                        All Messages
                    </Button>
                    <Button
                        variant={filter === 'unread' ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('unread')}
                    >
                        Unread Only
                    </Button>
                </div>
            </div>

            <div className={styles.content}>
                {loading ? (
                    <div>Loading...</div>
                ) : messages.length > 0 ? (
                    <div className={styles.messageList}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`${styles.messageCard} ${!message.is_read ? styles.unread : ''}`}
                            >
                                <div className={styles.messageHeader}>
                                    <div className={styles.senderInfo}>
                                        <h3>{message.name}</h3>
                                        <div className={styles.senderEmail}>
                                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {message.email}
                                        </div>
                                    </div>
                                    <span className={styles.date}>
                                        {new Date(message.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>

                                <div className={styles.messageBody}>
                                    {message.message}
                                </div>

                                <div className={styles.actions}>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => toggleRead(message.id, message.is_read)}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                            {message.is_read ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            )}
                                        </svg>
                                        Mark as {message.is_read ? 'Unread' : 'Read'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => deleteMessage(message.id)}
                                        style={{ borderColor: '#ef4444', color: '#ef4444' }}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>No messages found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
