import { ActionResponse } from '@/types/action-response.types'

/**
 * Handles errors in Server Actions with consistent format
 */
export function handleError(error: unknown): ActionResponse<never> {
  if (process.env.NODE_ENV === 'development') {
    console.error('Server Action error:', error)
  }

  if (error instanceof Error) {
    return {
      success: false,
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'An error occurred. Please try again.',
    }
  }

  return {
    success: false,
    error: 'An unexpected error occurred',
  }
}

/**
 * Wraps successful data in ActionResponse format
 */
export function handleSuccess<T>(data: T): ActionResponse<T> {
  return {
    success: true,
    data,
  }
}
