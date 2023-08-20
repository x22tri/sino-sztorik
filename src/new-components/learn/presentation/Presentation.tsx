import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Character } from '../../shared/interfaces'
import { SpotlightWrapper } from './SpotlightWrapper'

export function Presentation({ currentChar }: { currentChar: Character }) {
  const { palette, spacing } = useTheme()
  const { glyph, explanation, keyword, pinyin, primitiveMeaning } = currentChar

  return (
    <Box display='flex' flexDirection='column' alignItems='center' marginBottom={4}>
      <When condition={pinyin}>
        <SpotlightWrapper contentStyles={{ typography: 'pinyin', mb: 1 }} spotlightIf='productivePhonetic' {...{ currentChar }}>
          {pinyin}
        </SpotlightWrapper>
      </When>

      <SpotlightWrapper
        contentStyles={{ mb: 2, pb: 1, typography: 'chineseText', fontSize: 120, lineHeight: 1 }}
        spotlightIf='reminder'
        {...{ currentChar }}
      >
        {glyph}
      </SpotlightWrapper>

      <When condition={keyword}>
        <Box fontSize={32} fontWeight='800' position='relative'>
          {keyword}

          <When condition={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </When>
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <SpotlightWrapper contentStyles={{ fontSize: 20, fontStyle: 'italic' }} spotlightIf='newPrimitive' {...{ currentChar }}>
          <>
            <FontAwesomeIcon
              icon={faCube}
              color={palette.secondary.main}
              size='xs'
              style={{ marginBottom: '2px', marginRight: spacing(0.5), verticalAlign: 'middle' }}
            />
            {primitiveMeaning}
          </>
        </SpotlightWrapper>
      </When>
    </Box>
  )
}
