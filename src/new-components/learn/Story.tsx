import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import {
  faQuestion,
  faInfo,
  faLightbulb,
  faCubesStacked,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Paragraph as ParagraphType,
  NoteKey,
  NoteKeys,
  NoteStyles,
  Segment as SegmentType,
  SegmentKey,
  SegmentStyles,
  StoryParagraphKeys,
  Note,
} from '../shared/interfaces'
import {
  SPECIAL_PARAGRAPH_GENERIC,
  SPECIAL_PARAGRAPH_TIP,
  SPECIAL_PARAGRAPH_WHENPRIMITIVE,
} from '../shared/strings'
import { useStoryHorizontalPadding } from './useStoryHorizontalPadding'

import { Fragment, ReactNode } from 'react'

export default function Story({ story }: { story: ParagraphType[] }) {
  const horizontalPadding = useStoryHorizontalPadding()

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={3}
      // marginTop={4}
      marginBottom={3}
    >
      {story.map((paragraph, index) =>
        isNote(paragraph) ? (
          <NoteResolver note={paragraph} key={index} />
        ) : (
          <Box component='p' sx={{ px: horizontalPadding, my: 0 }} key={index}>
            <Segments segments={paragraph} />
          </Box>
        )
      )}
    </Box>
  )
}

function NoteResolver({ note }: { note: Note }) {
  const { GENERIC, TIP, WHENPRIMITIVE } = NoteKeys
  const { noteType, noteText, noteTitle } = note
  const type = noteType ?? GENERIC

  const { palette } = useTheme()

  const styles: Record<NoteKey, NoteStyles> = {
    [GENERIC]: {
      color: palette.specialParagraphs.generic,
      title: SPECIAL_PARAGRAPH_GENERIC,
    },
    [TIP]: {
      color: palette.specialParagraphs.tip,
      title: SPECIAL_PARAGRAPH_TIP,
    },
    [WHENPRIMITIVE]: {
      color: palette.specialParagraphs.whenPrimitive,
      title: SPECIAL_PARAGRAPH_WHENPRIMITIVE,
    },
  }

  return (
    <NoteElement
      color={styles[type].color}
      text={noteText}
      title={noteTitle ?? styles[type].title} // Allows for title overrides.
    />
  )
}

function NoteElement({
  color,
  text,
  title,
}: {
  color: string
  text: string | SegmentType[]
  title: string
}) {
  const horizontalPadding = useStoryHorizontalPadding()

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      sx={{
        background: color,
        borderRadius: '0 16px',
        py: 2,
        px: horizontalPadding,
      }}
    >
      <Box display='flex' alignItems='center' gap='8px'>
        <Typography variant='h6' component='div' lineHeight={2}>
          {title}
        </Typography>
      </Box>

      <Typography variant='body2'>
        {typeof text === 'string' ? <>{text}</> : <Segments segments={text} />}
      </Typography>
    </Box>
  )
}

function Segments({ segments }: { segments: SegmentType[] }) {
  const { KEYWORD, PRIMITIVE, CONSTITUENT } = StoryParagraphKeys
  const { typography } = useTheme()

  const styles: Record<SegmentKey, SegmentStyles> = {
    [KEYWORD]: {
      fontStyle: typography.storySegments.keyword,
    },
    [PRIMITIVE]: {
      fontStyle: typography.storySegments.primitive,
    },
    [CONSTITUENT]: {
      fontStyle: typography.storySegments.constituent,
    },
  }

  return (
    <>
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
    </>
  )
}

function Segment({
  styles,
  text,
}: {
  styles: SegmentStyles
  text: string | ReactNode
}) {
  return (
    <Typography component='span' sx={styles.fontStyle}>
      {text}
    </Typography>
  )
}

function isNote(paragraph: ParagraphType): paragraph is Note {
  return !Array.isArray(paragraph)
}
