'use client'

import EasyPeasyProvider from './StoreProvider'

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return <EasyPeasyProvider>{children}</EasyPeasyProvider>
}
