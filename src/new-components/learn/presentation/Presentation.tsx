import Box from '@mui/material/Box'
import { Display } from '../../shared/utility-components'
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
    <Box display='flex' flexDirection='column' alignItems='center' marginY={4}>
      <Display if={pinyin}>
        <Box typography='presentation.pinyin'>{pinyin}</Box>
      </Display>

      <Box typography='chineseHeading' marginBottom={1}>
        {charChinese}
      </Box>

      <Display if={keyword}>
        <Box
          typography='presentation.keyword'
          color={palette.primary.main}
          position='relative'
        >
          {keyword}

          <Display if={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </Display>
        </Box>
      </Display>

      <Display if={primitiveMeaning}>
        <Box typography='presentation.primitive'>{primitiveMeaning}</Box>
      </Display>
    </Box>
  )
}
