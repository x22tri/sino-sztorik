import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Box, useTheme } from '@mui/material'
import { RESUME_LESSON } from '../../shared/strings'
import { useFlashback } from '../store/useFlashback'

export function ExitFlashbackButton({ glyph }: { glyph: string }) {
  const { spacing } = useTheme()
  const { quitFlashback } = useFlashback()

  return (
    <Button
      color='white'
      variant='contained'
      onClick={quitFlashback}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{ borderRadius: 6, minWidth: 'max-content', width: '20%', '.MuiButton-startIcon': { marginRight: spacing(1) } }}
    >
      <Box>{`${RESUME_LESSON} (${glyph})`}</Box>
    </Button>
  )
}
