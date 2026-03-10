const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!

export interface PaystackInitializeResponse {
    status: boolean
    message: string
    data: {
        authorization_url: string
        access_code: string
        reference: string
    }
}

export interface PaystackVerifyResponse {
    status: boolean
    message: string
    data: {
        id: number
        domain: string
        status: string
        reference: string
        amount: number
        message: string | null
        gateway_response: string
        paid_at: string
        created_at: string
        channel: string
        currency: string
        ip_address: string
        metadata: any
        customer: {
            id: number
            first_name: string | null
            last_name: string | null
            email: string
            customer_code: string
            phone: string | null
            metadata: any
            risk_action: string
        }
    }
}

export async function initializePayment(
    email: string,
    amount: number,
    metadata: Record<string, any>
): Promise<PaystackInitializeResponse> {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            amount: amount * 100, // Convert to kobo/cents
            metadata,
            callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/verify`,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        console.error('Paystack error:', data)
        throw new Error(data.message || 'Failed to initialize payment')
    }

    return data
}

export async function verifyPayment(reference: string): Promise<PaystackVerifyResponse> {
    const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        }
    )

    if (!response.ok) {
        throw new Error('Failed to verify payment')
    }

    return response.json()
}

export { PAYSTACK_PUBLIC_KEY }
