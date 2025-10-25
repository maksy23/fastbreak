import { Database } from './database.types'

// Helper types for cleaner usage
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Specific types for our app entities
export type Event = Tables<'events'>
export type Venue = Tables<'venues'>
export type EventVenue = Tables<'event_venues'>

// Type for event with its venues joined (for display purposes)
export type EventWithVenues = Event & {
  venues: Venue[]
}

// Re-export the Database type
export type { Database }
