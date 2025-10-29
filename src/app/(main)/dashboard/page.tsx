import Link from 'next/link'

import { getEvents } from '@/actions/events'
import { Button } from '@/components/base/button'
import { EventsList } from '@/components/events/events-list'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sport?: string }>
}) {
  const params = await searchParams
  const result = await getEvents(params.search, params.sport)

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Sports Events</h1>
        <Button asChild>
          <Link href='/dashboard/events/new'>Create Event</Link>
        </Button>
      </div>

      {result.success ? (
        <EventsList initialEvents={result.data} />
      ) : (
        <p className='text-red-500'>{result.error}</p>
      )}
    </div>
  )
}
