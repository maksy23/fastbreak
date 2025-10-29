import Link from 'next/link'

export function Footer() {
  return (
    <footer className='border-t'>
      <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          <p className='text-muted-foreground text-center text-sm leading-loose md:text-left'>
            Built with Next.js, TypeScript, and Supabase. © {new Date().getFullYear()} FastBreak.
          </p>
        </div>
        <div className='flex gap-4'>
          <Link
            href='/about'
            className='text-muted-foreground hover:text-foreground text-sm transition-colors'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='text-muted-foreground hover:text-foreground text-sm transition-colors'
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
