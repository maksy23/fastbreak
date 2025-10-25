import { LoginForm } from '@/components/login-form/login-form'
import SoccerBallAndCleatImage from '@/images/soccer-ball-and-cleat.jpg'

import { AuthPageLayout } from '../layout'

export default function LoginPage() {
  return (
    <AuthPageLayout backgroundImage={SoccerBallAndCleatImage}>
      <LoginForm />
    </AuthPageLayout>
  )
}
