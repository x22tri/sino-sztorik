import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { LessonPickerTitle } from './lesson-picker/LessonPickerTitle'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import LessonSelectContent from './lesson-select-content/LessonSelectContent'
import { useParams } from 'react-router-dom'
import { LayoutGrid } from '../shared/components/LayoutGrid'
import { useDrawer } from '../shared/hooks/useDrawer'

export default function LessonSelect() {
  const params = useParams<{ lessonNumber: string }>()
  const lessonNumber = Number(params.lessonNumber)
  const { isDrawerOpen, toggleDrawer } = useDrawer()

  return (
    <>
      <LessonSelectAppbar {...{ toggleDrawer }} />

      <LayoutGrid
        sideNav={{
          title: <LessonPickerTitle />,
          content: <LessonPickerContent {...{ toggleDrawer }} />,
          selected: lessonNumber - 1,
        }}
        {...{ isDrawerOpen, toggleDrawer }}
      >
        <LessonSelectContent />
      </LayoutGrid>
    </>
  )
}
