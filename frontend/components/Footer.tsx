import Link from 'next/link'
import {ArrowUpRight} from 'lucide-react'

type FooterLink = {
  label: string
  href: string
}

const shopLinks: FooterLink[] = [
  {label: 'Tea', href: '/shop/tea'},
  {label: 'Coffee', href: '/shop/coffee'},
  {label: 'Favorites', href: '/favorites'},
  {label: 'Cart', href: '/cart'},
]

const creditLinks: FooterLink[] = [
  {label: 'Anna Baidikova', href: 'https://www.linkedin.com/in/anna-baidikova'},
  {label: 'Laura Lundin', href: 'https://www.linkedin.com/in/lauralundin'},
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="heading-display text-xl">Leaf & Bean</p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-stone-600">
              Loose-leaf teas and small-batch coffee from growers we know by name.
            </p>
          </div>

          <nav aria-label="Shop">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
              Shop
            </p>
            <ul className="mt-4 space-y-2 text-xs">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-700 transition-colors hover:text-stone-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
              Made by
            </p>
            <ul className="mt-4 space-y-2 text-xs">
              {creditLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-stone-700 transition-colors hover:text-stone-900"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 pt-6 text-xs text-stone-500 sm:flex-row sm:justify-between">
          <p>© {year} Leaf & Bean</p>
          <p>Built with Sanity and Next.js</p>
        </div>
      </div>
    </footer>
  )
}