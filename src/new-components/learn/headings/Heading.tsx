import Typography, { TypographyProps } from '@mui/material/Typography'

export function Heading({ styles, title }: { styles?: TypographyProps; title: string }) {
  return (
    <Typography variant='h5' fontWeight={700} marginY={3} {...styles}>
      {title}
    </Typography>
  )
}
