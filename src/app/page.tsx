import previewImage from '../assets/preview.png'
import Image from 'next/image'
import { Hero } from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Descomplique sua agenda | Ignite Call',
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.',
}

export default function Home() {
  return (
    <main className="ml-auto flex h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center gap-20">
      <Hero />
      <div className="hidden overflow-hidden p-8 sm:block">
        <Image
          src={previewImage}
          alt="Calendário simbolizando a aplicação em funcionamento"
          width={800}
          height={400}
          className="max-w-none object-cover"
          quality={100}
          priority
        />
      </div>
    </main>
  )
}
