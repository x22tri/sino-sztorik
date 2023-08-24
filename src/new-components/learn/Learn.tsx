import { CHARS } from '../shared/MOCK_CHARS'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import { useState } from 'react'
import { CharPickerContent } from './char-picker/CharPickerContent'
import { CharPickerTitle } from './char-picker/CharPickerTitle'
import { useStore } from '../shared/logic/useStore'
import { useLoaderData } from 'react-router-dom'
import { LoadLearn } from '../shared/logic/loadLearn'
import { useDrawer } from '../shared/hooks/useDrawer'
import { Box, Stack, useTheme } from '@mui/material'
import { SideNav } from '../shared/components/SideNav'

export default function Learn() {
  const { constants } = useTheme()
  const { lesson } = useLoaderData() as LoadLearn
  const { isDrawerOpen, toggleDrawer } = useDrawer()
  const [contentType, setContentType] = useState<'characters' | 'preface'>('characters')
  const { selectCharIndex, selectedCharIndex } = useStore('learn')

  const selectedChar = lesson.characters[selectedCharIndex]
  const prevChar = lesson.characters[selectedCharIndex - 1] ?? null
  const nextChar = lesson.characters[selectedCharIndex + 1] ?? null

  if (!lesson.characters.length) {
    throw new Error('Lesson has no characters.')
  }

  return (
    <>
      <LearnAppbar lessonLength={CHARS.length} {...{ toggleDrawer }} />

      <Box
        display='grid'
        margin='auto'
        sx={{
          maxWidth: constants.maxContentWidth,
          gridTemplate: {
            xs: `"main" / auto`,
            md: `"nav main" / ${constants.drawerWidth}px auto`,
            lg: `"nav main ." / ${constants.drawerWidth}px 3fr 1fr`,
          },
        }}
      >
        <Box component='nav' gridArea='nav'>
          <SideNav
            content={<CharPickerContent {...{ contentType }} />}
            title={<CharPickerTitle {...{ contentType, setContentType }} />}
            selected={selectedCharIndex}
            {...{ isDrawerOpen, toggleDrawer }}
          />{' '}
        </Box>

        <Stack component='main' gridArea='main' p={2}>
          <LearnContent
            lessonChar={selectedChar}
            prevChar={prevChar?.glyph}
            nextChar={nextChar?.glyph}
            {...{ selectCharIndex, selectedCharIndex }}
          />
        </Stack>
      </Box>
    </>
  )
}
