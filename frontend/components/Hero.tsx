import SanityImage from '@/components/SanityImage'
import Link from 'next/link'
import type { HomePageQueryResult } from '@/sanity.types'

type HeroProps = {
    hero: NonNullable<HomePageQueryResult>['hero']
}

type SanityHotspot = { x?: number; y?: number } // 
type SanityCrop = { top?: number; bottom?: number; left?: number; right?: number } //

// todo? : add default image 

function toHotspot(hotspot?: SanityHotspot) { if (hotspot?.x === undefined || hotspot?.y === undefined) return undefined return { x: hotspot.x, y: hotspot.y } } function toCrop(crop?: SanityCrop) { if (crop?.top === undefined || crop?.bottom === undefined || crop?.left === undefined || crop?.right === undefined) { return undefined } return { top: crop.top, bottom: crop.bottom, left: crop.left, right: crop.right } }

export default function Hero({ hero }: HeroProps) {
    if (!hero) return null

    const imageUrl = hero.image?.asset
        ? urlForImage(hero.image)?.width(1920).height(1080).auto('format').url()
        : null

    return (
        <section className="relative h-[70vh] min-h-120 flex items-center">
            {imageUrl && (
                <SanityImage
                    id={hero.image.asset._id}
                    alt={hero.image.alt ?? ''}
                    width={1920}
                    height={1080}
                    mode="cover"
                    hotspot={hero.image.hotspot}
                    crop={hero.image.crop}
                    preview={hero.image.asset.metadata?.lqip ?? undefined}
                    sizes="100vw"
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                />
            )}
            <div className="container text-white">
                <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">{hero.heading}</h1>
                {hero.text && <p className="mt-4 text-lg max-w-xl">{hero.text}</p>}
                {hero.ctaLabel && hero.ctaHref && (
                    <Link href={hero.ctaHref} className="inline-block mt-8 bg-white text-black px-6 py-3 rounded-full">
                        {hero.ctaLabel}
                    </Link>
                )}
            </div>
        </section>
    )
}