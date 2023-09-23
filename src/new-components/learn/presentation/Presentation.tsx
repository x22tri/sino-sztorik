import Box from '@mui/material/Box'
import { Stack, useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Character } from '../../shared/interfaces'
import { SpotlightWrapper } from './SpotlightWrapper'

export function Presentation({ currentChar }: { currentChar: Character }) {
  const { palette, spacing } = useTheme()
  const { glyph, explanation, keyword, pinyin, primitive } = currentChar

  return (
    <Stack>
      <Box alignItems='center' alignSelf='flex-start' display='flex' flexDirection='column' mb={3}>
        <When condition={pinyin}>
          <SpotlightWrapper
            contentStyles={{ margin: 'auto', typography: 'pinyin', gridArea: 'pinyin' }}
            spotlightIf='productivePhonetic'
            {...{ currentChar }}
          >
            {pinyin}
          </SpotlightWrapper>
        </When>

        <SpotlightWrapper
          contentStyles={{ pb: 1, typography: 'chineseText', fontSize: 150, lineHeight: 1 }}
          spotlightIf='reminder'
          {...{ currentChar }}
        >
          {glyph}
        </SpotlightWrapper>
      </Box>

      <Stack alignSelf='flex-start' gridArea='meaning' gap={1}>
        <When condition={keyword}>
          <Box typography='h3' fontWeight='bold' position='relative'>
            {keyword}

            <When condition={explanation}>
              <KeywordExplanation explanation={explanation!} />
            </When>
          </Box>
        </When>

        {primitive && (
          <SpotlightWrapper
            contentStyles={{ fontSize: '2rem', fontStyle: 'italic' }}
            spotlightIf='newPrimitive'
            {...{ currentChar }}
          >
            <>
              <FontAwesomeIcon
                icon={faCube}
                color={palette.secondary.main}
                size='xs'
                style={{ marginBottom: '2px', marginRight: spacing(1), verticalAlign: 'middle' }}
              />
              {primitive}
            </>
          </SpotlightWrapper>
        )}
      </Stack>
    </Stack>
  )
}
