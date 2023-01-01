import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Character } from '../../shared/interfaces'
import {
  BACK_TO_LESSON_FROM_FLASHBACK,
  FLASHBACK_MODE,
} from '../../shared/strings'

export function ReturnFromFlashback({
  charToReturnToFromFlashback,
  returnFromFlashback,
}: {
  charToReturnToFromFlashback: Character
  returnFromFlashback: () => void
}) {
  return (
    <Button
      size='small'
      variant='contained'
      onClick={returnFromFlashback}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{ ml: 1, minWidth: 0 }}
    >
      <Box display='flex' flexDirection='column' alignItems='flex-start'>
        <Typography
          component='span'
          lineHeight={1}
          sx={{ fontWeight: 900, fontSize: '80%', opacity: 0.5 }}
        >
          {FLASHBACK_MODE}
        </Typography>
        <Typography component='span' lineHeight={1} sx={{ fontWeight: 'bold' }}>
          {BACK_TO_LESSON_FROM_FLASHBACK} (
          {charToReturnToFromFlashback?.charChinese})
        </Typography>
      </Box>
    </Button>
  )
}
