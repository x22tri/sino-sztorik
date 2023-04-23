import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Segment as SegmentType, SegmentKey, SegmentStyles, StoryParagraphKeys } from '../../shared/interfaces'
import { Fragment } from 'react'
import { Segment } from './Segment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

export function SegmentResolver({ segments }: { segments: SegmentType[] }) {
  const { KEYWORD, PRIMITIVE, CONSTITUENT } = StoryParagraphKeys
  const { spacing, typography } = useTheme()

  const styles: Record<SegmentKey, SegmentStyles> = {
    [KEYWORD]: { fontStyle: { fontWeight: 'bold' } },
    [PRIMITIVE]: { fontStyle: { fontStyle: 'italic' } },
    [CONSTITUENT]: { fontStyle: typography.storySegments.constituent },
  }

  return (
    <Box component='p' marginY={3}>
      {segments.map((segment, index) => {
        if (typeof segment === 'string') {
          return <Fragment key={index}>{segment}</Fragment>
        }

        if (KEYWORD in segment) {
          return <Segment key={index} styles={styles[KEYWORD]} text={segment[KEYWORD]} />
        }

        if (PRIMITIVE in segment) {
          return (
            <Segment
              key={index}
              styles={styles[PRIMITIVE]}
              text={
                <>
                  <FontAwesomeIcon icon={faCube} color='#3366CC' size='xs' style={{ marginRight: spacing(0.5) }} />
                  {segment[PRIMITIVE]}
                </>
              }
            />
          )
        }

        if (CONSTITUENT in segment) {
          return <Segment key={index} styles={styles[CONSTITUENT]} text={<Link>{segment[CONSTITUENT]}</Link>} />
        }

        return null
      })}
    </Box>
  )
}
