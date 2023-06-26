'use client'
import { getWeekDays } from '@/utils/get-week-days'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Text } from '@rhcode/react'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { api } from '@/lib/axios'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const { username } = useParams()

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonth)
  }
  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')
    setCurrentDate(nextMonth)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const { data: blockedDates } = useQuery<BlockedDates>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month') + 1,
        },
      })

      return response.data
    },
  )

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })
    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get('day')) ||
            blockedDates.blockedDates.includes(date.get('date')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        {/* Header */}
        <Text className="font-medium capitalize">
          {currentMonth} <span className="text-gray-200">{currentYear}</span>
        </Text>
        <div className="flex gap-2 text-gray-200 [&_button]:cursor-pointer">
          <button
            onClick={handlePreviousMonth}
            title="Previous month"
            className="cursor-pointer rounded-sm leading-none hover:text-gray-100 focus:shadow-[0_0_0_2px] focus:shadow-gray-100"
          >
            <CaretLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextMonth}
            title="Next month"
            className="cursor-pointer rounded-sm leading-none"
          >
            <CaretRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <table className="w-full table-fixed border-spacing-2">
        {/* Body */}
        <thead className="text-sm font-medium text-gray-200">
          <tr>
            {shortWeekDays.map((weekDays) => (
              <th key={weekDays}>{weekDays}.</th>
            ))}
          </tr>
        </thead>
        <tbody className="before:block before:leading-3 before:text-gray-800 before:content-['.']">
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <button
                    onClick={() => onDateSelected(date.toDate())}
                    className="aspect-square w-full rounded-sm bg-gray-600 focus:shadow-[0_0_0_2px] focus:shadow-gray-100 enabled:hover:bg-gray-500 disabled:cursor-default disabled:bg-transparent disabled:opacity-40"
                    disabled={disabled}
                  >
                    {date.get('date')}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
