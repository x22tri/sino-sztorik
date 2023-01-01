import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { useNavButtonStyling } from '../useNavButtonStyling'
import { Character } from '../../shared/interfaces'
import { emphasisFont } from '../../shared/theme'
import { ReturnFromFlashbackMobile } from './ReturnFromFlashbackMobile'

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
