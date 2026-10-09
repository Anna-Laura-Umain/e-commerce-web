import {NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'
import {checkoutProductsQuery} from '@/sanity/lib/queries'
import {stripe} from '@/lib/stripe'

type CheckoutItem = {
  id: string
  quantity: number
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null)
  const items = body && typeof body === 'object' && 'items' in body ? body.items : null

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({error: 'Your cart is empty or invalid'}, {status: 400})
  }

  if (!items.every((item): item is CheckoutItem =>
    item !== null && typeof item === 'object' &&
    typeof item.id === 'string' && item.id.trim().length > 0 &&
    Number.isSafeInteger(item.quantity) && item.quantity > 0,
  ) || new Set(items.map((item) => item.id)).size !== items.length) {
    return NextResponse.json({error: 'Invalid cart items or quantities'}, {status: 400})
  }

  try {
    // Always use current published prices and availability, never browser prices.
    const products = await client.fetch(checkoutProductsQuery, {
      ids: items.map((item) => item.id),
    }, {useCdn: false, perspective: 'published'})

    const lineItems = []
    for (const item of items) {
      const product = products.find((p) => p._id === item.id)
      // Convert SEK to öre once; reject missing, non-finite or non-positive amounts.
      const unitAmount = typeof product?.price === 'number' ? Math.round(product.price * 100) : NaN
      if (!product || !product.available || !product.name ||
        !Number.isSafeInteger(unitAmount) || unitAmount < 1) {
        // Never start payment for only part of the customer's requested cart.
        return NextResponse.json({
          error: 'A product is unavailable or has an invalid price. Please update your cart.',
        }, {status: 400})
      }

      lineItems.push({
        quantity: item.quantity,
        price_data: {
          currency: 'sek',
          unit_amount: unitAmount,
          product_data: {name: product.name},
        },
      })
    }

    const origin = new URL(request.url).origin
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    })

    return NextResponse.json({url: session.url})
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: 'Something went wrong'}, {status: 500})
  }
}
