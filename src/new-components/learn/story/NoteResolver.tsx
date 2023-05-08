import { useTheme } from '@mui/material'
import { NoteKey, NoteKeys, NoteStyles, Note } from '../../shared/interfaces'
import { SPECIAL_PARAGRAPH_GENERIC, SPECIAL_PARAGRAPH_TIP, SPECIAL_PARAGRAPH_WHENPRIMITIVE } from '../../shared/strings'
import { NoteElement } from './NoteElement'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { faCubes, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export function NoteResolver({ note }: { note: Note }) {
  const { GENERIC, TIP, WHENPRIMITIVE } = NoteKeys
  const { noteType, noteText, noteTitle } = note
  const type = noteType ?? GENERIC

  const { palette } = useTheme()

  const styles: Record<NoteKey, NoteStyles> = {
    [GENERIC]: {
      backgroundColor: palette.neutral.light,
      textColor: palette.text.primary,
      title: SPECIAL_PARAGRAPH_GENERIC,
      icon: faInfoCircle,
    },
    [TIP]: {
      backgroundColor: palette.warning.light,
      textColor: palette.warning.dark,
      title: SPECIAL_PARAGRAPH_TIP,
      icon: faLightbulb,
    },
    [WHENPRIMITIVE]: {
      backgroundColor: palette.secondary[100]!,
      textColor: palette.secondary.main,
      title: SPECIAL_PARAGRAPH_WHENPRIMITIVE,
      icon: faCubes,
    },
  }

  return (
    <NoteElement
      backgroundColor={styles[type].backgroundColor}
      textColor={styles[type].textColor}
      icon={styles[type].icon}
      text={noteText}
      title={noteTitle ?? styles[type].title} // Allows for title overrides.
    />
  )
}
