'use client'

import Image from 'next/image'
import Link from 'next/link'
import {Card} from '@/components/ui/card'
import {AddToCartButton} from '@/components/AddToCartButton'
import {getProductDetail, getProductCategory} from '@/lib/utils'
import {FavoriteButton} from './FavoriteButton'
import type {Product} from '@/types/product'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({product}: ProductCardProps) {
  const category = getProductCategory(product)
  const notes = (product.flavorNotes ?? []).join(' · ')

  return (
    <Card className="group relative mx-auto h-full w-full max-w-sm gap-0 rounded-2xl bg-white py-0 shadow-sm ring-stone-200 transition-shadow hover:shadow-md">
      <Link
        href={`/shop/${category}/product/${product._id}`}
        className="block rounded-t-2xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stone-800"
      >
        <div className="relative overflow-hidden bg-stone-100">
          {/* TODO: use the product image from Sanity */}
          <Image
            src="/images/Ethiopia_._Shopify_Product_Image_Coffee_bag.jpg"
            alt=""
            width={600}
            height={450}
            sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="aspect-4/3 h-auto w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium capitalize text-stone-700">
            {category}
          </span>
        </div>

        <div className="p-5 pb-4">
          <p className="truncate text-xs font-medium uppercase tracking-widest text-stone-500">
            {product.origin}
          </p>
          <h2 className="mt-2 line-clamp-2 min-h-14 break-words text-lg font-semibold leading-7 tracking-tight text-stone-900">
            {product.name}
          </h2>
          <p className="mt-2 min-h-5 text-sm text-stone-600">{getProductDetail(product)}</p>
          <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-stone-500">{notes}</p>
        </div>
      </Link>

      <FavoriteButton product={product} className="absolute right-3 top-3" />

      <div className="mt-auto space-y-4 px-5 pb-5">
        <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <p className="text-lg font-semibold tabular-nums text-stone-900">
            {product.price.toLocaleString('en', {maximumFractionDigits: 2})}
            <span className="ml-1.5 text-xs font-normal text-stone-500">SEK</span>
          </p>
          <span className="flex items-center gap-1.5 text-xs text-stone-600">
            <span aria-hidden="true" className={`size-1.5 rounded-full ${product.available ? 'bg-emerald-600' : 'bg-stone-400'}`} />
            {product.available ? 'In stock' : 'Out of stock'}
          </span>
        </div>
        <AddToCartButton
          id={product._id}
          name={product.name}
          price={product.price}
          available={product.available}
          className="h-11 w-full cursor-pointer rounded-xl bg-stone-900 font-medium text-white hover:bg-stone-700 disabled:cursor-not-allowed"
        />
      </div>
    </Card>
  )
}
