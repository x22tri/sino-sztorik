import { Box, useTheme } from '@mui/material'
import { ReactNode, FC, ReactElement } from 'react'

const { isArray } = Array

// Conditionally renders a wrapper based on the truthiness of the 'if' prop.
interface WrapProps {
  if: any
  with: (children: ReactElement) => JSX.Element
  children: JSX.Element | JSX.Element[]
}

export const Wrap: FC<WrapProps> = ({ if: condition, with: wrapper, children }) => {
  const renderedChildren = isArray(children) ? <>{children}</> : children

  return !!condition ? wrapper(renderedChildren) : renderedChildren
}

export function Spacer({ height }: { height: number }) {
  const { spacing } = useTheme()
  return <Box height={spacing(height)} />
}
