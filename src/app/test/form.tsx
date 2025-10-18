'use client'

import { useState } from 'react'
import { getWeatherInfo } from './action'
import { Button } from '@/components/base/button'
import { UseStoreState } from '@store/useStore'

export function Form() {
  const [result, setResult] = useState<string | null>(null)

  const appName = UseStoreState((state) => state.app.appName)

  async function handleSubmit(formData: FormData) {
    const res = await getWeatherInfo(formData)
    setResult(res)
  }

  return (
    <>
      <h2>Welcome to {appName}</h2>
      <form action={handleSubmit}>
        <input
          name='city'
          placeholder='Enter city'
          required
        />
        <Button type='submit'>Get Weather</Button>
      </form>
      {result && <pre>{result}</pre>}
    </>
  )
}
