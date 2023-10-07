import { Box, Typography, useTheme } from '@mui/material'
import { CalculatedIndexes, CharTimelineData } from '../../../shared/route-loaders/loadCharEdit'
import { CharFormData } from '../../../shared/route-loaders/loadCharEdit'
import { Dispatch, SetStateAction } from 'react'
import { useWatch } from 'react-hook-form'
import { useRegisterCharAdminErrors } from '../error-context/useRegisterCharAdminErrors'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'

export default function AdminCharEditContent({
  activeStep,
  calculatedIndexes,
  timelineData,
  saveCharForm,
  setTimelineData,
}: {
  activeStep: number
  calculatedIndexes: CalculatedIndexes
  timelineData: CharTimelineData
  saveCharForm: Dispatch<SetStateAction<CharFormData>>
  setTimelineData: Dispatch<SetStateAction<CharTimelineData>>
}) {
  const { constants } = useTheme()

  const { glyph } = useParams()

  const charFormData = useWatch() as CharFormData

  useRegisterCharAdminErrors(charFormData, timelineData)

  return (
    <Box mb={constants.bottomToolbarHeight} p={2} mt={4}>
      {/* <PreviousStep link={`/admin/characters/${glyph}/form/1`} text='Alapadatok' /> */}

      {/* <Typography variant='h4' mt={2}>
        Karakter szerkesztése ({charFormData.glyph})
      </Typography> */}

      {/* <Switch>
        <Case condition={activeStep === 0}>
          <Heading title={ADMIN_EDIT_STEPS_STEP_ONE} />
          <CharForm />
        </Case>

        <Case condition={activeStep === 1}>
          <Heading title={ADMIN_EDIT_STEPS_STEP_TWO} />
          <Timeline {...{ calculatedIndexes, charFormData, timelineData, setTimelineData }} />
        </Case>

        <Default>Hiba</Default>
      </Switch> */}
      <Outlet context={{ calculatedIndexes, charFormData, timelineData, setTimelineData }} />
    </Box>
  )
}

type CharEditType = {
  calculatedIndexes: CalculatedIndexes
  charFormData: CharFormData
  timelineData: CharTimelineData
  setTimelineData: Dispatch<SetStateAction<CharTimelineData>>
}

export function useCharEdit() {
  return useOutletContext<CharEditType>()
}

export function CharEditHeading({ glyph }: { glyph: string }) {
  return (
    <Typography variant='h4' mt={2}>
      Karakter szerkesztése ({glyph})
    </Typography>
  )
}

// function getPreviousStepLink({glyph}: {glyph: string}): {link: string, text: string} {
//   const route = window.location.pathname.split(`/admin/characters/${encodeURI(glyph)}/`)[1]

//   if (!route) {
//     throw new Error('Unknown route.')
//   }

//   const previousStepMap = {
//     'form/1': {link: '/admin/characters', text: 'Karakterek'},
//     'form/2': {link: `/admin/characters/${encodeURI(glyph)}/form/1`, text: 'Alapadatok'},
//     'form/3': {link: `/admin/characters/${encodeURI(glyph)}/form/2`, text: 'Összetétel'},
//     'timeline/1': {link: `/admin/characters/${encodeURI(glyph)}/form/3`, text: 'Összetétel'},
//     'timeline/2': {link: `/admin/characters/${encodeURI(glyph)}/timeline/1`, text: 'Összetétel'},
//     'timeline/3': {link: `/admin/characters/${encodeURI(glyph)}/timeline/2`, text: 'Összetétel'},
//     'timeline/4': {link: `/admin/characters/${encodeURI(glyph)}/timeline/3`, text: 'Összetétel'},

//   }

//   const baseRoute = route[0]

//   if (route === 'form/1') {
//     return {link: '/admin/characters', text: 'Karakterek'}
//   }

//   if (route === 'form/2') {
//     return {link: `/admin/characters/${encodeURI(glyph)}/1`, text: 'Alapadatok'}
//   }

//   if (route === 'form/3') {
//     return {link: `/admin/characters/${encodeURI(glyph)}/2`, text: 'Összetétel'}
//   }

//   // if (route[0] === 'form') {
//   //   return {link: `/admin/characters/${encodeURI(glyph)}/${Number(route[1]) - 1}`, text: 'Karakterek'}
//   // }

// }
