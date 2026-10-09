'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'

export function CheckoutButton() {
    const items = useCartStore((state) => state.items)
    const [isLoading, setIsLoading] = useState(false)

    async function handleCheckout() {
        setIsLoading(true)

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Only ids and quantities, the server looks up the prices
                body: JSON.stringify({
                    items: items.map(({ id, quantity }) => ({ id, quantity })),
                }),
            })
            const data = await response.json()

            if (!response.ok || !data.url) {
                throw new Error(data.error ?? 'Could not start checkout')
            }

            // Stripe Checkout is on another site, so a full page redirect
            window.location.href = data.url
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Could not start checkout')
            setIsLoading(false)
        }
    }

    return (
        <Button
            className='mt-6 w-full'
            onClick={handleCheckout}
            disabled={isLoading || items.length === 0}
        >
            {isLoading ? 'Redirecting…' : 'Checkout'}
        </Button>
    )

}