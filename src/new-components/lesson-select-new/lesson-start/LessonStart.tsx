import { Box, Typography, useTheme } from '@mui/material'
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { MajorActionButton } from '../../shared/basic-components'
import { Display } from '../../shared/utility-components'
import { ReactNode } from 'react'

export function LessonStart({ isLargeScreen }: { isLargeScreen: boolean }) {
  return (
    <Display
      if={isLargeScreen}
      else={<LessonStartMobile learnButton={<LearnButton />} />}
    >
      <LessonStartDesktop learnButton={<LearnButton />} />
    </Display>
  )
}

export function LessonStartDesktop({
  learnButton,
}: {
  learnButton: ReactNode
}) {
  return (
    <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
      <Box
        display='flex'
        flexDirection='row'
        gap={3}
        justifyContent='space-between'
      >
        {learnButton}
        <IconButton>
          <FontAwesomeIcon icon={faChevronDown} />
        </IconButton>
      </Box>
    </Box>
  )
}

export function LessonStartMobile({ learnButton }: { learnButton: ReactNode }) {
  const { constants } = useTheme()

  return (
    <Box
      bottom={0}
      borderTop='1px solid'
      display='grid'
      gap={2}
      gridTemplateColumns={'repeat(3, 1fr)'}
      height={constants.lessonStartBottomHeight}
      padding={1}
      position='sticky'
      width={`calc(100%) `}
    >
      <Box />
      <Box margin='auto 0'>{learnButton}</Box>
      <Box>aaa</Box>
    </Box>
  )
}

function LearnButton() {
  return (
    <MajorActionButton
      text={
        <>
          <Typography lineHeight={1} variant='button'>
            TANULÁS
          </Typography>
          <Typography fontSize='75%' lineHeight={1} variant='caption'>
            11 karakter
          </Typography>
        </>
      }
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    />
  )
}
