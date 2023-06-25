'use client'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/pt-br'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import dayjs from 'dayjs'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

dayjs.extend(utc)

dayjs.locale('pt-br')

type Props = {
  children?: ReactNode
}

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}
