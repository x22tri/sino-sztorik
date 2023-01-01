import Box from '@mui/material/Box'
import { Button, IconButton, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboard, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavButtonStyling } from '../useNavButtonStyling'
import { Character } from '../../shared/interfaces'
import { emphasisFont } from '../../shared/theme'
import { LightenOnHoverButton } from '../../shared-components/LightenOnHoverButton'

export function LessonInfoMobile({
  lessonNumber,
  charToReturnToFromFlashback,
  returnFromFlashback,
}: {
  lessonNumber: number
  charToReturnToFromFlashback: Character | null
  returnFromFlashback: () => void
}) {
  const navButtonStyling = useNavButtonStyling()

  return charToReturnToFromFlashback ? (
    <ReturnFromFlashbackMobile
      {...{ charToReturnToFromFlashback, returnFromFlashback }}
    />
  ) : (
    <IconButton
      size='large'
      className='fa-layers fa-fw'
      sx={{ ml: 1, justifySelf: 'flex-end', ...navButtonStyling }}
    >
      <FontAwesomeIcon icon={faChalkboard} transform='shrink-3' />
      <Box
        component='span'
        fontFamily={emphasisFont}
        fontWeight='bold'
        fontSize='40%'
        marginBottom='2px'
      >
        {lessonNumber}
      </Box>
    </IconButton>
  )
}

function ReturnFromFlashbackMobile({
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
      sx={{
        py: 0,
        px: 1,
        ml: 1,
        minWidth: 0,
        '.MuiButton-startIcon': { marginRight: '2px' },
      }}
    >
      <Typography variant='chineseNormal'>
        {charToReturnToFromFlashback.charChinese}
      </Typography>
    </Button>
  )
}
