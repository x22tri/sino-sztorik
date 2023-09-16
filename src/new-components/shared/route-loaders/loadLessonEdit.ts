import { Params } from 'react-router-dom'
import { LESSON_ENTRIES, LessonCharReference, LessonVariant } from '../MOCK_DATABASE_ENTRIES'

export type LessonFormData = { characters: LessonCharReference[]; title: string }

export type LessonOccurrence = { charactersInTier: LessonCharReference[]; variantInTier: LessonVariant | null }

export type LessonTimelineData = [LessonOccurrence, LessonOccurrence, LessonOccurrence, LessonOccurrence]

export type LoadLessonEdit = { lessonFormData: LessonFormData; lessonTimelineData: LessonTimelineData }

export function loadLessonEdit({ params }: { params: Params }): LoadLessonEdit {
  const lessonEntry = LESSON_ENTRIES.find(({ lessonNumber }) => lessonNumber === Number(params.lessonNumber))
  // To-Do: Fetch from database.

  if (!lessonEntry) {
    throw new Response('Lesson not found in the database', { status: 404 })
  }

  const { characters, title, variants } = lessonEntry

  const lessonTimelineData = new Array<number>(1, 2, 3, 4).map(tier => {
    const charactersInTier = characters.filter(char => char.tiers.includes(tier))
    const variantInTier = variants.find(variant => variant.tier === tier)

    if (charactersInTier.length > 0 && !variantInTier) {
      throw new Response('Characters found in a tier that the lesson does not contain.', { status: 500 })
    } // To-Do: Remediation screen

    if (charactersInTier.length === 0 && !!variantInTier) {
      throw new Response('A tier was found that contains no characters.', { status: 500 })
    } // To-Do: Remediation screen

    if (charactersInTier.length === 0 && !variantInTier) {
      return null
    }

    return { charactersInTier, variantInTier }
  })

  return {
    lessonFormData: { characters, title },
    lessonTimelineData: lessonTimelineData as LessonTimelineData,
  }
}
