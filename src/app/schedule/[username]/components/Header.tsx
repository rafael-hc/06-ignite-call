'use client'
import { Avatar, Heading, Text } from '@rhcode/react'

interface HeaderProps {
  user: {
    name: string
    bio: string | null
    avatar_url: string | null
  }
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <Avatar src={user.avatar_url || ''} />
      <Heading as="h1" className="mt-2 font-semibold leading-base">
        {user.name}
      </Heading>
      <Text className="text-gray-200">{user.bio}</Text>
    </div>
  )
}
