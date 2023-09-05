import { CHARS } from '../../shared/MOCK_CHARS'
import { Character } from '../../shared/interfaces'

export function findFlashbackChar(char: string): Character | null {
  const charInLesson = CHARS.find(({ glyph }) => glyph === char)

  if (charInLesson) {
    return charInLesson
  }

  // To-Do: if the char is not in the lesson, fetch it from the server.

  return null
}
