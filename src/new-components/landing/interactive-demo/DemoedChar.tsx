import { Box, Grow, Typography } from '@mui/material'
import { DemoContentChar } from './demoContent'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
    <Box
      bgcolor='background.paper'
      borderRadius={1}
      key={char.charChinese}
      marginX='auto'
      width='24ch'
      padding={1}
      textAlign='justify'
      typography='chineseText'
      sx={{
        animationDuration: ({ constants }) => constants.animationDuration,
        animationName: 'fade-in',
        '@keyframes fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        height: 'max-content',
      }}
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
  )
}
