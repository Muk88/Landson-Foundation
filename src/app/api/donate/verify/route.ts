import { NextRequest, NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/paystack'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const reference = searchParams.get('reference')

        if (!reference) {
            return NextResponse.redirect(
                new URL('/donate?status=error&message=No reference provided', request.url)
            )
        }

        // Verify payment with Paystack
        const verification = await verifyPayment(reference)

        if (!verification.status || verification.data.status !== 'success') {
            // Update donation status to failed
            await supabase
                .from('donations')
                .update({ payment_status: 'failed' })
                .eq('payment_reference', reference)

            return NextResponse.redirect(
                new URL('/donate?status=error&message=Payment verification failed', request.url)
            )
        }

        // Update donation status to success
        const { error } = await supabase
            .from('donations')
            .update({
                payment_status: 'success',
                amount: verification.data.amount / 100, // Convert from kobo to naira/KES
            })
            .eq('payment_reference', reference)

        if (error) {
            console.error('Database update error:', error)
        }

        // Redirect to success page
        return NextResponse.redirect(
            new URL('/donate/success?reference=' + reference, request.url)
        )
    } catch (error) {
        console.error('Error verifying payment:', error)
        return NextResponse.redirect(
            new URL('/donate?status=error&message=Payment verification error', request.url)
        )
    }
}
