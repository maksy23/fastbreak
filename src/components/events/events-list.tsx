'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { Input } from '@/components/base/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/base/select'
import { EventWithVenues } from '@/types/database'

import { EventCard } from './event-card'

interface EventsListProps {
  initialEvents: EventWithVenues[]
}

const SPORT_TYPES = ['all', 'Soccer', 'Basketball', 'Tennis', 'Baseball', 'Football']

export function EventsList({ initialEvents }: EventsListProps) {
  const [search, setSearch] = useState('')
  const [sport, setSport] = useState('all')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSearch = (value: string) => {
    setSearch(value)
    startTransition(() => {
      const params = new URLSearchParams()
      if (value) params.set('search', value)
      if (sport !== 'all') params.set('sport', sport)
      router.push(`/dashboard?${params.toString()}`)
    })
  }

  const handleSportChange = (value: string) => {
    setSport(value)
    startTransition(() => {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (value !== 'all') params.set('sport', value)
      router.push(`/dashboard?${params.toString()}`)
    })
  }

  return (
    <div className='space-y-6'>
      <div className='flex gap-4'>
        <Input
          placeholder='Search events...'
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className='max-w-sm'
        />
        <Select
          value={sport}
          onValueChange={handleSportChange}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Sport type' />
          </SelectTrigger>
          <SelectContent>
            {SPORT_TYPES.map((type) => (
              <SelectItem
                key={type}
                value={type}
              >
                {type === 'all' ? 'All Sports' : type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isPending && <p className='text-muted-foreground'>Loading...</p>}

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {initialEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>

      {initialEvents.length === 0 && (
        <p className='text-muted-foreground py-8 text-center'>No events found</p>
      )}
    </div>
  )
}
