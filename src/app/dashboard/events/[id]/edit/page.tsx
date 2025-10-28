import { notFound } from 'next/navigation'

import { getEventById } from '@/actions/events'
import { getVenues } from '@/actions/venues'
import { EventForm } from '@/components/events/event-form'

interface EditEventPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params

  const [eventResult, venuesResult] = await Promise.all([getEventById(id), getVenues()])

  if (!eventResult.success) {
    notFound()
  }

  if (!venuesResult.success) {
    return <p className='text-red-500'>{venuesResult.error}</p>
  }

  return (
    <div className='container mx-auto max-w-2xl py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Edit Event</h1>
      <EventForm
        venues={venuesResult.data}
        initialData={eventResult.data}
      />
    </div>
  )
}
