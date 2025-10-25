import { PasswordResetForm } from '@/components/password-reset-form/password-reset-form'
import FootballImage from '@/images/football.jpg'

import { AuthPageLayout } from '../layout'

export default function PasswordResetPage() {
  return (
    <AuthPageLayout backgroundImage={FootballImage}>
      <PasswordResetForm />
    </AuthPageLayout>
  )
}
