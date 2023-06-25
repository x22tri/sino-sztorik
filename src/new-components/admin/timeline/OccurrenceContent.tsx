import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Typography, useTheme } from '@mui/material'
import {
  SortedCharacterEntry,
  SortedOccurrences,
  isFullOccurrence,
  isReminder,
  isUnset,
  isWithheldKeywordOccurrence,
  isWithheldPrimitiveOccurrence,
} from '../../shared/logic/loadAdminChar'
import { BlueprintStepType } from './Timeline'
import { AddOccurrenceOptions } from './AddOccurrenceOptions'
import { getReminderContentType } from './getReminderContentType'

export function OccurrenceContent({
  addEntry,
  character,
  index,
  occurrences,
}: {
  addEntry: (atIndex: number, type: BlueprintStepType) => void
  character: SortedCharacterEntry
  index: number
  occurrences: SortedOccurrences
}) {
  const currentOccurrence = occurrences[index]

  if ('withhold' in currentOccurrence) {
    if (currentOccurrence.withhold === 'keyword') {
      return <Primitive primitive={character.primitive!} />
    }

    if (currentOccurrence.withhold === 'primitive') {
      return <Keyword keyword={character.keyword!} />
    }
  }

  if (isReminder(currentOccurrence)) {
    const reminderContentType = getReminderContentType(character, occurrences, index)

    switch (reminderContentType) {
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
      default:
        throw new Error('Reminder content invalid.')
    }
  }

  if (isUnset(currentOccurrence)) {
    return <AddOccurrenceOptions {...{ addEntry, character, occurrences, index }} />
  }

  return (
    <>
      <Keyword keyword={character.keyword!} />
      <Divider flexItem orientation='vertical' sx={{ borderColor: 'text.disabled', mx: 1 }} />
      <Primitive primitive={character.primitive!} />
    </>
  )

  // switch (type) {
  //   case 'keyword':
  //     return <Keyword keyword={character.keyword!} />
  //   case 'primitive':
  //     return <Primitive primitive={character.primitive!} />
  //   case 'keywordAndPrimitive':
  //     return (
  //       <>
  //         <Keyword keyword={character.keyword!} />
  //         <Divider flexItem orientation='vertical' sx={{ borderColor: 'text.disabled', mx: 1 }} />
  //         <Primitive primitive={character.primitive!} />
  //       </>
  //     )
  //   case 'unset':
  //     return <AddOccurrenceOptions {...{ addEntry, occurrences, index }} />
  //   case 'keywordLite':
  //     return <Keyword keyword={character.keyword!} />
  //   default:
  //     return <></>
}
export function Keyword({ keyword }: { keyword: string }) {
  const { palette } = useTheme()

  return (
    <Typography color={palette.primary.main} fontWeight='bold' margin='auto'>
      {keyword}
    </Typography>
  )
}
export function Primitive({ primitive }: { primitive: string }) {
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
