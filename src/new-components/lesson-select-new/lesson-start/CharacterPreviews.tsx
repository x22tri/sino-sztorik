import { Box, Card, Paper, Typography, useTheme } from '@mui/material'
import { CHARACTERS_IN_LESSON_LABEL } from '../../shared/strings'
import { When } from 'react-if'

export function CharacterPreviews({ characters }: { characters: string[] }) {
  const { palette, spacing } = useTheme()

  const charWidth = '42px'
  const minNumberOfColumns = 4
  const maxNumberOfColumns = 6

  return (
    <Box zIndex={1} sx={{ bgcolor: palette.background.paper }}>
      <When condition={characters.length}>
        <Box
          display='flex'
          flexDirection='column'
          sx={{
            // boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px inset`,
            // border: `1px solid ${palette.grey[300]}`,
            // backgroundColor: palette.background.paper,
            backgroundColor: palette.grey[50],
            borderRadius: spacing(3),
            // maxHeight: '100%',
            mx: 1,
            my: 2,
            py: 3,
            // zIndex: 100000,
          }}
        >
          <Typography marginX='auto' lineHeight={1} textAlign='center' variant='overline'>
            {CHARACTERS_IN_LESSON_LABEL}
          </Typography>

          <Box
            display='grid'
            gridTemplateColumns={`repeat(auto-fit, minmax(min(100%/${minNumberOfColumns}, max(${charWidth}, 100%/${maxNumberOfColumns})), 1fr))`}
            columnGap={1}
            rowGap={2}
            marginX={2}
            marginTop={2}
          >
            {characters.map(char => (
              <Card
                key={char}
                component='span'
                sx={{
                  maxWidth: charWidth,
                  m: 'auto',
                  p: 1,
                  typography: 'chineseNormal',
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                }}
              >
                {char}
              </Card>
            ))}
          </Box>
        </Box>
      </When>
    </Box>
  )
}
