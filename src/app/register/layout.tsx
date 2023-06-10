import { ReactNode } from 'react'

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4 py-0">{children}</main>
  )
}
