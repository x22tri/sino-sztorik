import { useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export function ConstituentList({
  constituents,
  startFlashback,
}: {
  constituents: string[]
  startFlashback: (constituent: string) => void
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <Box display='flex' alignItems='center' gap={1} padding={1}>
      {constituents.map((constituent, index) => {
        const isHovered = hoveredIndex === index

        return (
          <Button
            key={index}
            variant='text'
            onClick={() => startFlashback(constituent)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            startIcon={<CharChinese {...{ constituent, isHovered }} />}
            sx={{
              boxShadow: 'none',
              textTransform: 'none',
              px: 1.5,
              '&.MuiButtonBase-root': {
                '&:hover': { boxShadow: 'none', backgroundColor: 'initial' },
              },
            }}
          >
            <Box display='flex' flexDirection='column' alignItems='flex-start'>
              <Keyword keyword='keyword' {...{ isHovered }} />
              <Primitive primitive='primitive' {...{ isHovered }} />
            </Box>
          </Button>
        )
      })}
    </Box>
  )
}

function CharChinese({
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

function Keyword({
  keyword,
  isHovered,
}: {
  keyword: string
  isHovered: boolean
}) {
  const { constants, palette, typography } = useTheme()

  return (
    <Typography
      component='span'
      sx={{
        ...typography.storySegments.keyword,
        color: isHovered ? palette.primary.main : palette.text.disabled,
        fontSize: '80%',
        transition: `${constants.animationDuration}ms`,
      }}
      lineHeight={1}
    >
      {keyword}
    </Typography>
  )
}

function Primitive({
  isHovered,
  primitive,
}: {
  isHovered: boolean
  primitive: string
}) {
  const { constants, palette, typography } = useTheme()

  return (
    <Typography
      component='span'
      lineHeight={1}
      sx={{
        ...typography.storySegments.primitive,
        color: isHovered ? palette.secondary.main : palette.text.primary,
        transition: `${constants.animationDuration}ms`,
      }}
    >
      {primitive}
    </Typography>
  )
}
