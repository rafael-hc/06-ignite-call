import { Metadata } from 'next'
import { ConnectCalendarForm } from './components/ConnectCalendarForm'

export const metadata: Metadata = {
  title: 'Conecte sua agenda do Google | Ignite Call',
  robots: {
    index: true,
  },
}

interface ConnectCalendarProps {
  searchParams: { error: string }
}

export default function ConnectCalendar({
  searchParams,
}: ConnectCalendarProps) {
  return <ConnectCalendarForm error={searchParams.error} />
}
