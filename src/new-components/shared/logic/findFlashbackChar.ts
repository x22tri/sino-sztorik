import { CHARS } from '../../learn/MOCK_CHARS'
import { Character } from '../interfaces'

export function findFlashbackChar(char: string): Character | null {
  const charInLesson = CHARS.find(({ charChinese }) => charChinese === char)

  if (charInLesson) {
    return charInLesson
  }

  // To-Do: if the char is not in the lesson, fetch it from the server.

  return null
}