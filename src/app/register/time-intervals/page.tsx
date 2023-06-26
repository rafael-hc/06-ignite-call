import { Metadata } from 'next'
import { TimeIntervalsForm } from './components/TimeIntervalsForm'

export const metadata: Metadata = {
  title: 'Selecione sua disponibilidade | Ignite Call',
  description:
    'Você deve selecionar os dias e os horários disponíveis em sua agenda.',
  robots: {
    index: true,
  },
}

export default function TimeIntervals() {
  return <TimeIntervalsForm />
}
