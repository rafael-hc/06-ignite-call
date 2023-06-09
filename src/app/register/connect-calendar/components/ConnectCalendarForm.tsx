'use client'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { Box, Button, Heading, MultiStep, Text } from '@rhcode/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

interface ConnectCalendarFormProps {
  error: string
}

export function ConnectCalendarForm({ error }: ConnectCalendarFormProps) {
  const session = useSession()

  const isSignedIn = session.status === 'authenticated'

  const hasAuthError = !!error

  const router = useRouter()

  async function handleConnectCalendar(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    await signIn('google')
  }
  function handleNavigateToNextStep(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    router.push('/register/time-intervals')
  }

  return (
    <>
      <div className="px-4 py-0">
        <Heading className="leading-base">Conecte sua agenda!</Heading>
        <Text className="mb-6 text-gray-200">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </div>
      <Box className="mt-6">
        <form className="flex flex-col">
          <div className="mb-4 flex items-center justify-between rounded-sm border border-gray-600 px-6 py-4">
            <Text>Google Agenda</Text>
            {isSignedIn ? (
              <Button size="sm" onClick={handleConnectCalendar} disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </div>
          {hasAuthError && (
            <Text className="mb-2 text-red-500" size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar
            </Text>
          )}
          <Button
            size="sm"
            type="submit"
            variant="primary"
            disabled={!isSignedIn}
            onClick={handleNavigateToNextStep}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </form>
      </Box>
    </>
  )
}
