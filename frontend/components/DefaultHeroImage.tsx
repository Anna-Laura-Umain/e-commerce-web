import {getImageProps} from 'next/image'

const alt = 'Tea and coffee'

export function DefaultHeroImage() {
  const common = {alt, sizes: '100vw', quality: 80}

  const {props: {srcSet: desktop}} = getImageProps({
    ...common,
    src: '/images/hero/hero-default-bg-desktop.jpg',
    width: 1672,
    height: 941,
  })
  const {props: {srcSet: tablet}} = getImageProps({
    ...common,
    src: '/images/hero/hero-default-bg-tablet.jpg',
    width: 1448,
    height: 1086,
  })
  const {props: {srcSet: mobile, ...rest}} = getImageProps({
    ...common,
    src: '/images/hero/hero-default-bg-mobile.jpg',
    width: 941,
    height: 1672,
  })

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source media="(min-width: 640px)" srcSet={tablet} />
      <img
        {...rest}
        srcSet={mobile}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
    </picture>
  )
}