import Link from 'next/link'
import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartLink } from '@/components/CartLink'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const shopLinks = [
  { label: 'Coffee', href: '/shop/coffee' },
  { label: 'Tea', href: '/shop/tea' }
]


export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg shadow-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="heading-display text-lg sm:text-2xl pl-2 font-semibold">
              {settings?.title || 'Leaf & Bean'}
            </span>
          </Link>

          <NavigationMenu>
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

              {/* Editor-managed links: Studio → Settings → Navigation */}
              {settings?.navigation?.map((navItem) => (
                <NavigationMenuItem key={navItem._id}>
                  <NavigationMenuLink render={<Link href={`/${navItem.slug}`} />}>
                    {navItem.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Link href="/favorites" className="flex items-center gap-2"><Heart /></Link>
            </Button>
            <Button variant="ghost" size="icon">
                <CartLink />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
