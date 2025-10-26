import { Suspense } from 'react'

import { LoginForm } from '@/components/forms/auth-forms/login-form'
import SoccerImage from '@/images/soccer.jpg'

import { AuthPageLayout } from '../layout'

function LoginContent() {
  return <LoginForm />
}

export default function LoginPage() {
  return (
    <AuthPageLayout backgroundImage={SoccerImage}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </AuthPageLayout>
  )
}
