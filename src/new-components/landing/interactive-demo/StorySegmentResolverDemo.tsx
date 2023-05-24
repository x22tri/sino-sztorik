import { Box, Link } from '@mui/material'
import { demoContent } from './demoContent'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { Segment as SegmentType, StoryParagraphKeys } from '../../shared/interfaces'
import { Segment } from '../../learn/story/Segment'

export function StorySegmentResolverDemo({
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
