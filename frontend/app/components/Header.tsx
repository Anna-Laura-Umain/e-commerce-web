import Link from 'next/link'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import { Heart, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg sm:text-2xl pl-2 font-semibold">
              {settings?.title || 'Leaf & Bean'}
            </span>
          </Link>

          <nav className="flex gap-6">
            {/* link for future catalog-page defined in code*/}
            <Link href="/shop" className="flex gap-6 hover:underline">
              Shop
            </Link> 
            {/* editor-managed navigation items -> in studio under Setting -> Navigation */}
            {settings?.navigation?.map((navItem) => (
              <Link key={navItem._id} href={`/${navItem.slug}`}>
                {navItem.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Link href="/favourites" className="flex items-center gap-2"><Heart /></Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/cart" className="flex items-center gap-2">
                <ShoppingBag />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
