'use client'
import { ArrowRight } from '@phosphor-icons/react'
import { Box, Button, Heading, MultiStep, Text } from '@rhcode/react'
import { signIn } from 'next-auth/react'

export default function ConnectCalendar({
  searchParams,
}: {
  searchParams: { username: string }
}) {
  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4 py-0">
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
          <div className="mb-2 flex items-center justify-between rounded-sm border border-gray-600 px-6 py-4">
            <Text>Google Agenda</Text>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          </div>
          <Button size="sm" type="submit" variant="primary">
            Próximo passo
            <ArrowRight />
          </Button>
        </form>
      </Box>
    </main>
  )
}
