import { UpdatePasswordForm } from '@/components/forms/auth-forms/update-password-form/index'
import TennisImage from '@/images/tennis.jpg'

import { AuthPageLayout } from '../layout'

export default function UpdatePasswordPage() {
  return (
    <AuthPageLayout backgroundImage={TennisImage}>
      <UpdatePasswordForm />
    </AuthPageLayout>
  )
}
