import { Box, Typography } from '@mui/material'
import { DemoContentRelationshipChar } from './demoContent'
import { useStore } from '../../shared/logic/useStore'

export function ChildOrParent({ char, id }: { char: DemoContentRelationshipChar; id: string }) {
  const { setDemoedCharChinese } = useStore('interactiveDemo')

  return (
    <Box
      borderRadius={1}
      minWidth='72px'
      onClick={() => setDemoedCharChinese(char.charChinese)}
      padding={1}
      textAlign='center'
      sx={{
        transition: ({ constants }) => constants.animationDuration,
        bgcolor: 'primary.300',
        ':hover': { cursor: 'pointer', bgcolor: 'background.paper' },
      }}
      {...{ id }}
    >
      <Typography variant='chineseText'>{char.charChinese}</Typography>

      <Typography variant='h6'>{char.keyword}</Typography>
    </Box>
  )
}
