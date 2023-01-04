import { Box, useTheme } from '@mui/material'
import { ReactNode, FC } from 'react'

const { isArray } = Array

// Conditionally renders children based on the truthiness of the 'if' prop.
// Note that TypeScript cannot infer the truthiness of the 'if' prop when the 'children' element is shown.
interface DisplayProps {
  if: any
  else?: JSX.Element | JSX.Element[]
  children: JSX.Element | JSX.Element[]
}

export const Display: FC<DisplayProps> = ({
  if: condition,
  else: fallback,
  children,
}) => {
  const renderedChildren = isArray(children) ? <>{children}</> : children

  const renderedFallback = isArray(fallback) ? <>{fallback}</> : fallback

  return !!condition ? renderedChildren : renderedFallback ?? null
}

// Conditionally renders a wrapper based on the truthiness of the 'if' prop.
interface WrapProps {
  if: any
  with: (children: ReactNode) => JSX.Element
  children: JSX.Element | JSX.Element[]
}

export const Wrap: FC<WrapProps> = ({
  if: condition,
  with: wrapper,
  children,
}) => {
  const renderedChildren = isArray(children) ? <>{children}</> : children

  return !!condition ? wrapper(renderedChildren) : renderedChildren
}

export function Spacer({ height }: { height: number }) {
  const { spacing } = useTheme()
  return <Box height={spacing(height)} />
}
