import { ActionResponse } from '@/types/action-response.types'

/**
 * Handles errors in Server Actions with consistent format
 */
export function handleError(error: unknown): ActionResponse<never> {
  console.error('Server Action error:', error)

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
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
