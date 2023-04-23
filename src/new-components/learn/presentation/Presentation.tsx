import Box from '@mui/material/Box'
import { Typography, useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faCube, faKey } from '@fortawesome/free-solid-svg-icons'

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
    <Box
      // alignItems='center'
      display='grid'
      gridTemplateAreas={`
    ". pinyin ."
    ". char ."
    "headingKeyword keyword ."
    "headingPrimitive primitive ."
    `}
      gridTemplateColumns='1fr 1fr 1fr'
      marginY={4}
    >
      <When condition={pinyin}>
        <Box typography='presentation.pinyin' gridArea='pinyin' margin='auto'>
          {pinyin}
        </Box>
      </When>

      <Box typography='chineseHeading' marginBottom={1} gridArea='char' margin='auto'>
        {charChinese}
      </Box>

      <When condition={keyword}>
        <HeadingChip
          backgroundColor='#FAEFDA'
          headingText='KULCSSZÓ'
          icon={faKey}
          iconColor='#F6AE2D'
          gridArea='headingKeyword'
        />
        <Box fontSize={32} fontWeight='800' gridArea='keyword' margin='auto' position='relative'>
          {keyword}

          <When condition={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </When>
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <HeadingChip
          backgroundColor='#DDE8FF'
          headingText='ALAPELEMKÉNT'
          icon={faCube}
          iconColor='#3366CC'
          gridArea='headingPrimitive'
        />
        <Box fontSize={20} fontStyle='italic' gridArea='primitive' margin='auto' textAlign='center'>
          {primitiveMeaning}
        </Box>
      </When>
    </Box>
  )
}

function HeadingChip({
  backgroundColor,
  gridArea,
  icon,
  iconColor,
  headingText,
}: {
  backgroundColor: string
  gridArea: string
  icon: IconDefinition
  iconColor: string
  headingText: string
}) {
  const { spacing } = useTheme()

  return (
    <Box display='flex' gap={0.5} alignItems='center' {...{ gridArea }}>
      <FontAwesomeIcon
        {...{ icon }}
        size='xs'
        color={iconColor}
        style={{ backgroundColor, borderRadius: spacing(1), padding: '6px' }}
      />
      <Typography variant='overline' color='text.secondary'>
        {headingText}
      </Typography>
    </Box>
  )
}
