import Box from '@mui/material/Box'
import { Stack, Typography, useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { Character } from '../../shared/interfaces'

export function Presentation({ currentChar }: { currentChar: Character }) {
  const { palette, spacing } = useTheme()
  const { glyph, explanation, keyword, pinyin, primitive } = currentChar

  return (
    <Stack>
      <Stack alignItems='center' alignSelf='flex-start' mb={3}>
        <When condition={pinyin}>
          <Typography m='auto' variant='pinyin'>
            {pinyin}
          </Typography>
        </When>

        <Typography variant='chineseText' fontSize={150} lineHeight={1}>
          {glyph}
        </Typography>
      </Stack>

      {/* <Stack alignSelf='flex-start' gridArea='meaning' gap={1}> */}
      <When condition={keyword}>
        <Box typography='h3' fontWeight='bold' position='relative' mb={1}>
          {keyword}

          <When condition={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </When>
        </Box>
      </When>

      {primitive && (
        <Typography fontSize='1.8rem' fontStyle='italic'>
          <FontAwesomeIcon
            icon={faCube}
            color={palette.secondary.main}
            size='xs'
            style={{ marginBottom: '2px', marginRight: spacing(1), verticalAlign: 'middle' }}
          />
          {primitive}
        </Typography>
      )}
    </Stack>
    // </Stack>
  )
}
