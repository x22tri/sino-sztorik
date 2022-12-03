import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
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

export function RoundedCard<C extends ElementType>(
  props: CardProps<C, { component?: C }>
) {
  const { palette } = useTheme()

  return (
    <Card
      {...props}
      variant='outlined'
      sx={{
        backgroundColor: palette.background.paper,
        borderRadius: '16px',
        py: 2,
        px: 2,
        height: 'fit-content',
        ...props.sx,
      }}
    >
      {props.children}
    </Card>
  )
}
