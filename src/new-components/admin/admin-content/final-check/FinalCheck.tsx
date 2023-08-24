import { useState } from 'react'
import LearnContent from '../../../learn/LearnContent'
import { CHARS } from '../../../shared/MOCK_CHARS'

export function FinalCheck() {
  const [selectedTierIndex, selectTierIndex] = useState(0)

  // Convert charFormData + timelineData into Character[] + {tier: x}
  // If not present in tier, return "Character not present in tier" conditionally instead of LearnContent
  const lesson = { characters: CHARS }

  const selectedChar = lesson.characters[selectedTierIndex]
  const prevChar = lesson.characters[selectedTierIndex - 1] ?? null
  const nextChar = lesson.characters[selectedTierIndex + 1] ?? null

  return (
    <LearnContent
      lessonChar={selectedChar}
      prevChar={prevChar?.glyph} // Instead of glyph, show tier
      nextChar={nextChar?.glyph} // Instead of glyph, show tier
      selectCharIndex={(index: number) => selectTierIndex(index)}
      selectedCharIndex={selectedTierIndex}
    />
  )
}
