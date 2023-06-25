import { FormError } from '@/components/FormError'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
import { Box, Button, Text, TextArea, TextInput } from '@rhcode/react'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmScheduleSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmScheduleData = z.infer<typeof confirmScheduleSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmScheduleData>({
    resolver: zodResolver(confirmScheduleSchema),
  })
  const { username } = useParams()

  async function handleConfirmSchedule(data: ConfirmScheduleData) {
    const { name, email, observations } = data
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')
  return (
    <Box className="mx-auto mb-0 mt-6 max-w-[540px]">
      <form
        onSubmit={handleSubmit(handleConfirmSchedule)}
        className="flex flex-col gap-4"
      >
        <div className="mb-2 flex items-center gap-4 border-b border-b-gray-600 pb-6">
          <Text className="flex items-center gap-2">
            <CalendarBlank className="h-5 w-5 text-gray-200" />
            {describedDate}
          </Text>
          <Text className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-200" />
            {describedTime}
          </Text>
        </div>
        <label className="flex flex-col gap-2">
          <Text>Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </label>
        <label className="flex flex-col gap-2">
          <Text>Endereço de e-mail</Text>
          <TextInput
            type="email"
            placeholder="Seu e-mail"
            {...register('email')}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </label>
        <label className="flex flex-col gap-2">
          <Text>Observações</Text>
          <TextArea {...register('observations')} />
        </label>
        <div className="mt-2 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="tertiary"
            onClick={onCancelConfirmation}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Confirmar
          </Button>
        </div>
      </form>
    </Box>
  )
}
