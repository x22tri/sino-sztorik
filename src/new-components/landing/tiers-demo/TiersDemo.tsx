import { Box, IconButton, Typography } from '@mui/material'
import { Character } from '../../shared/interfaces'
import { CharacterPreviewsDemo } from './CharacterPreviewsDemo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Unless, When } from 'react-if'

export interface TiersDemoCharacter {
  charChinese: string
  tier: number
}

const characters = [
  { charChinese: '女', tier: 1 },
  { charChinese: '圭', tier: 2 },
  { charChinese: '娃', tier: 2 },
  { charChinese: '宀', tier: 1 },
  { charChinese: '安', tier: 1 },
  { charChinese: '木', tier: 1 },
  { charChinese: '案', tier: 2 },
  { charChinese: '桂', tier: 4 },
  { charChinese: '贝', tier: 1 },
  { charChinese: '婴', tier: 1 },
  { charChinese: '樱', tier: 4 },
  { charChinese: '林', tier: 1 },
  { charChinese: '夕', tier: 1 },
  { charChinese: '梦', tier: 3 },
  { charChinese: '火', tier: 1 },
  { charChinese: '炙', tier: 4 },
  { charChinese: '焚', tier: 3 },
  { charChinese: '目', tier: 1 },
  { charChinese: '相', tier: 1 },
  { charChinese: '厂', tier: 1 },
  { charChinese: '厢', tier: 4 },
  { charChinese: '未', tier: 1 },
  { charChinese: '朱', tier: 3 },
  { charChinese: '株', tier: 3 },
] as TiersDemoCharacter[] // Must be 24 characters.

export function TiersDemo() {
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
      <CharacterPreviewsDemo {...{ characters, currentTier }} />

      <Box marginTop={2} textAlign='center'>
        <IconButton onClick={decrementTier} sx={{ ml: 'auto', visibility: currentTier === 1 ? 'hidden' : 'visible' }}>
          <FontAwesomeIcon icon={faChevronLeft} size='xs' />
        </IconButton>

        <Typography marginX={4} variant='overline'>
          {currentTier}. kör
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
