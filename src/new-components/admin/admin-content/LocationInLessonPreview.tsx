import { Box, Button } from '@mui/material'
import { When } from 'react-if'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { faArrowRightArrowLeft, faPen, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type LessonPreviewEntry = { charChinese: string; index: number } | null

export function LocationInLessonPreview({
  lessonPreview,
  onClick,
}: {
  lessonPreview: [LessonPreviewEntry, LessonPreviewEntry, LessonPreviewEntry]
  onClick: () => void
}) {
  return (
    <>
      <Button {...{ onClick }} sx={{ borderRadius: ({ spacing }) => spacing(1) }}>
        {lessonPreview.map((entry, entryIndex) => {
          const isLessonStart = entryIndex === 1 && lessonPreview[0] === null
          const isLessonEnd = entryIndex === 1 && lessonPreview[2] === null

          if (entry === null) {
            return null
          }

          return (
            <Box
              alignItems='center'
              borderLeft={({ palette }) => (isLessonStart ? `2px dotted ${palette.text.disabled}` : undefined)}
              borderRight={({ palette }) => (isLessonEnd ? `2px dotted ${palette.text.disabled}` : undefined)}
              color={entryIndex === 1 ? 'text.primary' : 'text.disabled'}
              display='flex'
              flexDirection='column'
              gap={0.25}
              key={entryIndex}
              paddingX={1}
            >
              <When condition={!!entry.charChinese}>
                {() => (
                  <>
                    <Box component='span' typography='chineseText'>
                      {entry.charChinese}
                    </Box>
                    <Box component='span' typography='overline' lineHeight={1}>
                      {entry.index}
                    </Box>
                  </>
                )}
              </When>
            </Box>
          )
        })}
      </Button>

      {/* <ToolbarButton size='small' icon={faPen} tooltip='Áthelyezés' onClick={() => {}} /> */}
      <Button size='small' startIcon={<FontAwesomeIcon icon={faArrowRightArrowLeft} />} sx={{ px: 1.5 }}>
        Áthelyezés
      </Button>
    </>
  )
}
