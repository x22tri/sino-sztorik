import { Stack, useTheme } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { DiffedCharacterEntryVariant, SortedCharacterEntry } from '../../shared/logic/loadAdminChar'
import { CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'

export type X = Omit<DiffedCharacterEntryVariant, 'index' | 'tier' | 'newInfo' | 'modifiedInfo'>

export function mergePreviousTiers(variants: CharacterEntryVariant[], tierToStopAt: number): X {
  return variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

export function isNotPresentInTier(object: object) {
  return !object || Object.keys(object).length === 0
}

export default function AdminContent() {
  const { constants } = useTheme()
  const { character } = useLoaderData() as { character: SortedCharacterEntry }

  return (
    <Stack
      boxSizing='border-box'
      bgcolor='background.paper'
      component='main'
      display='flex'
      flexDirection='column'
      minHeight={`calc(100vh - ${constants.bottomToolbarHeight})`}
      paddingX={2}
    >
      <Heading title='Idővonal' />

      <Timeline {...{ character }} />
    </Stack>
  )
}
