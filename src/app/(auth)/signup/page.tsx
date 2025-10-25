import { SignupForm } from '@/components/signup-form/signup-form'
import BasketballHoopImage from '@/images/basketball-hoop.jpg'

import { AuthPageLayout } from '../layout'

export default function SignupPage() {
  return (
    <AuthPageLayout backgroundImage={BasketballHoopImage}>
      <SignupForm />
    </AuthPageLayout>
  )
}
