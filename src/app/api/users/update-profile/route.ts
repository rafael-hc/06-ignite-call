import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }

  const req = await request.json()
  const _body = updateProfileBodySchema.safeParse(req)

  if (_body.success === false) {
    return NextResponse.json(_body.error.format(), { status: 400 })
  }

  const { bio } = _body.data

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })
  return NextResponse.json({})
}
