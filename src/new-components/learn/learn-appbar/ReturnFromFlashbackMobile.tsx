import { Button, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useFlashback } from '../logic/useFlashback'

export function ReturnFromFlashbackMobile() {
  const { interrupted, resumeLesson } = useFlashback()

  return (
    <Button
      size='small'
      variant='contained'
      onClick={resumeLesson}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{
        py: 0,
        px: 1,
        ml: 1,
        minWidth: 0,
        '.MuiButton-startIcon': { marginRight: '2px' },
      }}
    >
      <Typography variant='chineseNormal'>
        {interrupted?.charChinese}
      </Typography>
    </Button>
  )
}
