import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import { LightenOnHoverButton } from '../../shared/components/LightenOnHoverButton'
import { useSwiper } from 'swiper/react'
import {
  CHAR_NAVIGATION_PREVIOUS_CHARACTER,
  CHAR_NAVIGATION_NEXT_CHARACTER,
  CHAR_NAVIGATION_EXIT_FLASHBACK_PROMPT,
} from '../../shared/strings'
import { Button, Typography } from '@mui/material'
import { Else, If, Then, When } from 'react-if'
import { useStore } from '../../shared/logic/useStore'

export function PrevNextButtons({ prevChar, nextChar }: { prevChar: string | null; nextChar: string | null }) {
  const swiper = useSwiper()

  const { flashbackChar } = useStore(({ flashback }) => flashback)

  return (
    <Box display='flex' width='100%' justifyContent='center' marginTop={5}>
      <If condition={!flashbackChar}>
        <Then>
          <When condition={!!prevChar}>
            <LightenOnHoverButton
              color='neutral'
              onClick={() => swiper.slidePrev()}
              size='small'
              startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
              sx={{ mr: 'auto' }}
            >
              {CHAR_NAVIGATION_PREVIOUS_CHARACTER}
            </LightenOnHoverButton>
          </When>

          <If condition={!!nextChar}>
            <Then>
              <LightenOnHoverButton
                endIcon={<FontAwesomeIcon icon={faChevronRight} transform='shrink-4' />}
                onClick={() => swiper.slideNext()}
                size='small'
                sx={{ ml: 'auto' }}
              >
                {CHAR_NAVIGATION_NEXT_CHARACTER}
              </LightenOnHoverButton>
            </Then>
            <Else>
              <Button variant='contained' href='/'>
                Lecke befejezése
              </Button>
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
      {CHAR_NAVIGATION_EXIT_FLASHBACK_PROMPT}
    </Typography>
  )
}
