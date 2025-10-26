import { SignupForm } from '@/components/forms/auth-forms/signup-form/index'
import BasketballImage from '@/images/basketball.jpg'

import { AuthPageLayout } from '../layout'

export default function SignupPage() {
  return (
    <AuthPageLayout backgroundImage={BasketballImage}>
      <SignupForm />
    </AuthPageLayout>
  )
}
