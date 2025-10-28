'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { ActionResponse } from '@/types/action-response.types'
import { EventWithVenues, Inserts, Updates } from '@/types/database'

export async function getEvents(
  searchTerm?: string,
  sportType?: string,
): Promise<ActionResponse<EventWithVenues[]>> {
  try {
    const supabase = await createClient()

    let query = supabase
      .from('events')
      .select(
        `
        *,
        event_venues (
          venue_id,
          venues (*)
        )
      `,
      )
      .order('date_time', { ascending: true })

    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`)
    }

    if (sportType && sportType !== 'all') {
      query = query.eq('sport_type', sportType)
    }

    const { data, error } = await query

    if (error) throw error

    // Transform the data to match EventWithVenues type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventsWithVenues: EventWithVenues[] = (data || []).map((event: any) => ({
      ...event,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      venues: event.event_venues?.map((ev: any) => ev.venues).filter(Boolean) || [],
    }))

    return { success: true, data: eventsWithVenues }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events',
    }
  }
}

export async function getEventById(eventId: string): Promise<ActionResponse<EventWithVenues>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('events')
      .select(
        `
        *,
        event_venues (
          venue_id,
          venues (*)
        )
      `,
      )
      .eq('id', eventId)
      .single()

    if (error) throw error
    if (!data) throw new Error('Event not found')

    const eventWithVenues: EventWithVenues = {
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      venues: data.event_venues?.map((ev: any) => ev.venues).filter(Boolean) || [],
    }

    return { success: true, data: eventWithVenues }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch event',
    }
  }
}

export async function createEvent(
  eventData: Omit<Inserts<'events'>, 'user_id'>,
  venueIds: string[],
): Promise<ActionResponse<string>> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Insert event
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({ ...eventData, user_id: user.id })
      .select()
      .single()

    if (eventError) throw eventError

    // Insert event-venue relationships
    if (venueIds.length > 0) {
      const eventVenues = venueIds.map((venueId) => ({
        event_id: event.id,
        venue_id: venueId,
      }))

      const { error: junctionError } = await supabase.from('event_venues').insert(eventVenues)

      if (junctionError) throw junctionError
    }

    revalidatePath('/dashboard')
    return { success: true, data: event.id }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create event',
    }
  }
}

export async function updateEvent(
  eventId: string,
  eventData: Omit<Updates<'events'>, 'user_id'>,
  venueIds: string[],
): Promise<ActionResponse<void>> {
  try {
    const supabase = await createClient()

    // Update event
    const { error: eventError } = await supabase.from('events').update(eventData).eq('id', eventId)

    if (eventError) throw eventError

    // Delete existing venue relationships
    const { error: deleteError } = await supabase
      .from('event_venues')
      .delete()
      .eq('event_id', eventId)

    if (deleteError) throw deleteError

    // Insert new venue relationships
    if (venueIds.length > 0) {
      const eventVenues = venueIds.map((venueId) => ({
        event_id: eventId,
        venue_id: venueId,
      }))

      const { error: junctionError } = await supabase.from('event_venues').insert(eventVenues)

      if (junctionError) throw junctionError
    }

    revalidatePath('/dashboard')
    return { success: true, data: undefined }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update event',
    }
  }
}

export async function deleteEvent(eventId: string): Promise<ActionResponse<void>> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('events').delete().eq('id', eventId)

    if (error) throw error

    revalidatePath('/dashboard')
    return { success: true, data: undefined }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete event',
    }
  }
}
