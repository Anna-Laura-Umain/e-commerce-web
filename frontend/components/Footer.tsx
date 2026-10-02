import Link from 'next/link'

type FooterLink = {
  label: string
  href: string
}

const footerLinks: FooterLink[] = [
  { label: "Anna Baidikova", href: "#" },
  { label: "Laura Lundin", href: "#" },
] 
// just suggestion

export default function Footer() {
  return (
    <footer className="bg-gray-50 relative">
      <div className="absolute inset-0 bg-mauve-500 bg-size-[17px] opacity-20 bg-position-[0_1]" />
      <div className="container relative">
        <div className="flex flex-col justify-between py-28 lg:flex-row">
          <h3 className="mb-10 text-center text-base font-mono leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left">
            Built with Sanity + Next.js.
          </h3>
            <ul className='flex gap-6 flex-wrap'>
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </ul>
        </div>
      </div>
  

    </footer>
  )
}
