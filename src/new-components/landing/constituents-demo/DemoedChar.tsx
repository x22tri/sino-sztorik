import { Box, Typography } from '@mui/material'
import { DemoContentChar } from './demoContent'
import { Segment as SegmentType } from '../../shared/interfaces'
import { StorySegmentResolverDemo } from './StorySegmentResolverDemo'

export function DemoedChar({ char, onLinkClick }: { char: DemoContentChar; onLinkClick: (char: string) => void }) {
  const { charChinese, keyword, story } = char

  return (
    <Box
      bgcolor='background.paper'
      borderRadius={1}
      key={charChinese} // Resets animation on charChinese change.
      marginX='auto'
      maxWidth='28ch'
      padding={1}
      textAlign='justify'
      typography='chineseText'
      sx={{
        animationDuration: ({ constants }) => constants.animationDuration,
        animationName: 'fade-in',
        '@keyframes fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      }}
    >
      <Typography display='flex' justifyContent='center' variant='chineseText' fontSize={80} width={1}>
        {charChinese}
      </Typography>

      <Typography display='flex' justifyContent='center' variant='h4'>
        {keyword}
      </Typography>

      {story.map((paragraph, index) => (
        <StorySegmentResolverDemo key={index} segments={paragraph as SegmentType[]} {...{ onLinkClick }} />
      ))}
    </Box>
  )
}
