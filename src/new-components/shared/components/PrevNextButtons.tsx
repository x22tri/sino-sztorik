import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import { PREV_NEXT_BUTTONS_PREV, PREV_NEXT_BUTTONS_NEXT } from '../strings'
import { Else, If, Then, When } from 'react-if'
import { useStore } from '../logic/useStore'
import { Button } from '@mui/material'
import { TitleSubtitle } from './TitleSubtitle'

export function PrevNextButtons({
  customEndElement,
  prev,
  next,
}: {
  customEndElement?: JSX.Element
  prev: string | null
  next: string | null
}) {
  const { swiperInstance } = useStore('swiper')

  return (
    <Box alignItems='flex-end' display='flex' gridArea='prev-next' width='100%' marginTop={8}>
      <When condition={!!prev}>
        <Button
          color='neutral'
          startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
          size='large'
          onClick={() => swiperInstance?.slidePrev()}
          variant='text'
          sx={{ mr: 'auto', px: 2 }}
        >
          <TitleSubtitle
            title={PREV_NEXT_BUTTONS_PREV}
            subtitle={prev!}
            subtitleStyles={{ lineHeight: 'initial' }}
          ></TitleSubtitle>
        </Button>
      </When>

      <If condition={!!next}>
        <Then>
          <Button
            color='neutral'
            endIcon={<FontAwesomeIcon icon={faChevronRight} transform='shrink-4' />}
            size='large'
            onClick={() => swiperInstance?.slideNext()}
            variant='text'
            sx={{ ml: 'auto', px: 2 }}
          >
            <TitleSubtitle
              title={PREV_NEXT_BUTTONS_NEXT}
              subtitle={next!}
              containerStyles={{ alignItems: 'flex-end' }}
              subtitleStyles={{ lineHeight: 'initial' }}
            ></TitleSubtitle>
          </Button>
        </Then>

        <Else>
          <When condition={!!customEndElement}>{customEndElement}</When>
        </Else>
      </If>
    </Box>
  )
}
