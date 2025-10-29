import { getVenues } from '@/actions/venues'
import { EventForm } from '@/components/events/event-form'

export default async function NewEventPage() {
  const venuesResult = await getVenues()

  return (
    <div className='container mx-auto max-w-2xl py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Create New Event</h1>
      {venuesResult.success ? (
        <EventForm venues={venuesResult.data} />
      ) : (
        <p className='text-red-500'>{venuesResult.error}</p>
      )}
    </div>
  )
}
