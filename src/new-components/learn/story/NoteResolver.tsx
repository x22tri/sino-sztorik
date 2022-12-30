import { useTheme } from '@mui/material'
import { NoteKey, NoteKeys, NoteStyles, Note } from '../../shared/interfaces'
import {
  SPECIAL_PARAGRAPH_GENERIC,
  SPECIAL_PARAGRAPH_TIP,
  SPECIAL_PARAGRAPH_WHENPRIMITIVE,
} from '../../shared/strings'
import { NoteElement } from './NoteElement'

export function NoteResolver({ note }: { note: Note }) {
  const { GENERIC, TIP, WHENPRIMITIVE } = NoteKeys
  const { noteType, noteText, noteTitle } = note
  const type = noteType ?? GENERIC

  const { palette } = useTheme()

  const styles: Record<NoteKey, NoteStyles> = {
    [GENERIC]: {
      color: palette.specialParagraphs.generic,
      title: SPECIAL_PARAGRAPH_GENERIC,
    },
    [TIP]: {
      color: palette.specialParagraphs.tip,
      title: SPECIAL_PARAGRAPH_TIP,
    },
    [WHENPRIMITIVE]: {
      color: palette.specialParagraphs.whenPrimitive,
      title: SPECIAL_PARAGRAPH_WHENPRIMITIVE,
    },
  }

  return (
    <NoteElement
      color={styles[type].color}
      text={noteText}
      title={noteTitle ?? styles[type].title} // Allows for title overrides.
    />
  )
}
