'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse } from '@/types/action-response.types'
import { Inserts, Updates, Venue } from '@/types/database'

export async function getVenues(): Promise<ActionResponse<Venue[]>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from('venues').select('*').order('name')

    if (error) throw error

    return { success: true, data: data || [] }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch venues',
    }
  }
}

export async function createVenue(
  venueData: Omit<Inserts<'venues'>, 'user_id'>,
): Promise<ActionResponse<Venue>> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data: venue, error } = await supabase
      .from('venues')
      .insert({ ...venueData, user_id: user.id })
      .select()
      .single()

    if (error) throw error

    revalidatePath('/dashboard/events/new')
    revalidatePath('/dashboard/events/[id]/edit')
    return { success: true, data: venue }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create venue',
    }
  }
}

export async function updateVenue(
  venueId: string,
  venueData: Omit<Updates<'venues'>, 'user_id'>,
): Promise<ActionResponse<Venue>> {
  try {
    const supabase = await createClient()

    const { data: venue, error } = await supabase
      .from('venues')
      .update(venueData)
      .eq('id', venueId)
      .select()
      .single()

    if (error) throw error

    revalidatePath('/dashboard/events/new')
    revalidatePath('/dashboard/events/[id]/edit')
    return { success: true, data: venue }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update venue',
    }
  }
}

export async function deleteVenue(venueId: string): Promise<ActionResponse<void>> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('venues').delete().eq('id', venueId)

    if (error) throw error

    revalidatePath('/dashboard/events/new')
    revalidatePath('/dashboard/events/[id]/edit')
    return { success: true, data: undefined }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete venue',
    }
  }
}
