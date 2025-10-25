'use client'

import { StoreProvider } from 'easy-peasy'
import React from 'react'

import store from '../store/useStore'

export default function EasyPeasyProvider({ children }: { children: React.ReactNode }) {
  return <StoreProvider store={store}>{children}</StoreProvider>
}
