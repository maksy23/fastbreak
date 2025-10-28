'use server'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse } from '@/types/action-response.types'
import { Venue } from '@/types/database'

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
