import { Box, Button, Text, TextInput } from '@rhcode/react'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O username deve ter pelo menos 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O username pode ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)

    await route.push(`/register?username=${data.username}`)
  }

  return (
    <>
      <Box>
        <form
          onSubmit={handleSubmit(handleClaimUsername)}
          className="mt-4 grid grid-cols-1 gap-2 p-4 sm:grid-cols-[1fr_auto]"
        >
          <TextInput
            sizes="sm"
            prefix="ignite.com/"
            {...register('username')}
          />

          <Button
            size="sm"
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            Reservar usuário
            <ArrowRight />
          </Button>
        </form>
      </Box>
      <div className="mt-2 ">
        {errors.username ? (
          <Text className="text-right text-xs text-red-400">
            {errors.username.message}
          </Text>
        ) : (
          <Text className="text-right text-xs text-gray-400">
            Digite o nome do usuário desejado
          </Text>
        )}
      </div>
    </>
  )
}
