'use client'

import { User } from '@supabase/supabase-js'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { signOut } from '@/actions/auth.actions'
import { Avatar, AvatarFallback } from '@/components/base/avatar'
import { Button } from '@/components/base/button'
import { Separator } from '@/components/base/separator'

interface MobileNavProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ user, isOpen, onClose }: MobileNavProps) {
  const handleLogout = async () => {
    const result = await signOut()
    if (!result?.success) {
      toast.error(result?.error || 'Failed to logout')
    } else {
      onClose()
    }
  }

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  if (!isOpen) return null

  return (
    <div className='bg-primary border-t md:hidden'>
      <div className='container space-y-4 py-4'>
        {/* User Info Section */}
        {user && (
          <>
            <div className='flex items-center gap-3 px-2'>
              <Avatar className='h-10 w-10'>
                <AvatarFallback className='bg-primary-foreground text-primary'>
                  {getInitials(user.email || 'U')}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <p className='text-sm font-medium'>Account</p>
                <p className='text-foreground/60 text-xs'>{user.email}</p>
              </div>
            </div>
            <Separator className='bg-foreground/10' />
          </>
        )}

        {/* Navigation Links */}
        <nav className='flex flex-col space-y-1'>
          <Link
            href='/'
            className='hover:bg-foreground/5 rounded-md px-3 py-2 text-sm font-medium transition-colors'
            onClick={onClose}
          >
            Home
          </Link>
          {user && (
            <Link
              href='/dashboard'
              className='hover:bg-foreground/5 rounded-md px-3 py-2 text-sm font-medium transition-colors'
              onClick={onClose}
            >
              Dashboard
            </Link>
          )}
          <Link
            href='/about'
            className='hover:bg-foreground/5 rounded-md px-3 py-2 text-sm font-medium transition-colors'
            onClick={onClose}
          >
            About
          </Link>
          <Link
            href='/contact'
            className='hover:bg-foreground/5 rounded-md px-3 py-2 text-sm font-medium transition-colors'
            onClick={onClose}
          >
            Contact
          </Link>
        </nav>

        {/* Auth Section */}
        {user ? (
          <>
            <Separator className='bg-foreground/10' />
            <Button
              variant='ghost'
              className='w-full justify-start px-3'
              onClick={handleLogout}
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </Button>
          </>
        ) : (
          <>
            <Separator className='bg-foreground/10' />
            <div className='flex flex-col gap-2'>
              <Button
                asChild
                variant='outline'
                className='w-full'
              >
                <Link
                  href='/login'
                  onClick={onClose}
                >
                  Login
                </Link>
              </Button>
              <Button
                asChild
                className='w-full'
              >
                <Link
                  href='/signup'
                  onClick={onClose}
                >
                  Sign Up
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
