import { getServerSession } from 'next-auth'
import { UpdateProfileForm } from './components/UpdateProfileForm'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function UpdateProfile() {
  const session = await getServerSession(authOptions)

  return (
    <UpdateProfileForm
      avatarUrl={session?.user.avatar_url!}
      name={session?.user.name!}
      username={session?.user.username!}
    />
  )
}
