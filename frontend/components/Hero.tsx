import SanityImage from '@/components/SanityImage'
import Link from 'next/link'
import type { HomePageQueryResult } from '@/sanity.types'
import { DefaultHeroImage } from '@/components/DefaultHeroImage'

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
        <section className="relative isolate h-[70vh] min-h-120 flex items-start">
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
            ) : <DefaultHeroImage />
            }

            <div className="container">
                <div className="w-1/2">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-black">
                        {heading}
                    </h1>
                    {hero?.text && (
                        <p className="mt-6 text-lg text-neutral-700 max-w-md">{hero.text}</p>
                    )}
                    {hero?.ctaLabel && hero?.ctaHref && (
                        <Link
                            href={hero.ctaHref}
                            className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-full hover:bg-neutral-800 transition-colors"
                        >
                            {hero.ctaLabel}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    )
}