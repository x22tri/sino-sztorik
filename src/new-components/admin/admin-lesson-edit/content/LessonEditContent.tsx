import { Box, Link, Typography, useTheme } from '@mui/material'
// import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction } from 'react'
import { Case, Default, Switch } from 'react-if'
// import { CharForm } from '../char-form/CharForm'
import { ADMIN_EDIT_STEPS_STEP_ONE, ADMIN_EDIT_STEPS_STEP_THREE, ADMIN_EDIT_STEPS_STEP_TWO } from '../../../shared/strings'
import { useWatch } from 'react-hook-form'
// import { useRegisterCharAdminErrors } from '../hooks/useRegisterCharAdminErrors'
// import { FinalCheck } from './final-check/FinalCheck'
import { Heading } from '../../../learn/headings/Heading'
import { Link as RouterLink } from 'react-router-dom'
import { LessonFormData, LessonTimelineData } from '../../../shared/route-loaders/loadLessonEdit'
import { Subheading } from '../../../learn/headings/Subheading'
import { LessonAdminTextField } from '../../shared/AdminTextField'
import { LessonCharReference } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'
import { FinalCheck } from '../final-check/FinalCheck'

export default function LessonEditContent({
  activeStep,
  characters,
  lessonNumber,
  timelineData,
  // saveCharForm,
  setTimelineData,
}: {
  activeStep: number
  characters: LessonCharReference[]
  lessonNumber: number
  timelineData: LessonTimelineData
  // saveCharForm: Dispatch<SetStateAction<CharFormData>>
  setTimelineData: Dispatch<SetStateAction<LessonTimelineData>>
}) {
  const { constants } = useTheme()

  const lessonFormData = useWatch() as LessonFormData

  //   useRegisterCharAdminErrors(charFormData, timelineData)

  return (
    <Box mb={constants.bottomToolbarHeight} p={2} mt={4}>
      <Typography variant='h4' mt={2}>
        Lecke szerkesztése ({lessonNumber}. lecke)
      </Typography>

      <Switch>
        <Case condition={activeStep === 0}>
          <Heading title={ADMIN_EDIT_STEPS_STEP_ONE} />
          <LessonForm {...{ characters }} />
        </Case>

        <Case condition={activeStep === 1}>
          <Heading title={ADMIN_EDIT_STEPS_STEP_TWO} />
          <Timeline {...{ lessonFormData, timelineData, setTimelineData }} />
        </Case>

        <Case condition={activeStep === 2}>
          <Heading title={ADMIN_EDIT_STEPS_STEP_THREE} />
          <FinalCheck {...{ lessonFormData, timelineData }} />
        </Case>

        <Default>Hiba</Default>
      </Switch>
    </Box>
  )
}

function LessonForm({ characters }: { characters: LessonCharReference[] }) {
  const { palette, spacing } = useTheme()

  return (
    <form>
      <Subheading styles={{ marginBottom: 2, marginTop: 0 }} title='Alapadatok' />
      <LessonAdminTextField label='Lecke címe' name='title' />

      <Subheading styles={{ marginBottom: 2, marginTop: 6 }} title={`Karakterek a leckében (${characters.length})`} />

      <Box display='flex' flexWrap='wrap' gap={3} sx={{ borderRadius: spacing(3) }}>
        {characters.map(({ glyph, tiers }) => (
          <Box alignItems='center' display='flex' flexDirection='column' key={glyph}>
            <Typography
              key={glyph}
              component='span'
              variant='chineseText'
              sx={{ borderRadius: 2, border: `1px solid ${palette.grey[300]}`, p: 1 }}
            >
              {glyph}
            </Typography>

            <CharTierVariantCircles {...{ tiers }} />
          </Box>
        ))}
      </Box>
    </form>
  )
}

function CharTierVariantCircles({ tiers }: { tiers: number[] }) {
  return (
    <Box display='flex' flexDirection='row'>
      {new Array(1, 2, 3, 4).map(tier =>
        tiers.includes(tier) ? (
          <Box component='span' color='primary.main' key={tier}>
            ●
          </Box>
        ) : (
          <Box component='span' color='text.disabled' key={tier}>
            ○
          </Box>
        )
      )}
    </Box>
  )
}
