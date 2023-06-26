import { prisma } from '@/lib/prisma'
import { Header } from './components/Header'
import { notFound } from 'next/navigation'
import { ScheduleForm } from './components/ScheduleForm'
import { Metadata, ResolvingMetadata } from 'next'

interface ScheduleProps {
  params: { username: string }
}
export async function generateMetadata(
  { params }: ScheduleProps,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  const username = params.username

  return {
    title: `Agendar com ${username} | Ignite Call`,
  }
}

export async function generateStaticParams() {
  const user = await prisma.user.findUnique({
    where: {
      username: 'rafael-hc',
    },
  })

  if (!user) {
    return notFound()
  }
  return []
}

export const revalidate = 60 * 60 * 24 // 1 day

export default async function Schedule({ params }: ScheduleProps) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username: params.username,
    },
    select: {
      name: true,
      bio: true,
      avatar_url: true,
    },
  })
  return (
    <main className="mx-auto mb-4 mt-20 max-w-[852px] px-4">
      <Header user={user} />
      <ScheduleForm />
    </main>
  )
}
