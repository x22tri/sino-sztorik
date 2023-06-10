import { useState } from 'react'
import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { LessonPickerTitle } from './lesson-picker/LessonPickerTitle'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import LessonSelectContent from './lesson-select-content/LessonSelectContent'
import { LessonStart } from './lesson-start/LessonStart'
import { useLoaderData, useParams } from 'react-router-dom'
import { LoadLessonSelect } from '../shared/logic/loadLessonSelect'
import { LayoutGrid } from '../shared/components/LayoutGrid'

export default function LessonSelect() {
  const { selectedLesson } = useLoaderData() as LoadLessonSelect
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const params = useParams<{ lessonNumber: string }>()
  const lessonNumber = Number(params.lessonNumber)

  return (
    <LayoutGrid
      sideNav={{
        title: <LessonPickerTitle />,
        content: <LessonPickerContent />,
        selected: lessonNumber - 1,
      }}
    >
      <LessonSelectAppbar {...{ setToolbarHeight, toolbarHeight }} />

      <LessonSelectContent {...{ toolbarHeight }} />

      <LessonStart lesson={selectedLesson} />
    </LayoutGrid>
  )
}
