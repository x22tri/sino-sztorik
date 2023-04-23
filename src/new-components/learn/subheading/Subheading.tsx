import Typography from '@mui/material/Typography'

export function Subheading({ title }: { title: string }) {
  return (
    <Typography variant='h6' fontWeight={700} marginY={2}>
      {title}
    </Typography>
  )
}
