'use client'

import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteVenue } from '@/actions/venues'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/base/card'
import { Venue } from '@/types/database'

import { VenueFormModal } from './venue-form-modal'

interface VenueListProps {
  venues: Venue[]
  onVenuesChange?: () => void
}

export function VenueList({ venues, onVenuesChange }: VenueListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null)
  const [deletingVenueId, setDeletingVenueId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete(venueId: string) {
    setIsDeleting(true)
    const result = await deleteVenue(venueId)

    if (result.success) {
      toast.success('Venue deleted successfully')
      setDeletingVenueId(null)
      onVenuesChange?.()
    } else {
      toast.error(result.error)
    }

    setIsDeleting(false)
  }

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>Your Venues</h3>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Venue
          </Button>
        </div>

        {venues.length === 0 ? (
          <Card>
            <CardContent className='pt-6'>
              <div className='py-6 text-center'>
                <p className='text-muted-foreground mb-4'>
                  You don&apos;t have any venues yet. Add your first venue to get started!
                </p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Your First Venue
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2'>
            {venues.map((venue) => (
              <Card key={venue.id}>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base'>{venue.name}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  {venue.location && (
                    <p className='text-muted-foreground text-sm'>{venue.location}</p>
                  )}
                  {venue.capacity && (
                    <p className='text-muted-foreground text-sm'>
                      Capacity: {venue.capacity.toLocaleString()}
                    </p>
                  )}
                  <div className='flex gap-2 pt-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setEditingVenue(venue)}
                    >
                      <Pencil className='mr-1 h-3 w-3' />
                      Edit
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => setDeletingVenueId(venue.id)}
                    >
                      <Trash2 className='mr-1 h-3 w-3' />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <VenueFormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSuccess={() => onVenuesChange?.()}
      />

      <VenueFormModal
        open={!!editingVenue}
        onOpenChange={(open) => !open && setEditingVenue(null)}
        initialData={editingVenue || undefined}
        onSuccess={() => onVenuesChange?.()}
      />

      <AlertDialog
        open={!!deletingVenueId}
        onOpenChange={(open) => !open && setDeletingVenueId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this venue. Events using this venue will no longer be
              associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingVenueId && handleDelete(deletingVenueId)}
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
