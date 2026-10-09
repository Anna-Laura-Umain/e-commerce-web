import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { AddToCartButton } from '@/components/AddToCartButton'
import type { Product } from '@/types/product'
import { FavoriteButton } from './FavoriteButton'

type ProductDetailsProps = {
  product: Product
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl bg-muted">
          <Image
            src="/images/Ethiopia_._Shopify_Product_Image_Coffee_bag.jpg"
            alt={product.name}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />
          <FavoriteButton 
            product={product}
            className="absolute right-4 top-4"
           />
        </div>
          


        
        <section className="space-y-6">

          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              {product.origin}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold">
              SEK {product.price}
            </p>
          </div>

          
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                product.available ? 'bg-green-500' : 'bg-red-500'
              }`}
            />

            <span>
              {product.available ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          
          <div className="flex flex-wrap gap-2">
            {'roastLevel' in product && product.roastLevel && (
              <Badge variant="secondary">
                {product.roastLevel} roast
              </Badge>
            )}

            {'teaType' in product && product.teaType && (
              <Badge variant="secondary">
                {product.teaType}
              </Badge>
            )}

            {'oxidationLevel' in product && product.oxidationLevel && (
              <Badge variant="secondary">
                {product.oxidationLevel} oxidation
              </Badge>
            )}
          </div>

          
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Flavor notes
            </h2>

            <ul className="flex flex-wrap gap-2">
              {(product.flavorNotes ?? []).map((note) => (
                <li
                  key={note}
                  className="rounded-full bg-muted px-3 py-1.5 text-sm"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          
          <div className="border-t pt-6">
            <h2 className="mb-2 text-lg font-semibold">
              About this product
            </h2>

            <p className="leading-7 text-muted-foreground">
              {product.description}
            </p>
          </div>

          
          <div className="grid gap-6 border-t pt-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">
                Processing method
              </p>

              <p className="mt-1 font-medium">
                {product.processingMethod}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Brewing instructions
              </p>

              <p className="mt-1 font-medium">
                {product.brewingInstructions}
              </p>
            </div>
          </div>

          <AddToCartButton
            id={product._id}
            name={product.name}
            price={product.price}
            available={product.available}
            className="w-full cursor-pointer"
          />
        </section>
      </div>
    </main>
  )
}