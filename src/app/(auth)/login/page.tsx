import Image from 'next/image'

import { LoginForm } from '@/components/login-form/login-form'
import { VolleyballIcon } from '@/Images/icons/volleyball'
import SoccerBallAndCleatImage from '@/images/soccer-ball-and-cleat.jpg'

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <div className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <VolleyballIcon className='size-4' />
            </div>
            FastBreak
          </div>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <Image
          src={SoccerBallAndCleatImage}
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  )
}
