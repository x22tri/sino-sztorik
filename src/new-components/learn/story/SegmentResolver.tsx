import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import {
  Segment as SegmentType,
  SegmentKey,
  SegmentStyles,
  StoryParagraphKeys,
} from '../../shared/interfaces'
import { Fragment } from 'react'
import { Segment } from './Segment'

export function SegmentResolver({ segments }: { segments: SegmentType[] }) {
  const { KEYWORD, PRIMITIVE, CONSTITUENT } = StoryParagraphKeys
  const { typography } = useTheme()

  const styles: Record<SegmentKey, SegmentStyles> = {
    [KEYWORD]: { fontStyle: typography.storySegments.keyword },
    [PRIMITIVE]: { fontStyle: typography.storySegments.primitive },
    [CONSTITUENT]: { fontStyle: typography.storySegments.constituent },
  }

  return (
    <Box component='p' marginTop={3}>
      {segments.map((segment, index) => {
        if (typeof segment === 'string') {
          return <Fragment key={index}>{segment}</Fragment>
        }

        if (KEYWORD in segment) {
          return (
            <Segment
              key={index}
              styles={styles[KEYWORD]}
              text={segment[KEYWORD]}
            />
          )
        }

        if (PRIMITIVE in segment) {
          return (
            <Segment
              key={index}
              styles={styles[PRIMITIVE]}
              text={segment[PRIMITIVE]}
            />
          )
        }

        if (CONSTITUENT in segment) {
          return (
            <Segment
              key={index}
              styles={styles[CONSTITUENT]}
              text={<Link>{segment[CONSTITUENT]}</Link>}
            />
          )
        }

        return null
      })}
    </Box>
  )
}