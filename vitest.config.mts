import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setupTests.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      // Exclude files as needed that will not need to be tracked for coverage (i.e images, types, etc.)
      exclude: ['**/node_modules/**', '**/*.d.ts', '**/coverage/**', '**/public/**', '*.*'],
    },
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/public/**'],
  },
})
