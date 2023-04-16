import { Box, Card, Typography, useTheme } from '@mui/material'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { When } from 'react-if'

const charWidth = '42px'
const minNumberOfColumns = 4
const maxNumberOfColumns = 6

export function CharacterPreviews({ characters }: { characters: string[] }) {
  const { palette, spacing } = useTheme()

  return (
    <Box zIndex={1} sx={{ bgcolor: palette.background.paper, gridArea: 'chars' }}>
      <When condition={characters.length}>
        <Box
          display='flex'
          flexDirection='column'
          sx={{ bgcolor: palette.grey[50], borderRadius: spacing(3), mx: 2, my: 2, py: 3 }}
        >
          <Typography marginX='auto' lineHeight={1} textAlign='center' variant='overline'>
            {characters.length} {CHARACTER_AMOUNT_LABEL}
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
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px',
                  m: 'auto',
                  maxWidth: charWidth,
                  typography: 'chineseNormal',
                  p: 1,
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
