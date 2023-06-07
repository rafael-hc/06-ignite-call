import previewImage from '../assets/preview.png'
import Image from 'next/image'
import { Hero } from '@/components/Hero'

export default function Home() {
  // function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   const formData = new FormData(event.currentTarget)
  //   console.log(formData)
  // }

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
