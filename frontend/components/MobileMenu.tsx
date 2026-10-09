'use client'

import {useState} from 'react'
import Link from 'next/link'
import {Menu} from 'lucide-react'
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet'
import {buttonVariants} from '@/components/ui/button'

type NavLink = {
  label: string
  href: string
}

type MobileMenuProps = {
  shopLinks: NavLink[]
  pageLinks: NavLink[]
}

export function MobileMenu({shopLinks, pageLinks}: MobileMenuProps) {
  const [open, setOpen] = useState(false)


  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={buttonVariants({variant: 'ghost', size: 'icon'})}
      >
        <Menu />
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-8 px-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
              Shop
            </p>
            <ul className="mt-3 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close} className="text-sm text-stone-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {pageLinks.length > 0 && (
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close} className="text-sm text-stone-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
