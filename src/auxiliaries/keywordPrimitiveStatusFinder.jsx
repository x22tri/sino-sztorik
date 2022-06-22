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
    primitiveOnly: ['primitiveMeaning'],
    keywordOnly: ['keyword'],
    keywordAndPrimitive: ['keyword', 'primitiveMeaning'],
    none: [undefined],
  }

  const [mainCharacterName, secondaryCharacterName] = [
    character[displayedElements[keywordPrimitiveStatusFinder(character)]],
  ]

  return [mainCharacterName, secondaryCharacterName]
}

export { keywordPrimitiveStatusFinder, characterNameFinder }
