'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { createEvent, updateEvent } from '@/actions/events'
import { Button } from '@/components/base/button'
import { Checkbox } from '@/components/base/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/base/form'
import { Input } from '@/components/base/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/base/select'
import { Textarea } from '@/components/base/textarea'
import { VenueList } from '@/components/venues/venue-list'
import { EventWithVenues, Venue } from '@/types/database'

const SPORT_TYPES = [
  'Soccer',
  'Basketball',
  'Tennis',
  'Baseball',
  'Football',
  'Hockey',
  'Volleyball',
]

const eventFormSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  sport_type: z.string().min(1, 'Sport type is required'),
  date_time: z.string().min(1, 'Date and time is required'),
  description: z.string().optional(),
  venue_ids: z.array(z.string()).min(1, 'At least one venue is required'),
})

type EventFormValues = z.infer<typeof eventFormSchema>

interface EventFormProps {
  venues: Venue[]
  initialData?: EventWithVenues
}

export function EventForm({ venues, initialData }: EventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!initialData

  // Format datetime for input (HTML datetime-local expects: YYYY-MM-DDTHH:mm)
  const formatDateTimeForInput = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "yyyy-MM-dd'T'HH:mm")
  }

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          sport_type: initialData.sport_type,
          date_time: formatDateTimeForInput(initialData.date_time),
          description: initialData.description || '',
          venue_ids: initialData.venues.map((v) => v.id),
        }
      : {
          name: '',
          sport_type: '',
          date_time: '',
          description: '',
          venue_ids: [],
        },
  })

  async function onSubmit(data: EventFormValues) {
    setIsSubmitting(true)

    const { venue_ids, ...eventData } = data

    const result = isEditMode
      ? await updateEvent(initialData.id, eventData, venue_ids)
      : await createEvent(eventData, venue_ids)

    if (result.success) {
      toast.success(isEditMode ? 'Event updated successfully!' : 'Event created successfully!')
      router.push('/dashboard')
    } else {
      toast.error(result.error)
    }

    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Championship Game'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='sport_type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a sport' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SPORT_TYPES.map((sport) => (
                    <SelectItem
                      key={sport}
                      value={sport}
                    >
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='date_time'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date & Time</FormLabel>
              <FormControl>
                <Input
                  type='datetime-local'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Event details...'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-y-4'>
          <VenueList
            venues={venues}
            onVenuesChange={() => router.refresh()}
          />

          <FormField
            control={form.control}
            name='venue_ids'
            render={() => (
              <FormItem>
                <div className='mb-4'>
                  <FormLabel>Select Venues for This Event</FormLabel>
                  <FormDescription>
                    Choose one or more venues where this event will take place
                  </FormDescription>
                </div>
                {venues.length > 0 ? (
                  venues.map((venue) => (
                    <FormField
                      key={venue.id}
                      control={form.control}
                      name='venue_ids'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={venue.id}
                            className='flex flex-row items-start space-y-0 space-x-3'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(venue.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, venue.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== venue.id),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {venue.name}
                              {venue.location && (
                                <span className='text-muted-foreground ml-2'>
                                  - {venue.location}
                                </span>
                              )}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))
                ) : (
                  <p className='text-muted-foreground text-sm'>
                    Add venues above to select them for this event.
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex gap-4'>
          <Button
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Event'
                : 'Create Event'}
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
