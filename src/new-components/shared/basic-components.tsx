import { useTheme } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import Card, { CardProps } from '@mui/material/Card'
import { ElementType } from 'react'

export function MajorActionButton({ text }: { text: string }) {
  return (
    <Button variant='contained' color='secondary'>
      {text}
    </Button>
  )
}

export function MinorActionButton({ text }: { text: string }) {
  return (
    <Button variant='outlined' color='primary'>
      {text}
    </Button>
  )
}

export function LightenOnHoverButton<B extends ElementType>(
  props: ButtonProps<B, { component?: B }>
) {
  return (
    <Button
      {...props}
      sx={{
        '&:hover': {
          backgroundColor: 'inherit',
          filter: 'brightness(1.3)',
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  )
}

export function RoundedCard<C extends ElementType>(
  props: CardProps<C, { component?: C }>
) {
  const { palette } = useTheme()

  return (
    <Card
      {...props}
      sx={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: palette.grey[200],
        borderRadius: '16px',
        backgroundColor: palette.background.paper,
        boxShadow: `3px 5px ${palette.grey[400]}`,
        p: 2,
        ...props.sx,
      }}
    >
      {props.children}
    </Card>
  )
}
