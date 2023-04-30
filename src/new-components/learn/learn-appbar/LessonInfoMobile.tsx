import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { useNavButtonStyling } from '../../shared/utility-functions'
import { emphasisFont } from '../../shared/theme'
import { ReturnFromFlashbackMobile } from './ReturnFromFlashbackMobile'
import { If, Then, Else } from 'react-if'
import { useBoundStore } from '../../shared/logic/useBoundStore'

export function LessonInfoMobile({ lessonNumber }: { lessonNumber: number }) {
  const navButtonStyling = useNavButtonStyling()
  const { flashbackChar } = useBoundStore(({ flashbackSlice }) => flashbackSlice)

  return (
    <If condition={!flashbackChar}>
      <Then>
        <IconButton size='large' className='fa-layers fa-fw' sx={{ ml: 1, justifySelf: 'flex-end', ...navButtonStyling }}>
          <FontAwesomeIcon icon={faChalkboard} transform='shrink-3' />
          <Box component='span' fontFamily={emphasisFont} fontWeight='bold' fontSize='40%' marginBottom='2px'>
            {lessonNumber}
          </Box>
        </IconButton>
      </Then>
      <Else>
        <ReturnFromFlashbackMobile />
      </Else>
    </If>
  )
}
