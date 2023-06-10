import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PREV_NEXT_BUTTONS_PREV, PREV_NEXT_BUTTONS_NEXT } from '../strings'
import { Else, If, Then, When } from 'react-if'
import { Box, Button } from '@mui/material'
import { TitleSubtitle } from './TitleSubtitle'
import { AssembledLesson } from '../interfaces'
import { LESSON_SELECT_PATH } from '../paths'
import { Link } from 'react-router-dom'

export function PrevNextLinks({
  customEndElement,
  prev,
  next,
}: {
  customEndElement?: JSX.Element
  prev: AssembledLesson | null
  next: AssembledLesson | null
}) {
  return (
    <Box
      alignItems='flex-end'
      display='flex'
      gridArea='prev-next'
      width='100%'
      marginTop={8}
      sx={{ flexDirection: { xs: 'column', md: 'row' } }}
    >
      <When condition={!!prev}>
        {() => (
          <Button
            color='neutral'
            component={Link}
            to={`${LESSON_SELECT_PATH}/${prev!.lessonNumber}`}
            startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
            size='large'
            variant='text'
            sx={{ mr: 'auto', px: 2 }}
          >
            <TitleSubtitle title={PREV_NEXT_BUTTONS_PREV} subtitle={prev!.title} subtitleStyles={{ lineHeight: 'initial' }} />
          </Button>
        )}
      </When>

      <If condition={!!next}>
        <Then>
          {() => (
            <Button
              color='neutral'
              component={Link}
              endIcon={<FontAwesomeIcon icon={faChevronRight} transform='shrink-4' />}
              to={`${LESSON_SELECT_PATH}/${next!.lessonNumber}`}
              size='large'
              variant='text'
              sx={{ ml: 'auto', px: 2 }}
            >
              <TitleSubtitle
                title={PREV_NEXT_BUTTONS_NEXT}
                subtitle={next!.title}
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
