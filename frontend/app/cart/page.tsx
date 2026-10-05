import {CartView} from '@/components/CartView'

export default function CartPage() {
  return (
    <main className="container py-12">
      <h1 className="heading-display mb-8 text-4xl text-center">Your cart</h1>
      <CartView />
    </main>
  )
}