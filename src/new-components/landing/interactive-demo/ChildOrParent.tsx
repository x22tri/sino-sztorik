import { Box, Typography } from '@mui/material'
import { DemoContentRelationshipChar } from '../DEMO_CONTENT'
import { Dispatch, SetStateAction } from 'react'

export function ChildOrParent({
  char,
  setDemoedCharChinese,
}: {
  char: DemoContentRelationshipChar
  setDemoedCharChinese: Dispatch<SetStateAction<string>>
}) {
  return (
    <Box
      borderRadius={1}
      minWidth='72px'
      onClick={() => setDemoedCharChinese(char.charChinese)}
      padding={1}
      textAlign='center'
      sx={{
        transition: ({ constants }) => constants.animationDuration,
        bgcolor: ({ palette }) => `${palette.background.default}66`,
        ':hover': { cursor: 'pointer', bgcolor: 'background.paper' },
      }}
    >
      <Typography variant='chineseText'>{char.charChinese}</Typography>

      <Typography variant='h6'>{char.keyword}</Typography>
    </Box>
  )
}
