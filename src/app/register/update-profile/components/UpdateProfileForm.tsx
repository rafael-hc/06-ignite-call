'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import {
  Avatar,
  Box,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@rhcode/react'
import { useRouter } from 'next/navigation'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export function UpdateProfileForm({
  avatarUrl,
  name,
  username,
}: {
  avatarUrl: string
  name: string
  username: string
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/update-profile', data)

    await router.push(`/schedule/${username}`)
  }
  return (
    <>
      <div className="px-4 py-0">
        <Heading className="leading-base">Defina sua disponibilidade</Heading>
        <Text className="mb-6 text-gray-200">
          Por último, uma breve descrição e uma foto de perfil.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </div>
      <Box className="mt-6">
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="flex flex-col gap-4 [&_label]:flex [&_label]:flex-col [&_label]:gap-2"
        >
          <label>
            <Text>Foto de perfil</Text>
            <Avatar src={avatarUrl} alt={name} />
          </label>
          <label>
            <Text>Sobre Você</Text>
            <TextArea {...register('bio')} />
            <Text size="sm" className="text-gray-200">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </Text>
          </label>
          <Button
            size="sm"
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            Finalizar
            <ArrowRight />
          </Button>
        </form>
      </Box>
    </>
  )
}
