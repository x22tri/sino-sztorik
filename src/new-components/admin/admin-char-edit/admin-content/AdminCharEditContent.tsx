import { Box, Breadcrumbs, Link, Typography, useTheme } from '@mui/material'
import { TimelineData } from '../../../shared/logic/loadAdminChar'
import { CharFormData } from '../../../shared/logic/loadAdminChar'
import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction } from 'react'
import { Case, Default, Switch } from 'react-if'
import { CharForm } from '../char-form/CharForm'
import { ADMIN_CHAR_EDIT_STEP_ONE, ADMIN_CHAR_EDIT_STEP_THREE, ADMIN_CHAR_EDIT_STEP_TWO } from '../../../shared/strings'
import { useWatch } from 'react-hook-form'
import { useRegisterCharAdminErrors } from '../hooks/useRegisterCharAdminErrors'
import { FinalCheck } from './final-check/FinalCheck'
import { Heading } from '../../../learn/headings/Heading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { ADMIN_CHARACTERS_SUBPATH, ADMIN_PATH } from '../../../shared/paths'

export default function AdminCharEditContent({
  activeStep,
  timelineData,
  saveCharForm,
  setTimelineData,
  toolbarHeight,
}: {
  activeStep: number
  timelineData: TimelineData
  saveCharForm: Dispatch<SetStateAction<CharFormData>>
  setTimelineData: Dispatch<SetStateAction<TimelineData>>
  toolbarHeight: number
}) {
  const { constants } = useTheme()

  const charFormData = useWatch() as CharFormData

  useRegisterCharAdminErrors(charFormData, timelineData)

  return (
    <Box
      bgcolor='background.paper'
      minHeight={`calc(100vh - ${toolbarHeight}px - ${constants.bottomToolbarHeight})`}
      marginBottom={constants.bottomToolbarHeight}
      padding={2}
    >
      <Breadcrumbs aria-label='breadcrumb' separator={<FontAwesomeIcon icon={faChevronRight} size='xs' />}>
        <BreadcrumbLink href={`${ADMIN_PATH}`} text='Kezelőközpont' />
        <BreadcrumbLink href={`${ADMIN_PATH}${ADMIN_CHARACTERS_SUBPATH}`} text='Karakterek' />
        <Typography color='text.primary'>Karakter szerkesztése ({charFormData.glyph})</Typography>
      </Breadcrumbs>

      <Switch>
        <Case condition={activeStep === 0}>
          <Heading title={ADMIN_CHAR_EDIT_STEP_ONE} />
          <CharForm />
        </Case>

        <Case condition={activeStep === 1}>
          <Heading title={ADMIN_CHAR_EDIT_STEP_TWO} />
          <Timeline {...{ timelineData, setTimelineData }} />
        </Case>

        <Case condition={activeStep === 2}>
          <Heading title={ADMIN_CHAR_EDIT_STEP_THREE} />
          <FinalCheck {...{ charFormData, timelineData }} />
        </Case>

        <Default>Hiba</Default>
      </Switch>
    </Box>
  )
}

function BreadcrumbLink({ href, text }: { href: string; text: string }) {
  return (
    <Link color='inherit' underline='hover' {...{ href }} sx={{ ':hover': { backgroundColor: 'inherit' } }}>
      {text}
    </Link>
  )
}
