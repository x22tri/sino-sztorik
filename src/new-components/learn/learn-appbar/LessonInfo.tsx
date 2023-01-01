import Box from '@mui/material/Box'
import { Button, Typography, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/utility-functions'
import { Character } from '../../shared/interfaces'
import { LessonInfoMobile } from './LessonInfoMobile'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function LessonInfo({
  charToReturnToFromFlashback,
  lessonNumber,
  lessonTitle,
  returnFromFlashback,
}: {
  charToReturnToFromFlashback: Character | null
  lessonNumber: number
  lessonTitle: string
  returnFromFlashback: () => void
}) {
  const { palette } = useTheme()

  const logoImage = require(`../../../assets/logo.png`)

  const isSmallScreen = useSmallScreen()

  return isSmallScreen ? (
    <LessonInfoMobile
      {...{ charToReturnToFromFlashback, lessonNumber, returnFromFlashback }}
    />
  ) : (
    <Box display='flex' flexDirection='row' marginX={1} gap={1}>
      {charToReturnToFromFlashback ? (
        <ReturnFromFlashback
          {...{ charToReturnToFromFlashback, returnFromFlashback }}
        />
      ) : (
        <>
          <img src={logoImage} alt='Logó' width='auto' height='28px' />
          <Box display='flex' flexDirection='column'>
            <Typography
              component='span'
              lineHeight={1}
              sx={{
                fontWeight: 900,
                fontSize: '80%',
                color: palette.text.disabled,
              }}
            >
              {lessonNumber}. lecke
            </Typography>
            <Typography
              component='span'
              lineHeight={1}
              sx={{ fontWeight: 'bold', color: palette.text.secondary }}
            >
              {lessonTitle}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  )
}

function ReturnFromFlashback({
  charToReturnToFromFlashback,
  returnFromFlashback,
}: {
  charToReturnToFromFlashback: Character
  returnFromFlashback: () => void
}) {
  return (
    <Button
      size='small'
      variant='contained'
      onClick={returnFromFlashback}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{ ml: 1, minWidth: 0 }}
    >
      <Box display='flex' flexDirection='column' alignItems='flex-start'>
        <Typography
          component='span'
          lineHeight={1}
          sx={{ fontWeight: 900, fontSize: '80%', opacity: 0.5 }}
        >
          Felidéző mód
        </Typography>
        <Typography component='span' lineHeight={1} sx={{ fontWeight: 'bold' }}>
          Vissza a leckéhez ({charToReturnToFromFlashback?.charChinese})
        </Typography>
      </Box>
    </Button>
  )
}
