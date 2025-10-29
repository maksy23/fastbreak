import { getUser } from '@/actions/auth.actions'

import { NavbarClient } from './navbar-client'

export async function Navbar() {
  const user = await getUser()

  return <NavbarClient user={user} />
}
