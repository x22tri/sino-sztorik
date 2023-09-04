import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PREV_NEXT_BUTTONS_PREV, PREV_NEXT_BUTTONS_NEXT } from '../strings'
import { Else, If, Then, When } from 'react-if'
import { Box, Button } from '@mui/material'
import { TitleSubtitle } from './TitleSubtitle'
import { Link } from 'react-router-dom'

export function PrevNextLinks({
  customEndElement,
  prevOnClick,
  prevTitle,
  prevTo,
  nextOnClick,
  nextTitle,
  nextTo,
}: {
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
      alignItems='flex-end'
      display='flex'
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={1}
      gridArea='prev-next'
      width='100%'
      mt={2}
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
            startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
            size='large'
            variant='text'
            sx={{ justifyContent: 'flex-start', mr: 'auto', px: 2, width: { xs: 1, md: 'max-content' } }}
          >
            <TitleSubtitle title={PREV_NEXT_BUTTONS_PREV} subtitle={prevTitle!} subtitleStyles={{ lineHeight: 'initial' }} />
          </Button>
        )}
      </When>

      <If condition={!!nextTitle}>
        <Then>
          {() => (
            <Button
              color='neutral'
              component={!!nextTo ? Link : Button}
              endIcon={<FontAwesomeIcon icon={faChevronRight} transform='shrink-4' />}
              onClick={() => {
                window.scrollTo({ top: 0 })
                if (nextOnClick) nextOnClick()
              }}
              to={nextTo}
              size='large'
              variant='text'
              sx={{ justifyContent: 'flex-end', ml: 'auto', px: 2, width: { xs: 1, md: 'max-content' } }}
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
