import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { checkoutProductsQuery } from "@/sanity/lib/queries";
import { stripe } from "@/lib/stripe";

type CheckoutItem = {
    id: string
    quantity: number
}

export async function POST(request: Request){
    try {
        const {items} = (await request.json()) as {items: CheckoutItem[]}

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json({error: 'Your cart is empty'}, {status: 400})
        }

        // price comes from Sanity
        const products = await client.fetch(checkoutProductsQuery, {
            ids: items.map((item) => item.id),
        } )

        const lineItems = items.flatMap((item) => {
            const product = products.find((p) => p._id === item.id)

            if (!product || !product.available || !product.price || !product.name) {
                return []
            }

            return [
                {
                    quantity: Math.max(1, Math.floor(item.quantity)),
                    price_data: {
                        currency: 'sek',
                        // from stripe: Öre is the smallest currency unit for Swedish Krona (SEK). When passing an amount to the Stripe API, you must always provide it in the smallest unit of the currency.
                        // in stripe 1 sek = 100 öre. -> 
                        unit_amount: Math.round(product.price * 100),
                        product_data: {name: product.name},
                    },
                },
            ]
        })

        if (lineItems.length === 0){
            return NextResponse.json({error: 'No available products'}, {status: 400})
        }
        
        const origin = request.headers.get('origin') ?? 'http://localhost:3000' // return adress

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: lineItems,
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart`
        })

        return NextResponse.json({url: session.url})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error:'Something went wrong'}, {status: 500})
    }
}