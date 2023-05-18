import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Segment as SegmentType, SegmentKey, SegmentStyles, StoryParagraphKeys } from '../../shared/interfaces'
import { Fragment } from 'react'
import { Segment } from './Segment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { useStore } from '../../shared/logic/useStore'

export function SegmentResolver({ segments }: { segments: SegmentType[] }) {
  const { KEYWORD, PRIMITIVE, CONSTITUENT } = StoryParagraphKeys
  const { palette, spacing, typography } = useTheme()
  const { startFlashback } = useStore('flashback')

  const styles: Record<SegmentKey, SegmentStyles> = {
    [KEYWORD]: { fontStyle: { fontWeight: 'bold' } },
    [PRIMITIVE]: { fontStyle: { fontStyle: 'italic' } },
    [CONSTITUENT]: { fontStyle: typography.storySegments.constituent },
  }

  return (
    <Box component='p' marginY={2}>
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
                  <FontAwesomeIcon
                    icon={faCube}
                    color={palette.secondary.main}
                    size='xs'
                    style={{ marginLeft: spacing(0.25), marginRight: spacing(0.5) }}
                  />
                  {segment[PRIMITIVE]}
                </>
              }
            />
          )
        }

        if (CONSTITUENT in segment) {
          return (
            <Segment
              key={index}
              styles={styles[CONSTITUENT]}
              text={
                <Link
                  color='secondary'
                  onClick={() => startFlashback(segment.references)}
                  sx={{ '&:hover': { bgcolor: 'secondary.100' } }}
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
