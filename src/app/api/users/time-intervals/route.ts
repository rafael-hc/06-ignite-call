import { NextResponse } from 'next/server'
import { z } from 'zod'
// import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number().min(0).max(6),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const req = await request.json()
  const _body = timeIntervalsBodySchema.safeParse(req)

  if (_body.success === false) {
    return NextResponse.json(_body.error.format(), { status: 400 })
  }

  const { intervals } = _body.data

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          start_time_in_minutes: interval.startTimeInMinutes,
          end_time_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )
  return NextResponse.json({})
}
