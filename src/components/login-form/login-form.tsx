'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/actions/auth.actions'
import { Button } from '@/components/base/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/base/field'
import { Input } from '@/components/base/input'
import { cn } from '@/lib/utils/utils'

// Define validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

type LoginFormProps = {
  className?: string
}

export function LoginForm({ className }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Setup React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)

    const result = await signIn(values.email, values.password)

    setIsLoading(false)

    if (result.success) {
      toast.success('Logged in successfully!')
      router.push('/dashboard')
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
    >
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email below to login to your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            id='email'
            type='email'
            placeholder='m@example.com'
            disabled={isLoading}
            {...register('email')}
          />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </Field>

        <Field>
          <div className='flex items-center'>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Link
              href='/password'
              className='ml-auto text-sm underline-offset-4 hover:underline'
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            disabled={isLoading}
            {...register('password')}
          />
          {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        </Field>

        <Field>
          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Field>

        <Field>
          <FieldDescription className='text-center'>
            Don&apos;t have an account?{' '}
            <Link
              href='/signup'
              className='underline underline-offset-4'
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
