import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

export function Presentation({
  charChinese,
  explanation,
  keyword,
  pinyin,
  primitiveMeaning,
}: {
  charChinese: string
  explanation?: string
  keyword?: string
  pinyin?: string
  primitiveMeaning?: string
}) {
  const { spacing } = useTheme()

  return (
    <Box display='flex' flexDirection='column' alignItems='center' marginBottom={4}>
      <When condition={pinyin}>
        <Box typography='presentation.pinyin'>{pinyin}</Box>
      </When>

      <Box typography='chineseHeading' marginBottom={2}>
        {charChinese}
      </Box>

      <When condition={keyword}>
        <Box fontSize={32} fontWeight='800' position='relative'>
          {keyword}

          <When condition={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </When>
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <Box fontSize={20} fontStyle='italic'>
          <FontAwesomeIcon
            icon={faCube}
            color='#3366CC'
            size='xs'
            style={{ marginBottom: '2px', marginRight: spacing(0.5), verticalAlign: 'middle' }}
          />
          {primitiveMeaning}
        </Box>
      </When>
    </Box>
  )
}
