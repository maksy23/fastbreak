'use client'

import React from 'react'
import store from '../store/useStore'
import { StoreProvider } from 'easy-peasy'

export default function EasyPeasyProvider({ children }: { children: React.ReactNode }) {
  return <StoreProvider store={store}>{children}</StoreProvider>
}
