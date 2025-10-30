'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { createVenue, updateVenue } from '@/actions/venues'
import { Button } from '@/components/base/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/base/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/base/form'
import { Input } from '@/components/base/input'
import { Venue } from '@/types/database'

const venueFormSchema = z.object({
  name: z.string().min(1, 'Venue name is required'),
  location: z.string().optional(),
  capacity: z.number().int().positive().nullish(),
})

type VenueFormValues = z.infer<typeof venueFormSchema>

interface VenueFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (venue: Venue) => void
  initialData?: Venue
}

export function VenueFormModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: VenueFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!initialData

  const form = useForm<VenueFormValues>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          location: initialData.location || '',
          capacity: initialData.capacity || null,
        }
      : {
          name: '',
          location: '',
          capacity: null,
        },
  })

  async function onSubmit(data: VenueFormValues) {
    setIsSubmitting(true)

    const result = isEditMode ? await updateVenue(initialData.id, data) : await createVenue(data)

    if (result.success) {
      toast.success(isEditMode ? 'Venue updated successfully!' : 'Venue created successfully!')
      form.reset()
      onOpenChange(false)
      if (onSuccess && result.data) {
        onSuccess(result.data)
      }
    } else {
      toast.error(result.error)
    }

    setIsSubmitting(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Venue' : 'Add New Venue'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Update venue information.' : 'Add a new venue to use in your events.'}
          </DialogDescription>
        </DialogHeader>
        {/* Remove the generic type from Form - just use <Form> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Madison Square Garden'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='New York, NY'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='capacity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='20000'
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value === '' ? null : parseInt(value))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEditMode
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditMode
                    ? 'Update'
                    : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
