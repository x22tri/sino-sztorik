import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import { LightenOnHoverButton } from '../../shared-components/LightenOnHoverButton'
import { Display } from '../../shared/utility-components'
import { useSwiper } from 'swiper/react'
import {
  CHAR_NAVIGATION_PREVIOUS_CHARACTER,
  CHAR_NAVIGATION_NEXT_CHARACTER,
  CHAR_NAVIGATION_EXIT_FLASHBACK_PROMPT,
} from '../../shared/strings'
import { Typography } from '@mui/material'
import { useFlashback } from '../logic/useFlashback'

export function CharNavigation({
  prevChar,
  nextChar,
}: {
  prevChar: string | null
  nextChar: string | null
}) {
  const swiper = useSwiper()

  const { flashback } = useFlashback()

  return (
    <Box display='flex' width='100%' justifyContent='center'>
      <Display if={!flashback} else={<ExitFlashbackWarning />}>
        <>
          <Display if={prevChar}>
            <LightenOnHoverButton
              color='neutral'
              onClick={() => swiper.slidePrev()}
              size='small'
              startIcon={
                <FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />
              }
              sx={{ mr: 'auto' }}
            >
              {CHAR_NAVIGATION_PREVIOUS_CHARACTER}
            </LightenOnHoverButton>
          </Display>

          <Display if={nextChar}>
            <LightenOnHoverButton
              endIcon={
                <FontAwesomeIcon icon={faChevronRight} transform='shrink-4' />
              }
              onClick={() => swiper.slideNext()}
              size='small'
              sx={{ ml: 'auto' }}
            >
              {CHAR_NAVIGATION_NEXT_CHARACTER}
            </LightenOnHoverButton>
          </Display>
        </>
      </Display>
    </Box>
  )
}

function ExitFlashbackWarning() {
  return (
    <Typography variant='subtitle2' color='text.disabled'>
      {CHAR_NAVIGATION_EXIT_FLASHBACK_PROMPT}
    </Typography>
  )
}
