import { ElementType } from 'react'
import { useTheme } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'

export function LightenOnHoverButton<B extends ElementType>(props: ButtonProps<B, { component?: B }>) {
  const { constants } = useTheme()

  return (
    <Button
      {...props}
      sx={{
        transition: `${constants.animationDuration}ms`,
        '&:hover': {
          backgroundColor: 'inherit',
          filter: 'brightness(1.3)',
        },
        '&:focus': {
          filter: 'brightness(1.3)',
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  )
}
