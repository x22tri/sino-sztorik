import Button from '@mui/material/Button'

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
