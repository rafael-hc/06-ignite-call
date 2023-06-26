'use client'
import { Calendar } from '@/components/Calendar'
import classnames from 'classnames'
import { Box, Text } from '@rhcode/react'
import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

interface Availability {
  availableTimes: number[]
  possibleTimes: number[]
}

interface CalendarStepProps {
  onSelectedDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectedDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate
  const { username } = useParams()

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  function handleSelectTime(hour: number) {
    const dateTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()
    onSelectedDateTime(dateTime)
  }

  return (
    <Box
      className={classnames(
        '!p-0classnames relative mx-auto mt-6 grid  max-w-full ',
        {
          'w-[540px] grid-cols-1': !isDateSelected,
          'grid-cols-1 md:grid-cols-[1fr_280px]': isDateSelected,
        },
      )}
    >
      <Calendar onDateSelected={setSelectedDate} selectedDate={selectedDate} />
      {isDateSelected && (
        <div className="static bottom-0 right-0 top-0 w-[280px] px-6 pb-0 pt-6 md:absolute md:overflow-y-scroll md:border-l md:border-l-gray-500">
          <Text className="font-medium">
            {weekDay} <span className="text-gray-200">{describedDate}</span>
          </Text>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-1 [&>*:last-child]:mb-6">
            {availability?.possibleTimes.map((hour) => {
              return (
                <button
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableTimes.includes(hour)}
                  className="rounded-sm bg-gray-600 px-0 py-2 text-sm leading-base text-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-gray-100 enabled:hover:bg-gray-500 disabled:cursor-default disabled:bg-transparent disabled:opacity-40"
                >
                  {String(hour).padStart(2, '0')}:00
                </button>
              )
            })}
          </div>
        </div>
      )}
    </Box>
  )
}
