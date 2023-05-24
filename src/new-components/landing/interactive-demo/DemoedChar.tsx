import { Box, Grow, Typography } from '@mui/material'
import { DemoContentChar } from '../DEMO_CONTENT'
import { Dispatch, SetStateAction } from 'react'
import { Segment as SegmentType } from '../../shared/interfaces'
import { StorySegmentResolverDemo } from './StorySegmentResolverDemo'

export function DemoedChar({
  char,
  setDemoedCharChinese,
}: {
  char: DemoContentChar
  setDemoedCharChinese: Dispatch<SetStateAction<string>>
}) {
  return (
    <Grow in={true}>
      <Box
        bgcolor='background.paper'
        borderRadius={1}
        margin='auto'
        maxWidth='24ch'
        padding={1}
        textAlign='justify'
        typography='chineseText'
      >
        <Typography display='flex' justifyContent='center' variant='chineseText' fontSize={80} width={1}>
          {char.charChinese}
        </Typography>

        <Typography display='flex' justifyContent='center' variant='h4'>
          {char.keyword}
        </Typography>

        {char.story.map((paragraph, index) => (
          <StorySegmentResolverDemo key={index} segments={paragraph as SegmentType[]} {...{ setDemoedCharChinese }} />
        ))}
      </Box>
    </Grow>
  )
}
