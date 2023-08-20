import { CHARS } from '../shared/MOCK_CHARS'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import { useState } from 'react'
import { CharPickerContent } from './char-picker/CharPickerContent'
import { CharPickerTitle } from './char-picker/CharPickerTitle'
import { useStore } from '../shared/logic/useStore'
import { redirect, useLoaderData } from 'react-router-dom'
import { LayoutGrid } from '../shared/components/LayoutGrid'
import { LoadLearn } from '../shared/logic/loadLearn'
import { useDrawer } from '../shared/hooks/useDrawer'

export default function Learn() {
  const { lesson } = useLoaderData() as LoadLearn
  const [toolbarHeight, setToolbarHeight] = useState(0)
  // const [isDrawerOpen, toggleDrawer] = useState(false)
  const { isDrawerOpen, toggleDrawer } = useDrawer()
  const [contentType, setContentType] = useState<'characters' | 'preface'>('characters')
  const { selectCharIndex, selectedCharIndex } = useStore('learn')

  const selectedChar = lesson.characters[selectedCharIndex]
  const prevChar = lesson.characters[selectedCharIndex - 1] ?? null
  const nextChar = lesson.characters[selectedCharIndex + 1] ?? null

  if (!lesson.characters.length) {
    throw new Error()
  }

  return (
    <>
      <LearnAppbar lessonLength={CHARS.length} {...{ toggleDrawer }} />

      <LayoutGrid
        sideNav={{
          title: <CharPickerTitle {...{ contentType, setContentType }} />,
          content: <CharPickerContent {...{ contentType }} />,
          selected: selectedCharIndex,
        }}
        {...{ isDrawerOpen, toggleDrawer }}
      >
        <LearnContent
          lessonChar={selectedChar}
          prevChar={prevChar?.glyph}
          nextChar={nextChar?.glyph}
          {...{ selectCharIndex, selectedCharIndex, toolbarHeight }}
        />
      </LayoutGrid>
    </>
  )
}
