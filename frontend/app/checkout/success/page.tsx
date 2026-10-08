import Link from 'next/link'
import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { ClearCart } from '@/components/ClearCart'
import { formatPrice } from '@/lib/utils'

type SearchParams = Record<string, string | string[]>

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>
}) {
    const params = await searchParams
    const sessionId = typeof params.session_id === 'string' ? params.session_id : undefined

    if (!sessionId) {
        redirect('/cart')
    }


    // Ask Stripe if this session was  paid
    const session = await stripe.checkout.sessions.retrieve(sessionId).catch(() => null)

    if (!session || session.payment_status !== 'paid') {
        redirect('/cart')
    }

    // from stripe: Öre is the smallest currency unit for Swedish Krona (SEK). When passing an amount to the Stripe API, you must always provide it in the smallest unit of the currency.
    // in stripe 1 sek = 100 öre. -> 
    const total = (session.amount_total ?? 0) / 100


    return (
        <main className="container py-24 text-center">
            <ClearCart />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
                Order confirmed
            </p>
            <h1 className="mt-4 heading-display text-4xl md:text-5xl">Thank you for your order</h1>
            <p className="mt-6 text-lg text-stone-600">Total paid: SEK {formatPrice(total)}</p>

            <Link
                href="/"
                className="mt-10 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
            >
                Continue shopping
            </Link>
        </main>
    )
}