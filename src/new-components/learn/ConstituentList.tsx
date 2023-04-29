import { useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { useLearn } from './logic/useLearn'
import { Character } from '../shared/interfaces'

export function ConstituentList({
  phrases = false,
  constituents,
  emphasize = 'primitive',
  lessonChar,
}: {
  phrases?: boolean
  constituents: string[]
  emphasize?: 'keyword' | 'primitive'
  lessonChar: Character
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const isSmallScreen = useSmallScreen()

  const { startFlashback } = useLearn()

  return (
    <Box
      display='flex'
      justifyContent={!phrases ? 'flex-start' : isSmallScreen ? 'center' : 'flex-end'}
      alignItems='center'
      gap={3}
      marginBottom={phrases && isSmallScreen ? 1 : 3}
    >
      {constituents.map((constituent, index) => {
        const isHovered = hoveredIndex === index

        return (
          <Button
            key={index}
            variant='text'
            onClick={() => {
              setHoveredIndex(null)
              startFlashback(constituent, lessonChar)
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            startIcon={<CharChinese {...{ constituent, emphasize, isHovered }} />}
            sx={{
              flexDirection: phrases ? 'column' : 'row',
              boxShadow: 'none',
              textTransform: 'none',
              p: 0,
              '.MuiButton-startIcon': { marginRight: phrases ? 0 : 1 },
              '&.MuiButtonBase-root': {
                '&:hover': { boxShadow: 'none', backgroundColor: 'initial' },
              },
            }}
          >
            <Box display='flex' flexDirection='column' alignItems={phrases ? 'center' : 'flex-start'}>
              <Keyword keyword='keyword' {...{ emphasize, isHovered }} />
              <Primitive primitive='primitive' {...{ emphasize, isHovered }} />
            </Box>
          </Button>
        )
      })}
    </Box>
  )
}

export function CharChinese({
  constituent,
  emphasize,
  isHovered,
}: {
  constituent: string
  emphasize: 'keyword' | 'primitive'
  isHovered: boolean
}) {
  const { constants, palette } = useTheme()

  const colorBase = emphasize === 'keyword' ? palette.neutral : palette.secondary

  const colorHovered = emphasize === 'keyword' ? palette.primary : palette.secondary

  return (
    <Typography
      variant='chineseNormal'
      sx={{
        color: isHovered ? colorBase.contrastText : palette.text.primary,
        backgroundColor: isHovered ? colorHovered.main : colorBase.light,
        borderRadius: 6,
        p: 1,
        lineHeight: 1,
        transition: constants.animationDuration,
      }}
    >
      {constituent}
    </Typography>
  )
}

export function Keyword({
  emphasize,
  keyword,
  isHovered,
}: {
  emphasize?: 'keyword' | 'primitive'
  keyword: string
  isHovered: boolean
}) {
  const { constants, palette, typography } = useTheme()

  return (
    <Typography
      component='span'
      sx={{
        ...typography.storySegments.keyword,
        color: isHovered ? palette.primary.main : emphasize === 'keyword' ? palette.text.primary : palette.text.disabled,
        fontSize: emphasize === 'keyword' ? '100%' : '80%',
        transition: constants.animationDuration,
      }}
      lineHeight={1}
    >
      {keyword}
    </Typography>
  )
}

export function Primitive({
  emphasize,
  isHovered,
  primitive,
}: {
  emphasize?: 'keyword' | 'primitive'
  isHovered: boolean
  primitive: string
}) {
  const { constants, palette, typography } = useTheme()

  return (
    <Typography
      component='span'
      lineHeight={1.1}
      sx={{
        ...typography.storySegments.primitive,
        color: isHovered ? palette.secondary.main : emphasize === 'primitive' ? palette.text.primary : palette.text.disabled,
        fontSize: emphasize === 'primitive' ? 'initial' : '80%',
        transition: constants.animationDuration,
      }}
    >
      {primitive}
    </Typography>
  )
}
