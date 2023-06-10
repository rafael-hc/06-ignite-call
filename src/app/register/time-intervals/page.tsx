import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import { Box, Button, Heading, MultiStep, Text, TextInput } from '@rhcode/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O username deve ter pelo menos 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O username pode ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O username deve ter pelo menos 3 caracteres' }),
})

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TimeIntervalsFormData>({
    resolver: zodResolver(timeIntervalsFormSchema),
  })

  async function handleRegister(data: TimeIntervalsFormData) {}

  return (
    <>
      <div className="px-4 py-0">
        <Heading className="leading-base">Bem-vindo ao Ignite Call!</Heading>
        <Text className="mb-6 text-gray-200">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </div>
      <Box className="mt-6">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4"
        >
          <label className=" flex flex-col gap-2">
            <Text>Nome de usuário</Text>
            <TextInput
              type="text"
              prefix="cal.com/"
              placeholder="seu-usuario"
              {...register('username')}
            />
            {errors.username && (
              <Text className="absolute right-2 top-12 text-right text-xs text-red-400">
                {errors.username.message}
              </Text>
            )}
          </label>
          <label className="relative flex flex-col gap-2">
            <Text>Nome completo</Text>
            <TextInput
              type="text"
              placeholder="Seu nome"
              {...register('name')}
            />
            {errors.name && (
              <Text className="absolute right-2 top-12 text-right text-xs text-red-400">
                {errors.name.message}
              </Text>
            )}
          </label>
          <Button
            size="sm"
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </form>
      </Box>
    </>
  )
}
