'use client'

import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteEvent } from '@/actions/events'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/base/alert-dialog'
import { Button } from '@/components/base/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/base/card'
import { EventWithVenues } from '@/types/database'

interface EventCardProps {
  event: EventWithVenues
}

export function EventCard({ event }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setIsDeleting(true)
    const result = await deleteEvent(event.id)

    if (result.success) {
      toast.success('Event deleted successfully')
      setShowDeleteDialog(false)
    } else {
      toast.error(result.error)
    }

    setIsDeleting(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>{event.sport_type}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div>
            <p className='text-sm font-medium'>Date & Time</p>
            <p className='text-muted-foreground text-sm'>
              {format(new Date(event.date_time), 'PPp')}
            </p>
          </div>

          {event.description && (
            <div>
              <p className='text-sm font-medium'>Description</p>
              <p className='text-muted-foreground text-sm'>{event.description}</p>
            </div>
          )}

          {event.venues.length > 0 && (
            <div>
              <p className='text-sm font-medium'>Venues</p>
              <ul className='text-muted-foreground text-sm'>
                {event.venues.map((venue) => (
                  <li key={venue.id}>
                    {venue.name} {venue.location && `- ${venue.location}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className='gap-2'>
          <Button
            variant='outline'
            onClick={() => router.push(`/dashboard/events/${event.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant='destructive'
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`This will permanently delete the event "${event.name}". This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
