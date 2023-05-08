import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import { LightenOnHoverButton } from './LightenOnHoverButton'
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
  const { flashbackChar } = useStore('flashback')
  const { swiperInstance } = useStore('swiper')

  return (
    <Box display='flex' width='100%' justifyContent='center' marginTop={8}>
      <If condition={!flashbackChar}>
        <Then>
          <When condition={!!prev}>
            <LightenOnHoverButton
              color='neutral'
              onClick={() => swiperInstance?.slidePrev()}
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
                color='neutral'
                endIcon={<FontAwesomeIcon icon={faChevronRight} transform='shrink-4' />}
                onClick={() => swiperInstance?.slideNext()}
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
