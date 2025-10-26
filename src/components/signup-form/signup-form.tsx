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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/base/form'
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
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
      >
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-1 text-center'>
            <h1 className='text-2xl font-bold'>Create your account</h1>
            <p className='text-muted-foreground text-sm text-balance'>
              Fill in the form below to create your account
            </p>
          </div>

          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='John Doe'
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
                <FormDescription>
                  We&apos;ll use this to contact you. We will not share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Must be at least 8 characters long.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please confirm your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>

          <p className='text-muted-foreground px-6 text-center text-sm'>
            Already have an account? <Link href='/login'>Sign in</Link>
          </p>
        </div>
      </form>
    </Form>
  )
}
