import { Text } from '@rhcode/react'
import { ReactNode } from 'react'
interface FormErroProps {
  children?: ReactNode
}
export function FormError({ children }: FormErroProps) {
  return (
    <Text size="sm" className="text-red-500">
      {children}
    </Text>
  )
}
