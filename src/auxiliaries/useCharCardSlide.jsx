import { useState } from 'react'

// The following is the handler function for the previous/next arrow clicks / keypresses.
const useCharCardSlide = (
  lessonData,
  currentCharacterIndex,
  setCurrentCharacterIndex
) => {
  const [slideIn, setSlideIn] = useState(true)
  const [slideDirection, setSlideDirection] = useState('down') // Upon first render, the LessonStartPage slides down.
  const slideTimeout = 150
  const delayAfterSlide = 100

  // The function called when user wants to switch characters.
  const onArrowClick = direction => {
    if (!slideIn || !lessonData?.characters) return

    const increment = direction === 'left' ? -1 : 1
    const currChar = lessonData.characters[currentCharacterIndex]
    const nextChar = lessonData.characters[currentCharacterIndex + increment]

    // Doesn't let index change if user wants to go back from the beginning of a chapter array or forwards from the end.
    if (!currChar && !nextChar) return

    setSlideDirection(direction)
    setSlideIn(false)

    setTimeout(() => {
      setCurrentCharacterIndex(currentCharacterIndex + increment)
    }, slideTimeout)

    setTimeout(() => {
      setSlideDirection(direction === 'left' ? 'right' : 'left')
      setSlideIn(true)
    }, slideTimeout + delayAfterSlide)
  }

  return [slideIn, slideDirection, slideTimeout, onArrowClick]
}

export default useCharCardSlide
