'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { signUp } from '@/actions/auth.actions'
import { Button } from '@/components/base/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/base/field'
import { Input } from '@/components/base/input'
import { cn } from '@/lib/utils/utils'

// Define validation schema
const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .refine(
        (value) => value.trim().split(/\s+/).length >= 2,
        'Please enter both first and last name',
      ),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignupFormValues = z.infer<typeof signupSchema>

type SignupFormProps = {
  className?: string
}

export function SignupForm({ className }: SignupFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Setup React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true)

    const result = await signUp(values.fullName, values.email, values.password)

    setIsLoading(false)

    if (result.success) {
      toast.success('Account created successfully!')
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
          <h1 className='text-2xl font-bold'>Create your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor='fullName'>Full Name</FieldLabel>
          <Input
            id='fullName'
            type='text'
            placeholder='John Doe'
            disabled={isLoading}
            {...register('fullName')}
          />
          {errors.fullName && <p className='text-sm text-red-500'>{errors.fullName.message}</p>}
        </Field>

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
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email with anyone else.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input
            id='password'
            type='password'
            disabled={isLoading}
            {...register('password')}
          />
          {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
          <Input
            id='confirmPassword'
            type='password'
            disabled={isLoading}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>
          )}
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>

        <Field>
          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </Field>

        <Field>
          <FieldDescription className='px-6 text-center'>
            Already have an account? <Link href='/login'>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
