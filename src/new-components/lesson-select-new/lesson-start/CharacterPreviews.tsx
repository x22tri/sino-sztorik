import { Box, Card } from '@mui/material'

export function CharacterPreviews({ characters }: { characters: string[] }) {
  const charWidth = '42px'
  const minNumberOfColumns = 4
  const maxNumberOfColumns = 6

  return (
    <Box
      display='grid'
      gridTemplateColumns={`repeat(auto-fit, minmax(min(100%/${minNumberOfColumns}, max(${charWidth}, 100%/${maxNumberOfColumns})), 1fr))`}
      columnGap={1}
      rowGap={2}
    >
      {characters.map(char => (
        <Card
          key={char}
          component='span'
          sx={{
            maxWidth: charWidth,
            margin: 'auto',
            p: 1,
            typography: 'chineseNormal',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
        >
          {char}
        </Card>
      ))}
    </Box>
  )
}
