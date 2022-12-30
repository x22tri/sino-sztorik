import { ReactNode, FC, ElementType } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import { Display } from '../shared/utility-components'
import Stack from '@mui/material/Stack'
import { Character, ChipType, ChipIds, ChipId } from '../shared/interfaces'
import { chipConfig } from './info-chips/chipConfig'
import { LearnActionButton } from '../shared/basic-components'
import IconButton from '@mui/material/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'

export function Presentation({
  pinyin,
  explanation,
  keyword,
  charChinese,
  primitiveMeaning,
}: {
  pinyin?: string
  explanation?: string
  keyword?: string
  charChinese: string
  primitiveMeaning?: string
}) {
  const { palette } = useTheme()

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Display if={pinyin}>
        <Box fontStyle='italic' fontSize='90%'>
          {pinyin}
        </Box>
      </Display>

      <Box typography='chineseHeading' marginBottom={1}>
        {charChinese}
      </Box>

      <Display if={keyword}>
        <Box typography='h4' color={palette.primary.main} position='relative'>
          {keyword}

          <Display if={explanation}>
            <KeywordExplanation />
          </Display>
        </Box>
      </Display>

      <Display if={primitiveMeaning}>
        <Box typography='primitiveMeaning'>{primitiveMeaning}</Box>
      </Display>
    </Box>
  )
}
