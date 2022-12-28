import { ReactNode, FC } from 'react'

// Conditionally renders children based on the truthiness of the 'if' prop.
// Note that TypeScript cannot infer the truthiness of the 'if' prop when the 'children' element is shown.
interface DisplayProps {
  if: any
  children: JSX.Element
}

export const Display: FC<DisplayProps> = ({ if: condition, children }) => {
  return !!condition ? children : null
}

// Conditionally renders a wrapper based on the truthiness of the 'if' prop.
interface WrapProps {
  if: any
  with: (children: ReactNode) => JSX.Element
  children: JSX.Element
}

export const Wrap: FC<WrapProps> = ({
  if: condition,
  with: wrapper,
  children,
}) => {
  return !!condition ? wrapper(children) : children
}
