import { Box, Typography } from '@mui/material'
import { DemoContentRelationshipChar } from './useConstituentsDemoContent'

export function ChildOrParent({
  char,
  id,
  onLinkClick,
}: {
  char: DemoContentRelationshipChar
  id: string
  onLinkClick: (char: string) => void
}) {
  const { charChinese, keyword } = char

  return (
    <Box
      borderRadius={1}
      minWidth='72px'
      onClick={() => onLinkClick(charChinese)}
      padding={1}
      textAlign='center'
      sx={{
        transition: ({ constants }) => constants.animationDuration,
        bgcolor: 'primary.300',
        ':hover': { cursor: 'pointer', bgcolor: 'background.paper' },
      }}
      {...{ id }}
    >
      <Typography variant='chineseText'>{charChinese}</Typography>

      <Typography variant='h6'>{keyword}</Typography>
    </Box>
  )
}
