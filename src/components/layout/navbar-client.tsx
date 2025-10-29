'use client'

import { User } from '@supabase/supabase-js'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/base/button'
import { VolleyballIcon } from '@/images/icons/volleyball'

import { MobileNav } from './mobile-nav'
import { UserNav } from './user-nav'

interface NavbarClientProps {
  user: User | null
}

export function NavbarClient({ user }: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='bg-primary sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container flex h-14 items-center'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center gap-1.5 font-medium'
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className='text-primary-foreground flex size-6 items-center justify-center rounded-md bg-white'>
            <VolleyballIcon className='size-4' />
          </div>
          <span className='font-bold'>FastBreak</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='ml-6 hidden items-center gap-6 text-sm md:flex'>
          <Link
            href='/'
            className='hover:text-foreground/80 text-foreground/60 transition-colors'
          >
            Home
          </Link>
          {user && (
            <Link
              href='/dashboard'
              className='hover:text-foreground/80 text-foreground/60 transition-colors'
            >
              Dashboard
            </Link>
          )}
          <Link
            href='/about'
            className='hover:text-foreground/80 text-foreground/60 transition-colors'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='hover:text-foreground/80 text-foreground/60 transition-colors'
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className='ml-auto hidden items-center gap-2 md:flex'>
          {user ? (
            <UserNav user={user} />
          ) : (
            <div className='flex items-center gap-2'>
              <Button
                asChild
                variant='ghost'
                size='sm'
              >
                <Link href='/login'>Login</Link>
              </Button>
              <Button
                asChild
                size='sm'
              >
                <Link href='/signup'>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='ml-auto flex items-center md:hidden'>
          <Button
            variant='ghost'
            size='sm'
            className='h-9 w-9 p-0'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'
          >
            {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        user={user}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  )
}
