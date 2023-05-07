import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import { LightenOnHoverButton } from './LightenOnHoverButton'
import { useSwiper } from 'swiper/react'
import { PREV_NEXT_BUTTONS_PREV, PREV_NEXT_BUTTONS_NEXT, PREV_NEXT_BUTTONS_EXIT_FLASHBACK_PROMPT } from '../strings'
import { Typography } from '@mui/material'
import { Else, If, Then, When } from 'react-if'
import { useStore } from '../logic/useStore'

export function PrevNextButtons({
  customEndElement,
  prev,
  next,
}: {
  customEndElement?: JSX.Element
  prev: string | null
  next: string | null
}) {
  const swiper = useSwiper()
  const { flashbackChar } = useStore('flashback')

  return (
    <Box display='flex' width='100%' justifyContent='center' marginTop={5}>
      <If condition={!flashbackChar}>
        <Then>
          <When condition={!!prev}>
            <LightenOnHoverButton
              color='neutral'
              onClick={() => swiper.slidePrev()}
              size='small'
              startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
              sx={{ mr: 'auto' }}
            >
              {PREV_NEXT_BUTTONS_PREV}
            </LightenOnHoverButton>
          </When>

          <If condition={!!next}>
            <Then>
              <LightenOnHoverButton
                endIcon={<FontAwesomeIcon icon={faChevronRight} transform='shrink-4' />}
                onClick={() => swiper.slideNext()}
                size='small'
                sx={{ ml: 'auto' }}
              >
                {PREV_NEXT_BUTTONS_NEXT}
              </LightenOnHoverButton>
            </Then>

            <Else>
              <When condition={!!customEndElement}>{customEndElement}</When>
            </Else>
          </If>
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
      {PREV_NEXT_BUTTONS_EXIT_FLASHBACK_PROMPT}
    </Typography>
  )
}
