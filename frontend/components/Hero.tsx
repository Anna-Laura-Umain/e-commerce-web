import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/utils'
import type { HomePageQueryResult } from '@/sanity.types'

type HeroProps = {
    hero: NonNullable<HomePageQueryResult>['hero']
}

// todo? : add default image 

export default function Hero({ hero }: HeroProps) {
    if (!hero) return null

    const imageUrl = hero.image?.asset
        ? urlForImage(hero.image)?.width(1920).height(1080).auto('format').url()
        : null

    return (
        <section className="relative h-[70vh] min-h-120 flex items-center">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={hero.image?.alt ?? ''}
                    fill
                    priority
                    sizes="100vw"
                    placeholder={hero.image?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={hero.image?.asset?.metadata?.lqip ?? undefined}
                    className="object-cover -z-10"
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