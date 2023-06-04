import { Box, IconButton, Typography } from '@mui/material'
import { CharacterPreviewsDemo } from './CharacterPreviewsDemo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { tiersDemoContent } from './tiersDemoContent'
import useTranslation from '../../shared/localization/useTranslation'

export function TiersDemo() {
  const strings = useTranslation()
  const [currentTier, setCurrentTier] = useState(1)

  function decrementTier() {
    if (currentTier !== 1) {
      setCurrentTier(prev => prev - 1)
    }
  }

  function incrementTier() {
    if (currentTier !== 4) {
      setCurrentTier(prev => prev + 1)
    }
  }

  return (
    <>
      <CharacterPreviewsDemo characters={tiersDemoContent} {...{ currentTier }} />

      <Box marginTop={2} textAlign='center'>
        <IconButton onClick={decrementTier} sx={{ ml: 'auto', visibility: currentTier === 1 ? 'hidden' : 'visible' }}>
          <FontAwesomeIcon icon={faChevronLeft} size='xs' />
        </IconButton>

        <Typography marginX={4} variant='overline'>
          {strings.formatString(strings.landing.section2.tierText, currentTier)}
        </Typography>

        <IconButton onClick={incrementTier} sx={{ mr: 'auto', visibility: currentTier === 4 ? 'hidden' : 'visible' }}>
          <FontAwesomeIcon icon={faChevronRight} size='xs' />
        </IconButton>
      </Box>

      <Box textAlign='center' mt={-2}>
        {[...Array(4).keys()].map(tierIndex => {
          return (
            <Box
              component='span'
              color={tierIndex + 1 === currentTier ? 'primary.main' : 'grey.300'}
              key={tierIndex}
              sx={{ transition: ({ constants }) => constants.animationDuration }}
            >
              ●
            </Box>
          )
        })}
      </Box>
    </>
  )
}
