import { NextRequest, NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/paystack'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const reference = searchParams.get('reference')

        if (!reference) {
            return NextResponse.json(
                { error: 'Payment reference is required' },
                { status: 400 }
            )
        }

        // Verify payment with Paystack
        const paymentData = await verifyPayment(reference)

        if (!paymentData.data || paymentData.data.status !== 'success') {
            return NextResponse.json(
                { error: 'Payment verification failed' },
                { status: 400 }
            )
        }

        // Extract payment details
        const { amount, metadata, customer } = paymentData.data

        // Check if donation already exists
        const { data: existingDonation } = await supabaseAdmin
            .from('donations')
            .select('*')
            .eq('payment_reference', reference)
            .single()

        // If donation already exists, return it as success
        if (existingDonation) {
            return NextResponse.json(
                {
                    success: true,
                    donation: existingDonation,
                },
                { status: 200 }
            )
        }

        // Record donation in database
        const { data: donation, error: dbError } = await supabaseAdmin
            .from('donations')
            .insert([
                {
                    amount: amount / 100, // Convert from kobo to KES
                    donor_name: metadata.donor_name || 'Anonymous',
                    donor_email: customer.email,
                    donation_type: metadata.donation_type || 'General',
                    payment_reference: reference,
                    payment_status: 'completed',
                },
            ])
            .select()
            .single()

        if (dbError) {
            console.error('Database error:', dbError)
            return NextResponse.json(
                { error: 'Failed to record donation' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                donation,
            },
            { status: 200 }
        )
    } catch (error: any) {
        console.error('Error verifying donation:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to verify payment' },
            { status: 500 }
        )
    }
}
