import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Segment as SegmentType, StoryParagraphKeys } from '../../shared/interfaces'
import { Fragment } from 'react'
import { Segment } from './Segment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { useStore } from '../../shared/logic/useStore'

export function SegmentResolver({ segments }: { segments: SegmentType[] }) {
  const { KEYWORD, PRIMITIVE, CONSTITUENT } = StoryParagraphKeys
  const { palette, spacing } = useTheme()
  const { startFlashback } = useStore('flashback')

  return (
    <Box component='p' marginY={2}>
      {segments.map((segment, index) => {
        if (typeof segment === 'string') {
          return <Fragment key={index}>{segment}</Fragment>
        }

        if (KEYWORD in segment) {
          return <Segment key={index} text={segment[KEYWORD]} typographyProps={{ fontWeight: 'bold' }} />
        }

        if (PRIMITIVE in segment) {
          return (
            <Segment
              key={index}
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
              typographyProps={{ fontStyle: 'italic' }}
            />
          )
        }

        if (CONSTITUENT in segment) {
          return (
            <Segment
              key={index}
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
