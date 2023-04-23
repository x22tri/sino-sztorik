import Box from '@mui/material/Box'
import { Typography, useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faCube, faCubes, faKey, faPencil, faVolumeLow } from '@fortawesome/free-solid-svg-icons'
import { ConstituentListNew } from '../ConstituentListNew'

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
  const hintMode = false

  return (
    <Box
      display='grid'
      gap={2}
      gridTemplateAreas={`
    "headingPinyin pinyin ."
    "headingChar char ."
    "headingKeyword keyword ."
    "headingPrimitive primitive ."
    "headingConstituents constituents ."
    `}
      gridTemplateColumns='1fr 1fr 1fr'
    >
      <When condition={pinyin}>
        <When condition={hintMode}>
          <HeadingChip
            backgroundColor='#DEF7F7'
            headingText='KIEJTÉS'
            icon={faVolumeLow}
            iconColor='#26D49D'
            gridArea='headingPinyin'
          />
        </When>
        <Box typography='presentation.pinyin' gridArea='pinyin' margin='auto' lineHeight={1}>
          {pinyin}
        </Box>
      </When>

      <When condition={hintMode}>
        <HeadingChip backgroundColor='#F8DAFB' headingText='ÍRÁSJEL' icon={faPencil} iconColor='#B73FEB' gridArea='headingChar' />
      </When>
      <Box typography='chineseHeading' marginBottom={1} gridArea='char' margin='auto'>
        {charChinese}
      </Box>

      <When condition={keyword}>
        <When condition={hintMode}>
          <HeadingChip
            backgroundColor='#FAEFDA'
            headingText='KULCSSZÓ'
            icon={faKey}
            iconColor='#F6AE2D'
            gridArea='headingKeyword'
          />
        </When>
        <Box fontSize={32} fontWeight='800' lineHeight={1} gridArea='keyword' margin='auto' position='relative'>
          {keyword}

          <When condition={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </When>
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <When condition={hintMode}>
          <HeadingChip
            backgroundColor='#DDE8FF'
            headingText='ALAPELEMKÉNT'
            icon={faCube}
            iconColor='#3366CC'
            gridArea='headingPrimitive'
          />
        </When>
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
    <Box display='flex' gap={0.5} alignItems='center' marginLeft='auto' {...{ gridArea }}>
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
