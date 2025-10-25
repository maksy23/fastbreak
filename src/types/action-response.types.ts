// Generic action response type for consistent error handling
export type ActionResponse<T = void> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }
