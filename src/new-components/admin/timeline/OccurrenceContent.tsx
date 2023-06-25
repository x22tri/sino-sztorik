import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Typography, useTheme } from '@mui/material'
import { SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { AddOccurrenceOptions } from './AddOccurrenceOptions'
import { BlueprintStepType } from './Timeline'

export function OccurrenceContent({
  addEntry,
  character,
  index,
  occurrences,
  type,
}: {
  addEntry: (atIndex: number, type: BlueprintStepType) => void
  character: SortedCharacterEntry
  index: number
  occurrences: SortedOccurrences
  type: BlueprintStepType | null
}) {
  switch (type) {
    case 'keyword':
      return <Keyword keyword={character.keyword!} />
    case 'primitive':
      return <Primitive primitive={character.primitive!} />
    case 'keywordAndPrimitive':
      return (
        <>
          <Keyword keyword={character.keyword!} />
          <Divider flexItem orientation='vertical' sx={{ borderColor: 'text.disabled', mx: 1 }} />
          <Primitive primitive={character.primitive!} />
        </>
      )
    case 'unset':
      return <AddOccurrenceOptions {...{ addEntry, occurrences, index }} />
    case 'keywordLite':
      return <Keyword keyword={character.keyword!} />
    default:
      return <></>
  }
}
function Keyword({ keyword }: { keyword: string }) {
  const { palette } = useTheme()

  return (
    <Typography color={palette.primary.main} fontWeight='bold' margin='auto'>
      {keyword}
    </Typography>
  )
}
function Primitive({ primitive }: { primitive: string }) {
  const { palette } = useTheme()

  return (
    <>
      <FontAwesomeIcon color={palette.secondary.main} icon={faCube} style={{ marginRight: '4px' }} />
      <Typography color={palette.secondary.main} fontStyle='italic'>
        {primitive}
      </Typography>
    </>
  )
}
