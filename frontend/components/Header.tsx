import Link from 'next/link'
import {Heart} from 'lucide-react'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {buttonVariants} from '@/components/ui/button'
import {CartLink} from '@/components/CartLink'
import {MobileMenu} from '@/components/MobileMenu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const shopLinks = [
  {label: 'Coffee', href: '/shop/coffee'},
  {label: 'Tea', href: '/shop/tea'},
]

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  // Editor-managed links: Studio → Settings → Navigation
  const pageLinks =
    settings?.navigation?.map((navItem) => ({
      label: navItem.name ?? '',
      href: `/${navItem.slug}`,
    })) ?? []

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg shadow-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="heading-display text-lg sm:text-2xl pl-2 font-semibold">
              {settings?.title || 'Leaf & Bean'}
            </span>
          </Link>

          {/* Desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-40 gap-1 p-2">
                    {shopLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink render={<Link href={link.href} />}>
                          {link.label}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {pageLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink render={<Link href={link.href} />}>
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/favorites"
              aria-label="Favorites"
              className={buttonVariants({variant: 'ghost', size: 'icon'})}
            >
              <Heart />
            </Link>
            <CartLink />

            {/* Mobile  */}
            <div className="md:hidden">
              <MobileMenu shopLinks={shopLinks} pageLinks={pageLinks} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}