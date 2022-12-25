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
  Segment as SegmentType,
  SegmentKey,
  SegmentStyles,
  StoryParagraphKeys,
  SpecialParagraph as SpecialParagraphType,
  SpecialParagraphKey,
  SpecialParagraphKeys,
  SpecialParagraphStyles,
} from '../shared/interfaces'
import {
  SPECIAL_PARAGRAPH_EXPLANATION,
  SPECIAL_PARAGRAPH_NOTES,
  SPECIAL_PARAGRAPH_TIP,
  SPECIAL_PARAGRAPH_WHENPRIMITIVE,
} from '../shared/strings'
import { useStoryHorizontalPadding } from './LearnCharCardDetails'

import { Fragment, ReactNode } from 'react'

export default function Story({ story }: { story: ParagraphType[] }) {
  const isLast = (index: number) => index === story.length - 1

  const horizontalPadding = useStoryHorizontalPadding()

  return (
    <>
      {story.map((paragraph, index) =>
        isSpecialParagraph(paragraph) ? (
          <SpecialParagraphResolver {...{ paragraph }} key={index} />
        ) : (
          <Box
            component='p'
            sx={{
              px: horizontalPadding,
              my: 4,
              pb: isLast(index) ? 4 : 0,
            }}
            key={index}
          >
            <Segments segments={paragraph} />
          </Box>
        )
      )}
    </>
  )
}

function SpecialParagraphResolver({
  paragraph,
}: {
  paragraph: SpecialParagraphType
}) {
  const { EXPLANATION, TIP, NOTES, WHENPRIMITIVE } = SpecialParagraphKeys
  const { palette } = useTheme()

  const styles: Record<SpecialParagraphKey, SpecialParagraphStyles> = {
    [EXPLANATION]: {
      color: palette.specialParagraphs.explanation,
      title: SPECIAL_PARAGRAPH_EXPLANATION,
      icon: faQuestion,
    },
    [NOTES]: {
      color: palette.specialParagraphs.notes,
      title: SPECIAL_PARAGRAPH_NOTES,
      icon: faInfo,
    },
    [TIP]: {
      color: palette.specialParagraphs.tip,
      title: SPECIAL_PARAGRAPH_TIP,
      icon: faLightbulb,
    },
    [WHENPRIMITIVE]: {
      color: palette.specialParagraphs.whenPrimitive,
      title: SPECIAL_PARAGRAPH_WHENPRIMITIVE,
      icon: faCubesStacked,
    },
  }

  if (EXPLANATION in paragraph) {
    return (
      <SpecialParagraph
        styles={styles[EXPLANATION]}
        text={paragraph[EXPLANATION]}
      />
    )
  }

  if (NOTES in paragraph) {
    return <SpecialParagraph styles={styles[NOTES]} text={paragraph[NOTES]} />
  }

  if (TIP in paragraph) {
    return <SpecialParagraph styles={styles[TIP]} text={paragraph[TIP]} />
  }

  if (WHENPRIMITIVE in paragraph) {
    return (
      <SpecialParagraph
        styles={styles[WHENPRIMITIVE]}
        text={paragraph[WHENPRIMITIVE]}
      />
    )
  }

  return null
}

function SpecialParagraph({
  styles,
  text,
}: {
  styles: SpecialParagraphStyles
  text: string | SegmentType[]
}) {
  const { color, icon, title } = styles

  const { palette } = useTheme()

  const horizontalPadding = useStoryHorizontalPadding()

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      sx={{
        // background: palette.grey[200],
        // background: '#F6F0E9',
        background: '#FDEDED',
        borderRadius: '0 16px',
        my: 3,
        py: 2,
        px: horizontalPadding,
      }}
      // color={palette.grey[600]}
    >
      <Box
        display='flex'
        alignItems='center'
        // justifyContent='space-between'
        gap='8px'
      >
        {/* <FontAwesomeIcon
          mask={faCircle}
          size='lg'
          transform='shrink-4'
          // color={palette.grey[600]}
          {...{ icon }}
        /> */}
        {/* <Box display='flex' flexDirection='column'> */}
        <Typography
          variant='h6'
          component='div'
          lineHeight={2}
          // {...{ color }}
        >
          {title}
        </Typography>

        {/* <FontAwesomeIcon
          mask={faCircle}
          size='lg'
          transform='shrink-4'
          // color='#BDA07C'
          {...{ icon }}
        /> */}
      </Box>

      <Typography
        // color={palette.grey[600]}
        // color='#231f20'
        variant='body2'
      >
        {typeof text === 'string' ? <>{text}</> : <Segments segments={text} />}
      </Typography>
      {/* </Box> */}
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
              text={
                <Link
                  underline='hover'
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  {segment[CONSTITUENT]}
                </Link>
              }
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

function isSpecialParagraph(
  paragraph: ParagraphType
): paragraph is SpecialParagraphType {
  return !Array.isArray(paragraph)
}
