import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  faQuestion,
  faInfo,
  faLightbulb,
  faCubesStacked,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SegmentStyles, SpecialParagraphStyles } from '../shared/interfaces'
import {
  SPECIAL_PARAGRAPH_EXPLANATION,
  SPECIAL_PARAGRAPH_NOTES,
  SPECIAL_PARAGRAPH_TIP,
  SPECIAL_PARAGRAPH_WHENPRIMITIVE,
} from '../shared/strings'
import {
  Segment as SegmentType,
  SpecialParagraphKey,
  SpecialParagraph as SpecialParagraphType,
  Paragraph as ParagraphType,
  SpecialParagraphKeys,
  StoryType,
  StoryParagraphKeys,
  SegmentKey,
} from './MOCK_STORY'
import { Fragment } from 'react'

function isSpecialParagraph(
  paragraph: ParagraphType
): paragraph is SpecialParagraphType {
  return !Array.isArray(paragraph)
}

export default function Story({ story }: { story: StoryType }) {
  return (
    <>
      {story.map((paragraph, index) =>
        isSpecialParagraph(paragraph) ? (
          <SpecialParagraphResolver {...{ paragraph }} key={index} />
        ) : (
          <Box component='p' sx={{ px: 1, my: 1 }} key={index}>
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
      colors: palette.specialParagraphs.explanation,
      title: SPECIAL_PARAGRAPH_EXPLANATION,
      icon: faQuestion,
    },
    [NOTES]: {
      colors: palette.specialParagraphs.notes,
      title: SPECIAL_PARAGRAPH_NOTES,
      icon: faInfo,
    },
    [TIP]: {
      colors: palette.specialParagraphs.tip,
      title: SPECIAL_PARAGRAPH_TIP,
      icon: faLightbulb,
    },
    [WHENPRIMITIVE]: {
      colors: palette.specialParagraphs.whenPrimitive,
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
  const { colors, icon, title } = styles

  return (
    <Box
      display='flex'
      gap={2}
      borderRadius={1}
      padding={2}
      margin={1}
      sx={{ backgroundColor: colors.background }}
    >
      <Box display='flex' alignItems='center'>
        <FontAwesomeIcon
          mask={faCircle}
          size='3x'
          color={colors.main}
          transform='shrink-4'
          {...{ icon }}
        />
      </Box>

      <Box display='flex' flexDirection='column'>
        <Typography
          variant='overline'
          component='div'
          lineHeight={2}
          color={colors.main}
        >
          {title}
        </Typography>

        <Typography color={colors.text} variant='body2'>
          {typeof text === 'string' ? (
            <>{text}</>
          ) : (
            <Segments segments={text} />
          )}
        </Typography>
      </Box>
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
              text={segment[CONSTITUENT]}
            />
          )
        }

        return null
      })}
    </>
  )
}

function Segment({ styles, text }: { styles: SegmentStyles; text: string }) {
  return (
    <Typography component='span' sx={styles.fontStyle}>
      {text}
    </Typography>
  )
}
