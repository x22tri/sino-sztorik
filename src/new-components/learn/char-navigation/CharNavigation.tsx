import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import { LightenOnHoverButton } from '../../shared-components/LightenOnHoverButton'
import { Display } from '../../shared/utility-components'
import { useSwiper } from 'swiper/react'

export function CharNavigation({
  prevChar,
  nextChar,
}: {
  prevChar: string | null
  nextChar: string | null
}) {
  const swiper = useSwiper()

  return (
    <Box display='flex' width='100%' justifyContent='center'>
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
          Előző
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
          Következő
        </LightenOnHoverButton>
      </Display>
    </Box>
  )
}
