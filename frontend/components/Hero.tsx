import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
import SanityImage from '@/components/SanityImage'
import {DefaultHeroImage} from '@/components/DefaultHeroImage'
import type {HomePageQueryResult} from '@/sanity.types'

type HeroProps = {
  hero: NonNullable<HomePageQueryResult>['hero']
}

type SanityHotspot = {x?: number; y?: number}
type SanityCrop = {top?: number; bottom?: number; left?: number; right?: number}

function toHotspot(hotspot?: SanityHotspot) {
  if (hotspot?.x === undefined || hotspot?.y === undefined) return undefined
  return {x: hotspot.x, y: hotspot.y}
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
  return {top: crop.top, bottom: crop.bottom, left: crop.left, right: crop.right}
}

export default function Hero({hero}: HeroProps) {
  const image = hero?.image

  // default data for hero: fallbacks even if a field is empty in Studio
  const eyebrow = hero?.eyebrow ?? 'Small-batch tea & coffee'
  const heading = hero?.heading ?? 'Tea and coffee, freshly picked for you'
  const primaryButton = {
    label: hero?.primaryButton?.label ?? 'Shop tea',
    href: hero?.primaryButton?.href ?? '/shop/tea',
  }
  const secondaryButton = {
    label: hero?.secondaryButton?.label ?? 'Shop coffee',
    href: hero?.secondaryButton?.href ?? '/shop/coffee',
  }

  return (
    <section className="relative isolate  min-h-120 flex items-start pt-16  pb-16 sm:items-center">
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

      <div className="container w-full">
        <div className=" rounded-2xl bg-white/70 p-6  backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
            {eyebrow}
          </p>

          <h1 className="mt-4 heading-display text-4xl md:text-5xl lg:text-6xl">{heading}</h1>

          {hero?.text && (
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-600">{hero.text}</p>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={primaryButton.href}
              className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {primaryButton.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={secondaryButton.href}
              className="group inline-flex items-center gap-2 rounded-full border border-stone-900 bg-white px-7 py-3 text-sm font-medium text-stone-900 transition hover:-translate-y-0.5 hover:bg-stone-900 hover:text-white"
            >
              {secondaryButton.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}