const keywordPrimitiveStatusFinder = (character) => {
  let keywordPrimitiveStatus;

  if (!character || (!character.keyword && !character.primitiveMeaning)) {
    keywordPrimitiveStatus = 'none'
  } else if (!character.keyword) {
    keywordPrimitiveStatus = 'primitiveOnly'
  } else if (!character.primitiveMeaning) {
    keywordPrimitiveStatus = 'keywordOnly'
  } else {
    keywordPrimitiveStatus = 'keywordAndPrimitive'
  }

  return keywordPrimitiveStatus;
}

// This helper function uses keywordPrimitiveStatusFinder to show the "character name" of a character,
// i.e. if the character lacks a keyword, it will return its primitiveMeaning.
// In case it has both a keyword and a primitive meaning, it returns both.
const characterNameFinder = (character) => {

  // if (!character) return;

  const displayedElements = {
    primitiveOnly: ['primitiveMeaning'],
    keywordOnly: ['keyword'],
    keywordAndPrimitive: ['keyword', 'primitiveMeaning'],
    none: [undefined]
  }

  const [ mainCharacterName, secondaryCharacterName ] = [
    character[displayedElements[keywordPrimitiveStatusFinder(character)][0]], 
    character[displayedElements[keywordPrimitiveStatusFinder(character)][1]]
  ]

  return [ mainCharacterName, secondaryCharacterName ]
}

export { keywordPrimitiveStatusFinder, characterNameFinder }
