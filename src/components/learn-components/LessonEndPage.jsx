import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTheme } from '@mui/system'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AuthContext from '../../context/AuthContext'
import {
  SecondaryColorButton,
  LowEmphasisOnColoredBGButton,
} from '../../component-library/GenericComponents'

import './LessonEndPage.css'

export default function LessonEndPage({ lessonIsReview }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const advanceLesson = async goToNextLesson => {
    if (lessonIsReview) navigate('/')
    else {
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/advance`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
          method: 'POST',
        }
      )
      // console.log(response.json())
      response = await response.json()
      if (response && goToNextLesson) navigate('/continue')
      else if (response) navigate('/')
    }
  }

  return (
    <Box
      className='lesson-end-page'
      sx={{ backgroundColor: theme.palette.primary.dark }}
    >
      <Box className='lesson-end-body'>
        <Box sx={{ color: theme.palette.secondary.main }}>
          <Typography variant='mainPageSecondaryHeading'>
            Lecke teljesítve!
          </Typography>
        </Box>

        <Box className='lesson-end-button-box'>
          {!lessonIsReview && (
            <SecondaryColorButton
              onClick={() => advanceLesson(true)}
              text='Következő lecke'
            />
          )}

          <LowEmphasisOnColoredBGButton
            onClick={() => advanceLesson(false)}
            text='Kilépés a leckeválasztóba'
          />
        </Box>
      </Box>
    </Box>
  )
}
