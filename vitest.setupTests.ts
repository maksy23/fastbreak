// actions to run before each test file
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

// hooks are reset before each suite
afterEach(() => {
  cleanup()
})
