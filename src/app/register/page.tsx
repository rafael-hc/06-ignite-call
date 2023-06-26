import { Metadata } from 'next'
import { RegisterForm } from './components/RegisterForm'

export const metadata: Metadata = {
  title: 'Crie uma conta | Ignite Call',
}

export default function Register({
  searchParams,
}: {
  searchParams: { username: string }
}) {
  return <RegisterForm username={searchParams.username} />
}
