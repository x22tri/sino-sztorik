import { Box, Breadcrumbs, Link, Typography, useTheme } from '@mui/material'
import { TimelineData } from '../../../shared/route-loaders/loadAdminChar'
import { CharFormData } from '../../../shared/route-loaders/loadAdminChar'
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

export default function AdminCharEditContent({
  activeStep,
  timelineData,
  saveCharForm,
  setTimelineData,
}: {
  activeStep: number
  timelineData: TimelineData
  saveCharForm: Dispatch<SetStateAction<CharFormData>>
  setTimelineData: Dispatch<SetStateAction<TimelineData>>
}) {
  const { constants } = useTheme()

  const charFormData = useWatch() as CharFormData

  useRegisterCharAdminErrors(charFormData, timelineData)

  return (
    <Box mb={constants.bottomToolbarHeight} p={2} mt={4}>
      <Typography variant='h4' mt={2}>
        Karakter szerkesztése ({charFormData.glyph})
      </Typography>

      <Switch>
        <Case condition={activeStep === 0}>
          <Heading title={ADMIN_CHAR_EDIT_STEP_ONE} />
          <CharForm />
        </Case>

        <Case condition={activeStep === 1}>
          <Heading title={ADMIN_CHAR_EDIT_STEP_TWO} />
          <Timeline {...{ charFormData, timelineData, setTimelineData }} />
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

export function BreadcrumbLink({ href, text }: { href: string; text: string }) {
  return (
    <Link color='inherit' underline='hover' {...{ href }} sx={{ ':hover': { backgroundColor: 'inherit' } }}>
      {text}
    </Link>
  )
}
