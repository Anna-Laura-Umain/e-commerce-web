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

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"

// export function SheetDemo() {
//   return (
//     <Sheet>
//       <SheetTrigger render={<Button variant="outline">Open</Button>} />
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Edit profile</SheetTitle>
//           <SheetDescription>
//             Make changes to your profile here. Click save when you&apos;re done.
//           </SheetDescription>
//         </SheetHeader>
//         <div className="grid flex-1 auto-rows-min gap-6 px-4">
//           <div className="grid gap-3">
//             <Label htmlFor="sheet-demo-name">Name</Label>
//             <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
//           </div>
//           <div className="grid gap-3">
//             <Label htmlFor="sheet-demo-username">Username</Label>
//             <Input id="sheet-demo-username" defaultValue="@peduarte" />
//           </div>
//         </div>
//         <SheetFooter>
//           <Button type="submit">Save changes</Button>
//           <SheetClose render={<Button variant="outline">Close</Button>} />
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   )
// }
