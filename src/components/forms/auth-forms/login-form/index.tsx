'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/actions/auth.actions'
import { Button } from '@/components/base/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/base/form'
import { Input } from '@/components/base/input'
import { cn } from '@/lib/utils/utils'

// Define validation schema
const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

type LoginFormProps = {
  className?: string
}

export function LoginForm({ className }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'auth_error') {
      toast.error('Authentication link expired or invalid. Please try again.')
    }
  }, [searchParams])

  // Setup React Hook Form with Zod validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)

    const result = await signIn(values.email, values.password)

    setIsLoading(false)

    if (result.success) {
      toast.success('Logged in successfully!')
      router.push('/')
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
      >
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-1 text-center'>
            <h1 className='text-2xl font-bold'>Login to your account</h1>
            <p className='text-muted-foreground text-sm text-balance'>
              Enter your email below to login to your account
            </p>
          </div>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='m@example.com'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel>Password</FormLabel>
                  <Link
                    href='/password-reset'
                    className='ml-auto text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='••••••••'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className='text-muted-foreground text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              href='/signup'
              className='underline underline-offset-4'
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}
