'use client'

import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { supabase, type ContactMessage } from '@/lib/supabase'

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
        <>
            <div className="header">
                <h1>Contact Messages</h1>
                <p>View and manage messages from the contact form</p>
            </div>

            <div className="content">
                <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <Button
                        variant={filter === 'all' ? 'primary' : 'outline'}
                        size="small"
                        onClick={() => setFilter('all')}
                    >
                        All Messages
                    </Button>
                    <Button
                        variant={filter === 'unread' ? 'primary' : 'outline'}
                        size="small"
                        onClick={() => setFilter('unread')}
                    >
                        Unread Only
                    </Button>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : messages.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                style={{
                                    padding: 'var(--spacing-lg)',
                                    border: `2px solid ${message.is_read ? 'var(--color-gray-200)' : 'var(--color-red)'}`,
                                    borderRadius: 'var(--radius-md)',
                                    background: message.is_read ? 'white' : 'rgba(227, 30, 36, 0.05)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <div>
                                        <h3 style={{ color: 'var(--color-red)', marginBottom: '0.25rem' }}>
                                            {message.name}
                                        </h3>
                                        <p style={{ color: 'var(--color-gray-600)', fontSize: '0.9rem' }}>
                                            {message.email}
                                        </p>
                                    </div>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
                                        {new Date(message.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--color-gray-800)', lineHeight: 1.6, marginBottom: 'var(--spacing-md)' }}>
                                    {message.message}
                                </p>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => toggleRead(message.id, message.is_read)}
                                    >
                                        Mark as {message.is_read ? 'Unread' : 'Read'}
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => deleteMessage(message.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', color: 'var(--color-gray-500)' }}>
                        <p>No messages found</p>
                    </div>
                )}
            </div>
        </>
    )
}
