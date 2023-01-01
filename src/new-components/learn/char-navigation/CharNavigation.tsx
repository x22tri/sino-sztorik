import {
  faChevronLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
    <Box display='flex'>
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
          <Typography variant='chineseNormal' fontSize='20px'>
            {prevChar!}
          </Typography>
        </LightenOnHoverButton>
      </Display>

      <Display if={nextChar}>
        <LightenOnHoverButton
          endIcon={<FontAwesomeIcon icon={faChevronCircleRight} />}
          onClick={() => swiper.slideNext()}
          size='small'
          sx={{ ml: 'auto' }}
        >
          <>
            <Typography variant='h6' fontSize='16px !important' marginRight={1}>
              Következő:
            </Typography>
            <Typography variant='chineseNormal' fontSize='20px'>
              {nextChar!}
            </Typography>
          </>
        </LightenOnHoverButton>
      </Display>
    </Box>
  )
}
