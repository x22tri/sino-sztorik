import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function Subheading({ title }: { title: string }) {
  return (
    <Box marginY={1}>
      <Typography variant='h6' fontWeight={700}>
        {title}
      </Typography>
    </Box>
  )
}
