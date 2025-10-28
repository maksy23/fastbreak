'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { resetPassword } from '@/actions/auth.actions'
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
const passwordResetSchema = z.object({
  email: z.email('Invalid email address'),
})

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>

type PasswordResetFormProps = {
  className?: string
}

export function PasswordResetForm({ className }: PasswordResetFormProps) {
  // Local state
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Setup React Hook Form with Zod validation
  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: PasswordResetFormValues) {
    setIsLoading(true)

    const result = await resetPassword(values.email)

    setIsLoading(false)

    if (result.success) {
      setIsSuccess(true)
      toast.success('Password reset email sent! Check your inbox.')
    } else {
      toast.error(result.error)
    }
  }

  if (isSuccess) {
    return (
      <div className={cn('flex flex-col gap-6', className)}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-1 text-center'>
            <h1 className='text-2xl font-bold'>Check your email</h1>
            <p className='text-muted-foreground text-sm text-balance'>
              We&apos;ve sent you a password reset link. Please check your email and follow the
              instructions to reset your password.
            </p>
          </div>

          <Button
            onClick={() => setIsSuccess(false)}
            variant='outline'
          >
            Send another email
          </Button>

          <p className='text-muted-foreground text-center text-sm'>
            Remember your password?{' '}
            <Link
              href='/login'
              className='underline underline-offset-4'
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
      >
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-1 text-center'>
            <h1 className='text-2xl font-bold'>Reset your password</h1>
            <p className='text-muted-foreground text-sm text-balance'>
              Enter your email address and we&apos;ll send you a link to reset your password
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

          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send reset link'}
          </Button>

          <p className='text-muted-foreground text-center text-sm'>
            Remember your password?{' '}
            <Link
              href='/login'
              className='underline underline-offset-4'
            >
              Back to login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}
