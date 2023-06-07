import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const req = await request.json()
  const bodyParamsSchema = z.object({
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

  const _body = bodyParamsSchema.safeParse(req)

  if (_body.success === false) {
    return NextResponse.json(_body.error.format(), { status: 400 })
  }

  const { name, username } = _body.data

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return NextResponse.json(
      { error: 'username already exists' },
      { status: 400 },
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return NextResponse.json(user, {
    status: 201,
    headers: {
      // eslint-disable-next-line prettier/prettier
      'Set-Cookie': `@ignitecall:userId=${user.id}; Path=/; MAx-Age=${60 * 60 * 24 * 7}`, // Max-Age = 7days
    },
  })
}
export async function GET(request: Request) {
  const user = await prisma.user.findMany()

  return NextResponse.json(user, { status: 201 })
}
