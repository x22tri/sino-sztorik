import '@testing-library/jest-dom'
import {
  keywordPrimitiveStatusFinder,
  characterNameFinder,
} from './keywordPrimitiveStatusFinder'

it('returns none when character has neither keyword nor primitiveMeaning', () => {
  expect(keywordPrimitiveStatusFinder({ charChinese: 'a' })).toBe('none')
})

it('returns keywordOnly when character has keyword but no primitiveMeaning', () => {
  expect(keywordPrimitiveStatusFinder({ charChinese: 'a', keyword: 'b' })).toBe(
    'keywordOnly'
  )
})

it(`returns the char's primitive meaning as a name and undefined as the second parameter when the char only has a primitive`, () => {
  expect(
    characterNameFinder({ charChinese: 'a', primitiveMeaning: 'testing' })
  ).toEqual(['testing', undefined])
})
