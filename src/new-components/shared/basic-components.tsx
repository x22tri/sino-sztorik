import { useTheme } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import Card, { CardProps } from '@mui/material/Card'
import { ElementType } from 'react'

export function MajorActionButton({ text }: { text: string }) {
  const { palette } = useTheme()

  return (
    <Button
      variant='contained'
      color='secondary'
      sx={{
        border: '2px solid transparent',
        borderRadius: '0 8px',
        boxShadow: 'none',
        '&:hover': {
          border: `2px solid ${palette.secondary.dark}`,
          boxShadow: 'none',
        },
      }}
    >
      {text}
    </Button>
  )
}

export function MinorActionButton({ text }: { text: string }) {
  return (
    <Button
      variant='outlined'
      color='primary'
      sx={{
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px',
        },
      }}
    >
      {text}
    </Button>
  )
}

export function LightenOnHoverButton<B extends ElementType>(
  props: ButtonProps<B, { component?: B }>
) {
  const { palette } = useTheme()

  return (
    <Button
      {...props}
      sx={{
        color: palette.grey[600],
        pb: 0,
        borderRadius: 0,
        borderBottom: '2px solid transparent',
        '&:hover': {
          backgroundColor: 'inherit',
          filter: 'brightness(1.3)',
        },
        '&:focus': {
          borderBottom: '2px solid', // The border will take the text's color.
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
