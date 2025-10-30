'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { handleError, handleSuccess } from '@/lib/utils/action-helpers'
import { env } from '@/lib/utils/env'
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

    // Handle errors from Supabase
    if (error) {
      // Check if it's a duplicate user error
      if (
        error.status === 422 ||
        error.message.toLowerCase().includes('already') ||
        error.message.toLowerCase().includes('exists')
      ) {
        return {
          success: false,
          error:
            'This email is already registered. Please sign in instead or use the password reset option if you forgot your password.',
        }
      }
      throw error
    }

    // Check if signup actually succeeded
    if (!data.user || !data.user.email || !data.session) {
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

    return handleSuccess(undefined)
  } catch (error) {
    return handleError(error)
  }
}

export async function resetPassword(email: string): Promise<ActionResponse> {
  const { siteUrl } = env

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback?next=/update-password`,
    })

    if (error) throw error

    return handleSuccess(undefined)
  } catch (error) {
    return handleError(error)
  }
}

export async function updatePassword(newPassword: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error

    revalidatePath('/', 'layout')

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
