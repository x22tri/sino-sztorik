import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { When } from 'react-if'

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
      <When condition={pinyin}>
        <Box typography='presentation.pinyin'>{pinyin}</Box>
      </When>

      <Box typography='chineseHeading' marginBottom={1}>
        {charChinese}
      </Box>

      <When condition={keyword}>
        <Box
          typography='presentation.keyword'
          color={palette.primary.main}
          position='relative'
        >
          {keyword}

          <When condition={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </When>
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <Box typography='presentation.primitive'>{primitiveMeaning}</Box>
      </When>
    </Box>
  )
}
