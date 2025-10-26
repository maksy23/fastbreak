'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { handleError, handleSuccess } from '@/lib/utils/action-helpers'
import { ActionResponse } from '@/types/action-response.types'

export async function signUp(
  fullName: string,
  email: string,
  password: string,
): Promise<ActionResponse<{ email: string }>> {
  try {
    const supabase = await createClient()

    // Check if user is already authenticated and sign them out
    const {
      data: { user: existingUser },
    } = await supabase.auth.getUser()

    if (existingUser) {
      await supabase.auth.signOut()
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error

    // KEY CHECK: If user exists but no session was created, email is already registered
    // Supabase returns user object but no session when email exists
    if (data.user && !data.session) {
      return {
        success: false,
        error:
          'This email is already registered. Please sign in instead or use the password reset option if you forgot your password.',
      }
    }

    if (!data.user || !data.user.email) {
      throw new Error('Failed to create user')
    }

    revalidatePath('/', 'layout')

    return handleSuccess({ email: data.user.email })
  } catch (error) {
    return handleError(error)
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<ActionResponse<{ email: string }>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    if (!data.user || !data.user.email) {
      throw new Error('Failed to sign in')
    }

    revalidatePath('/', 'layout')

    return handleSuccess({ email: data.user.email })
  } catch (error) {
    return handleError(error)
  }
}

export async function signOut(): Promise<ActionResponse> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) throw error

    revalidatePath('/', 'layout')
    redirect('/login')
  } catch (error) {
    return handleError(error)
  }
}

// TODO: Test and hook it up at the end
export async function resetPassword(email: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/update-password`,
    })

    if (error) throw error

    return handleSuccess(undefined)
  } catch (error) {
    return handleError(error)
  }
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
