'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AddToCartButton } from '@/components/AddToCartButton'
import { getProductDetail, getProductCategory } from '@/lib/utils'
import { FavoriteButton } from './FavoriteButton'
import type { Product } from '@/types/product'


type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const category = getProductCategory(product)

    return (

        <Card className="relative mx-auto w-72 overflow-hidden pt-0">
            {/* TODO: use the product image from Sanity */}
        <Link href={`/shop/${category}/product/${product._id}`}>
            <Image
                src="/images/Ethiopia_._Shopify_Product_Image_Coffee_bag.jpg"
                alt={product.name}
                width={280}
                height={220}
                className="aspect-4/3 w-full object-cover"
            />

           

            <CardHeader className="space-y-4 p-2">
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-base font-semibold leading-tight">{product.name}</CardTitle>
                    <Badge variant="secondary">{getProductDetail(product)}</Badge>
                </div>

                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{product.origin}</p>
                    <p className="text-xs font-semibold">SEK {product.price}</p>

                    <div className="flex items-center gap-2 text-xs">
                        <span
                            className={`h-2 w-2 rounded-full ${product.available ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                        <span>{product.available ? 'In stock' : 'Out of stock'}</span>
                    </div>

                    <ul className="flex flex-wrap gap-4">
                        {product.flavorNotes.map((note) => (
                            <li key={note} className="rounded-full bg-muted px-2 py-1 text-xs">
                                {note}
                            </li>
                        ))}
                    </ul>
                </div>
                 </CardHeader>
            </Link>
            <FavoriteButton 
                product={product}
                className="absolute right-4 top-4"
            />

           
            

            <CardFooter>
                <AddToCartButton
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    available={product.available}
                    className="w-full cursor-pointer"
                />
            </CardFooter>
        </Card>
    )
}