import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, useTheme } from '@mui/material'

export function IconButtonWithText({ disabled = false, icon, text }: { disabled?: boolean; icon: IconDefinition; text: string }) {
  const { spacing } = useTheme()

  return (
    <Button {...{ disabled }} color='neutral' sx={{ borderRadius: spacing(1), flexDirection: 'column', gap: 0.5 }}>
      <FontAwesomeIcon size='lg' {...{ icon }} />

      <Box component='span' lineHeight={1}>
        {text}
      </Box>
    </Button>
  )
}
