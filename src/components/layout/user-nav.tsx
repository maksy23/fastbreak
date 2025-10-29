'use client'

import { User } from '@supabase/supabase-js'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { signOut } from '@/actions/auth.actions'
import { Avatar, AvatarFallback } from '@/components/base/avatar'
import { Button } from '@/components/base/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/base/dropdown-menu'

interface UserNavProps {
  user: User
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await signOut()
    if (!result?.success) {
      toast.error(result?.error || 'Failed to logout')
    } else {
      router.push('/login')
      router.refresh()
    }
  }

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-9 w-9 rounded-full'
        >
          <Avatar className='h-9 w-9'>
            <AvatarFallback className='bg-primary-foreground text-primary'>
              {getInitials(user.email || 'U')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>Account</p>
            <p className='text-muted-foreground text-xs leading-none'>{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
