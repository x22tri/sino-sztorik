import { Box, Link } from '@mui/material'
import { Fragment } from 'react'
import { Segment as SegmentType, StoryParagraphKeys } from '../../shared/interfaces'
import { Segment } from '../../learn/story/Segment'

export function StorySegmentResolverDemo({
  onLinkClick,
  segments,
}: {
  onLinkClick: (char: string) => void
  segments: SegmentType[]
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
                <Link color='secondary' variant='body2' onClick={() => onLinkClick(segment.references)}>
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
