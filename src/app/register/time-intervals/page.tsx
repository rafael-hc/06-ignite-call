'use client'
import { api } from '@/lib/axios'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import {
  Box,
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@rhcode/react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((interval) => interval.enabled === true),
    )
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana.',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - interval.startTimeInMinutes >= 60,
        ),
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início.',
      },
    ),
})

type TimeIntervalsFormDataInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormDataOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TimeIntervalsFormDataInput, any, TimeIntervalsFormDataOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals(data: TimeIntervalsFormDataOutput) {
    await api.post('/users/time-intervals', data)
  }

  return (
    <>
      <div className="px-4 py-0">
        <Heading className="leading-base">Quase lá</Heading>
        <Text className="mb-6 text-gray-200">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </div>
      <Box className="mt-6 ">
        <form
          onSubmit={handleSubmit(handleSetTimeIntervals)}
          className="flex flex-col gap-4"
        >
          <div className="rounded-md border border-gray-600">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between border-gray-600 px-4 py-3 [&_+_&]:border-t"
              >
                <div className="flex items-center gap-3">
                  <Checkbox {...register(`intervals.${index}.enabled`)} />
                  <Text>{weekDays[field.weekDay]}</Text>
                </div>
                <div className="flex items-center gap-3">
                  <TextInput
                    sizes="sm"
                    type="time"
                    step={60}
                    className="tp: [&_input]:leading-normal"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    sizes="sm"
                    type="time"
                    step={60}
                    className="[&_input]:leading-normal"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </div>
              </div>
            ))}
          </div>
          {errors.intervals && (
            <Text size="sm" className="text-right text-red-500">
              {errors.intervals.message}
            </Text>
          )}
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
