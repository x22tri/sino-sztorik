import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LearnAppbar from './appbars/LearnAppbar'
import LessonMainPage from "./learn-components/LessonMainPage";
import LessonEndPage from "./learn-components/LessonEndPage";
import LessonStartPage from "./learn-components/LessonStartPage";

import AuthContext from "../context/auth-context";

import useEventListener from "../auxiliaries/useEventListener";
import useCharCardSlide from "../auxiliaries/useCharCardSlide";

import Slide from '@mui/material/Slide';

const SlideWrapper = ({slideIn, slideDirection, slideTimeout, content}) => (
  <div style={{ overflow: 'hidden' }}> {/* Needed to prevent horizontal scrollbar on slide. */}
    <Slide in={slideIn} direction={slideDirection} timeout={slideTimeout}>
        <div> {/* Needed to make Slide functional */}
        {content}
        </div>
    </Slide>
  </div>
)

const Learn = ({themeToggle}) => {
  const auth = useContext(AuthContext)
  let { lessonNumberToReview } = useParams()

  // Getting the current lesson's data from the server.
  const [lessonData, setLessonData] = useState()
  
  // Fetching the lesson to learn and changing the page title on mount.
  try {
  useEffect(() => {
      const fetchLesson = async () => {

        let APIendpoint
        if (lessonNumberToReview) {
          APIendpoint = `${process.env.REACT_APP_BACKEND_URL}/review/${lessonNumberToReview}`
          document.title = `Ismétlés (${lessonNumberToReview}. lecke) - Sino-sztorik`
        } else {
          APIendpoint = `${process.env.REACT_APP_BACKEND_URL}/learn`
          document.title = 'Tanulás - Sino-sztorik'
        }

        let response = await fetch(APIendpoint, {headers: {'Authorization': `Bearer ${auth.token}`}})
        response = await response.json()
        setLessonData(response.foundLesson)
    }
    fetchLesson()
    }, [auth.token, lessonNumberToReview])
  } catch (err) {
    throw new Error('Hiba a lecke lekérése közben.')
  }

  // Setting up useState for the flags that mark the user's "progress" in the database.
  // The currentArray variable is essentially a shorthand to reach the current lesson's content.
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(-1)

  // Using the custom "useCharCardSlide" hook to manage the Slide transitions.
  const [slideIn, slideDirection, slideTimeout, onArrowClick] = useCharCardSlide(lessonData, currentCharacterIndex, setCurrentCharacterIndex)

  // Setting up the hotkeys.
  const navigate = useNavigate()

  useEventListener('keydown', ({ key }) => {
    if (key === 'ArrowLeft') onArrowClick('left')
    if (key === 'ArrowRight') onArrowClick('right')
    if (key === 'Escape') navigate('/')
  })

  // Renders the LessonStartPage, the LessonEndPage or the CharPage conditionally.
  if (!lessonData) return <div>Betöltés...</div>
  else {
    let characterArray = lessonData.characters
    let currentChar = lessonData.characters[currentCharacterIndex] || undefined

    let showLessonStart = !!(currentCharacterIndex < 0)
    let showLessonEnd = !showLessonStart && !!(currentCharacterIndex > characterArray.length - 1)
    let showCharacterCard = !showLessonStart && !showLessonEnd

  return (
    <>
      <LearnAppbar lessonLength={characterArray.length} lastCharacterInLesson={characterArray?.length && characterArray[characterArray.length - 1].character || undefined}
        {...{currentChar, currentCharacterIndex, onArrowClick, themeToggle}}   
      />

      {showLessonStart && <SlideWrapper content={
        <LessonStartPage currentTier={lessonData.tier} currentLesson={lessonData.lessonNumber} lessonName={lessonData.name} preface={lessonData.preface}
          {...{characterArray, onArrowClick}}
        />} {...{slideIn, slideDirection, slideTimeout}} 
      />}

      {showLessonEnd && <SlideWrapper content={
        <LessonEndPage lessonIsReview={!!lessonNumberToReview} {...{onArrowClick}}
        />} {...{slideIn, slideDirection, slideTimeout}} 
      />}

      {showCharacterCard && <SlideWrapper content={
        <LessonMainPage {...{currentChar, characterArray, currentCharacterIndex, onArrowClick}} 
        />} {...{slideIn, slideDirection, slideTimeout}} 
      />}
    </>
  )
}
}

export default Learn