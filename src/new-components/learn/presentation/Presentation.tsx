import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

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
  const { spacing } = useTheme()

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
      <When condition={pinyin}>
        <Box typography='presentation.pinyin' gridArea='pinyin' margin='auto' lineHeight={1}>
          {pinyin}
        </Box>
      </When>

      <Box typography='chineseHeading' marginBottom={1} gridArea='char' margin='auto'>
        {charChinese}
      </Box>

      <When condition={keyword}>
        <Box fontSize={32} fontWeight='800' lineHeight={1} gridArea='keyword' margin='auto' position='relative'>
          {keyword}

          <When condition={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </When>
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <Box fontSize={20} fontStyle='italic' lineHeight={1} gridArea='primitive' margin='auto' textAlign='center'>
          <FontAwesomeIcon
            icon={faCube}
            color='#3366CC'
            size='xs'
            style={{ marginBottom: '2px', marginRight: spacing(1), verticalAlign: 'middle' }}
          />
          {primitiveMeaning}
        </Box>
      </When>
    </Box>
  )
}
