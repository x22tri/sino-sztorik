import { useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSmallScreen } from '../shared/utility-functions'

export function ConstituentList({
  centered = false,
  constituents,
  emphasize = 'primitive',
  startFlashback,
}: {
  centered?: boolean
  constituents: string[]
  emphasize?: 'keyword' | 'primitive'
  startFlashback: (constituent: string) => void
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const isSmallScreen = useSmallScreen()

  return (
    <Box
      display='flex'
      justifyContent={
        !centered ? 'flex-start' : isSmallScreen ? 'center' : 'flex-end'
      }
      alignItems='center'
      gap={3}
    >
      {constituents.map((constituent, index) => {
        const isHovered = hoveredIndex === index

        return (
          <Button
            key={index}
            variant='text'
            onClick={() => {
              setHoveredIndex(null)
              startFlashback(constituent)
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            startIcon={<CharChinese {...{ constituent, isHovered }} />}
            sx={{
              flexDirection: centered ? 'column' : 'row',
              // justifyContent: 'center',
              boxShadow: 'none',
              textTransform: 'none',
              p: 0,
              '.MuiButton-startIcon': {
                marginRight: centered ? 0 : 1,
              },
              '&.MuiButtonBase-root': {
                '&:hover': { boxShadow: 'none', backgroundColor: 'initial' },
              },
            }}
          >
            <Box
              display='flex'
              flexDirection='column'
              alignItems={centered ? 'center' : 'flex-start'}
            >
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
  isHovered,
}: {
  constituent: string
  isHovered: boolean
}) {
  const { constants, palette } = useTheme()

  return (
    <Typography
      variant='chineseNormal'
      sx={{
        color: isHovered
          ? palette.secondary.contrastText
          : palette.text.primary,
        backgroundColor: isHovered
          ? palette.secondary.main
          : palette.secondary.light,
        borderRadius: 6,
        p: 1,
        lineHeight: 1,
        transition: `${constants.animationDuration}ms`,
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
        color: isHovered
          ? palette.primary.main
          : emphasize === 'keyword'
          ? palette.text.primary
          : palette.text.disabled,
        fontSize: emphasize === 'keyword' ? '100%' : '80%',
        transition: `${constants.animationDuration}ms`,
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
        color: isHovered
          ? palette.secondary.main
          : emphasize === 'primitive'
          ? palette.text.primary
          : palette.text.disabled,
        fontSize: emphasize === 'primitive' ? 'initial' : '80%',
        transition: `${constants.animationDuration}ms`,
      }}
    >
      {primitive}
    </Typography>
  )
}
