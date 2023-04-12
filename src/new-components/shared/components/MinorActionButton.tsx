import Button from '@mui/material/Button'

export function MinorActionButton({ text }: { text: string }) {
  return (
    <Button variant='outlined' color='primary' sx={{ borderWidth: '2px', '&:hover': { borderWidth: '2px' } }}>
      {text}
    </Button>
  )
}
