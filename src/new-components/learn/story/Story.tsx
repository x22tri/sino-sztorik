import { Paragraph as ParagraphType, Note } from '../../shared/interfaces'

import { SegmentResolver } from './SegmentResolver'
import { NoteResolver } from './NoteResolver'

export default function Story({ story }: { story: ParagraphType[] }) {
  return (
    <>
      {story.map((paragraph, index) =>
        isNote(paragraph) ? (
          <NoteResolver note={paragraph} key={index} />
        ) : (
          <SegmentResolver segments={paragraph} key={index} />
        )
      )}
    </>
  )
}

function isNote(paragraph: ParagraphType): paragraph is Note {
  return !Array.isArray(paragraph)
}
