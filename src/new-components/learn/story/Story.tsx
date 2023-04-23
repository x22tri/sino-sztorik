import Box from '@mui/material/Box'
import { Paragraph, Note } from '../../shared/interfaces'
import { SegmentResolver } from './SegmentResolver'
import { NoteResolver } from './NoteResolver'

export default function Story({ story }: { story: Paragraph[] }) {
  return (
    <Box marginY={1}>
      {story.map((paragraph, index) =>
        isNote(paragraph) ? <NoteResolver note={paragraph} key={index} /> : <SegmentResolver segments={paragraph} key={index} />
      )}
    </Box>
  )
}

function isNote(paragraph: Paragraph): paragraph is Note {
  return !Array.isArray(paragraph)
}
