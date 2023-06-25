import { Stack, useTheme } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { SortedCharacterEntry } from '../../shared/logic/loadAdminChar'
import { CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'

export function mergePreviousTiers(variants: CharacterEntryVariant[], tierToStopAt: number) {
  return variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
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
