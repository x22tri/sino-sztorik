import { Typography } from '@mui/material'

export function AdminSubmenuTitle({ glyph }: { glyph: string }) {
  return (
    <Typography variant='h5' fontWeight='bold' p={2} pb={1}>
      {`Karakter szerkesztése (${glyph})`}
    </Typography>
  )
}
