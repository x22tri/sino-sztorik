const keywordPrimitiveStatusFinder = character =>
  !character || !(character.keyword || character.primitiveMeaning)
    ? 'none'
    : !character.keyword
    ? 'primitiveOnly'
    : !character.primitiveMeaning
    ? 'keywordOnly'
    : 'keywordAndPrimitive'

// This helper function uses keywordPrimitiveStatusFinder to show the "character name" of a character,
// i.e. if the character lacks a keyword, it will return its primitiveMeaning.
// In case it has both a keyword and a primitive meaning, it returns both.
const characterNameFinder = character => {
  if (!character) return

  const displayedElements = {
    primitiveOnly: ['primitiveMeaning', undefined],
    keywordOnly: ['keyword', undefined],
    keywordAndPrimitive: ['keyword', 'primitiveMeaning'],
    none: [undefined, undefined],
  }

  const [mainProperty, secondaryProperty] =
    displayedElements[keywordPrimitiveStatusFinder(character)]

  const mainCharacterName = character[mainProperty]
  const secondaryCharacterName = character[secondaryProperty]

  return [mainCharacterName, secondaryCharacterName]
}

export { keywordPrimitiveStatusFinder, characterNameFinder }
