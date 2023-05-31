import { Box, IconButton, Typography } from '@mui/material'
import { Character } from '../../shared/interfaces'
import { CharacterPreviewsDemo } from './CharacterPreviewsDemo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export interface TiersDemoCharacter {
  charChinese: string
  tier: number
}

const characters = [
  { charChinese: '宀', tier: 1 },
  { charChinese: '女', tier: 1 },
  { charChinese: '安', tier: 1 },
  { charChinese: '木', tier: 1 },
  { charChinese: '案', tier: 2 },
  { charChinese: '贝', tier: 1 },
  { charChinese: '婴', tier: 1 },
  { charChinese: '樱', tier: 3 },
  { charChinese: '林', tier: 1 },
  { charChinese: '火', tier: 1 },
  { charChinese: '焚', tier: 2 },
  { charChinese: '目', tier: 1 },
  { charChinese: '相', tier: 1 },
  { charChinese: '厂', tier: 1 },
  { charChinese: '厢', tier: 4 },
  { charChinese: '棚', tier: 4 },
  { charChinese: '杜', tier: 3 },
] as TiersDemoCharacter[]

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
    <Box>
      <CharacterPreviewsDemo {...{ characters, currentTier }} />

      <Box marginTop={2} textAlign='center'>
        <IconButton onClick={decrementTier}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </IconButton>

        <Typography variant='overline'>{currentTier}. kör</Typography>

        <IconButton onClick={incrementTier}>
          <FontAwesomeIcon icon={faChevronRight} />
        </IconButton>
      </Box>
    </Box>
  )
}
