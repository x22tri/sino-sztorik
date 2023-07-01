import { CharFormData } from '../../shared/logic/loadAdminChar'

export function hasNoKeyword(character: CharFormData) {
  return !('keyword' in character) || character.keyword === ''
}

export function hasNoPrimitive(character: CharFormData) {
  return !('primitive' in character) || character.primitive === ''
}
