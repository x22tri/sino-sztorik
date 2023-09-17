import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PREV_NEXT_BUTTONS_PREV, PREV_NEXT_BUTTONS_NEXT } from '../strings'
import { Else, If, Then, When } from 'react-if'
import { Box, Button } from '@mui/material'
import { TitleSubtitle } from './TitleSubtitle'
import { Link } from 'react-router-dom'

export function PrevNextLinks({
  middleElement,
  customEndElement,
  prevOnClick,
  prevTitle,
  prevTo,
  nextOnClick,
  nextTitle,
  nextTo,
}: {
  middleElement?: JSX.Element
  customEndElement?: JSX.Element
  prevOnClick?: () => void
  prevTitle: string | undefined
  prevTo?: string
  nextOnClick?: () => void
  nextTitle: string | undefined
  nextTo?: string
}) {
  return (
    <Box
      alignItems='center'
      display='grid'
      gap={1}
      gridArea='prev-next'
      width='100%'
      mt={2}
      sx={{
        grid: {
          xs: `
        "learn" 
        "prev" 
        "next" auto / auto`,
          md: `"prev learn next" auto / 1fr 1fr 1fr`,
        },
      }}
    >
      <When condition={!!prevTitle}>
        {() => (
          <Button
            color='neutral'
            component={!!prevTo ? Link : Button}
            onClick={() => {
              window.scrollTo({ top: 0 })
              if (prevOnClick) prevOnClick()
            }}
            to={prevTo}
            startIcon={<FontAwesomeIcon icon={faArrowLeft} transform='shrink-4' />}
            size='large'
            variant='text'
            sx={{
              gridArea: 'prev',
              justifyContent: 'flex-start',
              mr: 'auto',
              px: 2,
              textAlign: 'start',
              width: { xs: 1, md: 'max-content' },
            }}
          >
            <TitleSubtitle title={PREV_NEXT_BUTTONS_PREV} subtitle={prevTitle!} subtitleStyles={{ lineHeight: 'initial' }} />
          </Button>
        )}
      </When>

      <When condition={!!middleElement}>
        <Box component='span' gridArea='learn'>
          {middleElement}
        </Box>
      </When>

      <If condition={!!nextTitle}>
        <Then>
          {() => (
            <Button
              color='neutral'
              component={!!nextTo ? Link : Button}
              endIcon={<FontAwesomeIcon icon={faArrowRight} transform='shrink-4' />}
              onClick={() => {
                window.scrollTo({ top: 0 })
                if (nextOnClick) nextOnClick()
              }}
              to={nextTo}
              size='large'
              variant='text'
              sx={{
                gridArea: 'next',
                justifyContent: 'flex-end',
                ml: 'auto',
                px: 2,
                textAlign: 'end',
                width: { xs: 1, md: 'max-content' },
              }}
            >
              <TitleSubtitle
                title={PREV_NEXT_BUTTONS_NEXT}
                subtitle={nextTitle!}
                containerStyles={{ alignItems: 'flex-end' }}
                subtitleStyles={{ lineHeight: 'initial' }}
              />
            </Button>
          )}
        </Then>

        <Else>
          <When condition={!!customEndElement}>{customEndElement}</When>
        </Else>
      </If>
    </Box>
  )
}
