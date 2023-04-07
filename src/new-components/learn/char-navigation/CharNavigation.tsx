import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import { LightenOnHoverButton } from '../../shared-components/LightenOnHoverButton'
import { useSwiper } from 'swiper/react'
import {
  CHAR_NAVIGATION_PREVIOUS_CHARACTER,
  CHAR_NAVIGATION_NEXT_CHARACTER,
  CHAR_NAVIGATION_EXIT_FLASHBACK_PROMPT,
} from '../../shared/strings'
import { Typography } from '@mui/material'
import { useFlashback } from '../logic/useFlashback'
import { Else, If, Then, When } from 'react-if'

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
      <If condition={!flashback}>
        <Then>
          <When condition={!!prevChar}>
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
          </When>

          <When condition={!!nextChar}>
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
          </When>
        </Then>
        <Else>
          <ExitFlashbackWarning />
        </Else>
      </If>
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
