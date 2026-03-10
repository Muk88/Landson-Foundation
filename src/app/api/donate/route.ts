import { NextRequest, NextResponse } from 'next/server'
import { initializePayment } from '@/lib/paystack'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { amount, email, name, donationType } = body

        // Validate input
        if (!amount || !email) {
            return NextResponse.json(
                { error: 'Amount and email are required' },
                { status: 400 }
            )
        }

        if (amount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be greater than 0' },
                { status: 400 }
            )
        }

        // Initialize Paystack payment with metadata
        // Donation will only be recorded after successful payment
        const paymentData = await initializePayment(email, amount, {
            donor_name: name || 'Anonymous',
            donation_type: donationType || 'General',
        })

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
