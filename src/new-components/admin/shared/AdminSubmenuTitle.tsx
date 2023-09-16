import { Typography } from '@mui/material'

export function AdminSubmenuTitle({ text }: { text: string }) {
  return (
    <Typography variant='h5' fontWeight='bold' p={2} pb={1} mt={2}>
      {text}
    </Typography>
  )
}
