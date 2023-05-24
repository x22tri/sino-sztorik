import { Box, Grow, Link, Typography } from '@mui/material'
import { DemoContentChar, DemoContentRelationshipChar, demoContent } from './DEMO_CONTENT'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Segment as SegmentType, StoryParagraphKeys } from '../shared/interfaces'
import { Segment } from '../learn/story/Segment'

export function InteractiveDemo() {
  const [demoedCharChinese, setDemoedCharChinese] = useState('朋')
  const demoedChar = demoContent.find(({ charChinese }) => charChinese === demoedCharChinese)!

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Box display='flex' justifyContent='space-evenly'>
        {demoedChar.parents?.map((char, index) => (
          <ChildOrParent key={index} {...{ char, setDemoedCharChinese }} />
        ))}
      </Box>

      <DemoedChar char={demoedChar} {...{ setDemoedCharChinese }} />

      <Box display='flex' justifyContent='space-evenly'>
        {demoedChar.children?.map((char, index) => (
          <ChildOrParent key={index} {...{ char, setDemoedCharChinese }} />
        ))}
      </Box>
    </Box>
  )
}

function ChildOrParent({
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

function DemoedChar({
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

function StorySegmentResolverDemo({
  segments,
  setDemoedCharChinese,
}: {
  segments: SegmentType[]
  setDemoedCharChinese: Dispatch<SetStateAction<string>>
}) {
  const { KEYWORD, CONSTITUENT } = StoryParagraphKeys

  return (
    <Box component='p' marginY={1} padding={1} typography='body2'>
      {segments.map((segment, index) => {
        if (typeof segment === 'string') {
          return <Fragment key={index}>{segment}</Fragment>
        }

        if (KEYWORD in segment) {
          return <Segment key={index} text={segment[KEYWORD]} typographyProps={{ variant: 'body2', fontWeight: 'bold' }} />
        }

        if (CONSTITUENT in segment) {
          return (
            <Segment
              key={index}
              text={
                <Link
                  color='secondary'
                  variant='body2'
                  onClick={() => {
                    setDemoedCharChinese(demoContent.find(({ charChinese }) => charChinese === segment.references)!.charChinese)
                  }}
                >
                  {segment[CONSTITUENT]}
                </Link>
              }
            />
          )
        }

        return null
      })}
    </Box>
  )
}
