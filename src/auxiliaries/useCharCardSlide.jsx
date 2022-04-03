import { useState } from "react";

// The following is the handler function for the previous/next arrow clicks / keypresses.
const useCharCardSlide = (lessonData, currentCharacterIndex, setCurrentCharacterIndex) => {

  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState('down'); // Upon first render, the LessonStartPage slides down.
  const slideTimeout = 150 

  // The function called when user wants to switch characters.
  const onArrowClick = (direction) => {
    if (!slideIn) return;

    const increment = direction === 'left' ? -1 : 1;
    let newIndex

    // Doesn't let index change if user wants to go back from the beginning of a chapter array or forwards from the end.
    if (!lessonData || (!lessonData.characters[currentCharacterIndex] && !lessonData.characters[currentCharacterIndex + increment])) {
      return;
    } else 
    newIndex = currentCharacterIndex + increment

    const oppDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setCurrentCharacterIndex(newIndex);
    }, slideTimeout)

    setTimeout(() => {
        setSlideDirection(oppDirection);
        setSlideIn(true);
    }, (slideTimeout + 100));
  };

  return [slideIn, slideDirection, slideTimeout, onArrowClick]

}

export default useCharCardSlide