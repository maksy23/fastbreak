import Image, { StaticImageData } from 'next/image'

import { VolleyballIcon } from '@/images/icons/volleyball'

interface AuthLayoutProps {
  children: React.ReactNode
  backgroundImage: StaticImageData
}

/**
 * Auth Page Layout - Form on the left, Image on the right
 * @param children - Form component
 * @param backgroundImage - Image to be displayed on the right
 * @returns Auth Page Layout component
 */
export function AuthPageLayout({ children, backgroundImage }: AuthLayoutProps) {
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
          <div className='w-full max-w-xs'>{children}</div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <Image
          src={backgroundImage}
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
