import Typography, { TypographyProps } from '@mui/material/Typography'

export function Subheading({ styles, title }: { styles?: TypographyProps; title: string }) {
  return (
    <Typography variant='h6' fontWeight={700} marginY={3} {...styles}>
      {title}
    </Typography>
  )
}
