import { NextRequest, NextResponse } from 'next/server'
import { initializePayment } from '@/lib/paystack'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { amount, email, name, donationType } = body

        // Validate input
        if (!amount || !email || !donationType) {
            return NextResponse.json(
                { error: 'Amount, email, and donation type are required' },
                { status: 400 }
            )
        }

        if (amount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be greater than 0' },
                { status: 400 }
            )
        }

        // Initialize Paystack payment
        const paymentData = await initializePayment(email, amount, {
            donor_name: name || 'Anonymous',
            donation_type: donationType,
        })

        // Create pending donation record
        const { error: dbError } = await supabase
            .from('donations')
            .insert([
                {
                    amount,
                    donor_name: name || null,
                    donor_email: email,
                    payment_reference: paymentData.data.reference,
                    payment_status: 'pending',
                    donation_type: donationType,
                },
            ])

        if (dbError) {
            console.error('Database error:', dbError)
            throw dbError
        }

        return NextResponse.json(
            {
                authorizationUrl: paymentData.data.authorization_url,
                reference: paymentData.data.reference,
            },
            { status: 200 }
        )
    } catch (error: any) {
        console.error('Error initializing donation:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to initialize payment' },
            { status: 500 }
        )
    }
}
