import Typography from '@mui/material/Typography'

export function Heading({ title }: { title: string }) {
  return (
    <Typography variant='h5' fontWeight={700} marginY={3}>
      {title}
    </Typography>
  )
}
