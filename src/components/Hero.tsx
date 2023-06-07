'use client'
import { Heading, Text } from '@rhcode/react'
import { ClaimUsernameForm } from './ClaimUsernameForm'

export function Hero() {
  return (
    <div className="max-w-[480px]">
      <Heading as="h1" size="3xl" className="sm:text-7xl">
        Agendamento descomplicado
      </Heading>
      <Text size="xl" className="mt-2 text-gray-200">
        Conecte seu calendário e permita que as pessoas marquem agendamentos no
        seu tempo livre.
      </Text>
      <ClaimUsernameForm />
    </div>
  )
}
