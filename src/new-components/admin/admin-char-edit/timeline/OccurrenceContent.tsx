import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Typography, useTheme } from '@mui/material'
import { CharFormData, CharTimelineData } from '../../../shared/route-loaders/loadCharEdit'
import { OccurrenceType, OccurrencePresentation } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { AddOccurrenceOptions } from './AddOccurrenceOptions'

export function OccurrenceContent({
  addEntry,
  charFormData,
  index,
  timelineData,
  type,
}: {
  addEntry: (atIndex: number, type: OccurrenceType) => void
  charFormData: CharFormData
  index: number
  timelineData: CharTimelineData
  type: OccurrencePresentation
}) {
  switch (type) {
    case 'keyword':
    case 'keywordLite':
      return <Keyword keyword={charFormData.keyword!} />
    case 'primitive':
      return <Primitive primitive={charFormData.primitive!} />
    case 'keywordAndPrimitive':
      return (
        <>
          <Keyword keyword={charFormData.keyword!} />
          <Divider flexItem orientation='vertical' sx={{ borderColor: 'text.disabled', mx: 1 }} />
          <Primitive primitive={charFormData.primitive!} />
        </>
      )
    case 'unset':
      return <AddOccurrenceOptions {...{ addEntry, charFormData, timelineData, index }} />
    default:
      return <></>
  }
}
function Keyword({ keyword }: { keyword: string }) {
  return (
    <Typography component='span' variant='h4' fontWeight='bold'>
      {keyword}
    </Typography>
  )
}
function Primitive({ primitive }: { primitive: string }) {
  const { palette, spacing } = useTheme()

  return (
    <>
      <FontAwesomeIcon color={palette.secondary.main} icon={faCube} style={{ marginRight: spacing(0.75) }} />

      <Typography component='span' variant='h4' fontWeight='normal' fontStyle='italic'>
        {primitive}
      </Typography>
    </>
  )
}
