import { Box, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagCheckered, faHouse } from '@fortawesome/free-solid-svg-icons'
import { Case, Default, Switch } from 'react-if'

export type LessonPreviewEntry = { charChinese: string; index: number } | null

export function LocationInLessonPreview({
  lessonPreview,
  onClick,
}: {
  lessonPreview: [LessonPreviewEntry, LessonPreviewEntry, LessonPreviewEntry]
  onClick: () => void
}) {
  return (
    <Button {...{ onClick }} sx={{ borderRadius: ({ spacing }) => spacing(1) }}>
      {lessonPreview.map((entry, entryIndex) => {
        const isLessonStart = entryIndex === 0 && entry === null
        const isLessonEnd = entryIndex === 2 && entry === null

        return (
          <Box
            alignItems='center'
            color={entryIndex === 1 ? 'text.primary' : 'text.disabled'}
            display='flex'
            flexDirection='column'
            gap={0.25}
            key={entryIndex}
            minWidth='32px'
          >
            <Switch>
              <Case condition={isLessonStart}>
                <FontAwesomeIcon icon={faHouse} />
              </Case>

              <Case condition={isLessonEnd}>
                <FontAwesomeIcon icon={faFlagCheckered} />
              </Case>

              <Case condition={entry?.charChinese && entry.index}>
                {() => (
                  <>
                    <Box component='span' typography='chineseText'>
                      {entry!.charChinese}
                    </Box>
                    <Box component='span' typography='overline' lineHeight={1}>
                      {entry!.index}
                    </Box>
                  </>
                )}
              </Case>

              <Default>?</Default>
            </Switch>
          </Box>
        )
      })}
    </Button>
  )
}
