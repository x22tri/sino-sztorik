import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RESUME_LESSON, FLASHBACK_MODE } from '../../shared/strings'
import { useFlashback } from '../logic/useFlashback'

export function ReturnFromFlashback() {
  const { interrupted, resumeLesson } = useFlashback()

  console.log(useFlashback())

  return (
    <Button
      size='small'
      variant='contained'
      onClick={resumeLesson}
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
          {RESUME_LESSON} ({interrupted?.charChinese})
        </Typography>
      </Box>
    </Button>
  )
}
