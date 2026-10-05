import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SanityImage from '@/components/SanityImage'
import { DefaultHeroImage } from '@/components/DefaultHeroImage'
import type { HomePageQueryResult } from '@/sanity.types'

type HeroProps = {
    hero: NonNullable<HomePageQueryResult>['hero']
}

type SanityHotspot = { x?: number; y?: number }
type SanityCrop = { top?: number; bottom?: number; left?: number; right?: number }

function toHotspot(hotspot?: SanityHotspot) {
    if (hotspot?.x === undefined || hotspot?.y === undefined) return undefined
    return { x: hotspot.x, y: hotspot.y }
}

function toCrop(crop?: SanityCrop) {
    if (
        crop?.top === undefined ||
        crop?.bottom === undefined ||
        crop?.left === undefined ||
        crop?.right === undefined
    ) {
        return undefined
    }
    return { top: crop.top, bottom: crop.bottom, left: crop.left, right: crop.right }
}

export default function Hero({ hero }: HeroProps) {
    const image = hero?.image
    const heading = hero?.heading ?? 'Tea and coffee, freshly picked for you'

    return (
        <section className="relative isolate h-[80vh] min-h-120 flex items-start pt-16 md:items-center md:pt-0">
            {image?.asset?._id ? (
                <SanityImage
                    id={image.asset._id}
                    alt={image.alt ?? ''}
                    width={1920}
                    height={1080}
                    mode="cover"
                    hotspot={toHotspot(image.hotspot)}
                    crop={toCrop(image.crop)}
                    preview={image.asset.metadata?.lqip ?? undefined}
                    sizes="100vw"
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                />
            ) : (
                <DefaultHeroImage />
            )}

            <div className="container">
                <div className="md:w-1/2 lg:w-5/12">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
                        Small-batch tea & coffee
                    </p>

                    <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tighter text-balance bg-linear-to-br from-stone-900 to-amber-900 bg-clip-text text-transparent">
                        {heading}
                    </h1>

                    {hero?.text && (
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-600">{hero.text}</p>
                    )}

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link
                            href="/shop/tea"
                            className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            Shop tea
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/shop/coffee"
                            className="group inline-flex items-center gap-2 rounded-full border border-stone-900 bg-white px-7 py-3 text-sm font-medium text-stone-900 transition hover:-translate-y-0.5 hover:bg-stone-900 hover:text-white"            >
                            Shop coffee
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}