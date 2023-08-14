import { faBookOpen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Drawer, Stack, useTheme } from '@mui/material'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { AddOccurrence } from './AddOccurrenceOptions'
import { SortedOccurrence } from '../../shared/MOCK_DATABASE_ENTRIES'
import { isUnset } from '../utils/occurrence-utils'
import { noOrphanedRemindersIfTierWasDeleted } from './getReminderContentType'
import { TimelineData } from '../../shared/logic/loadAdminChar'
import { useState } from 'react'
import { StoryDrawerContent } from './story-drawer-content/StoryDrawerContent'

export function Actions({
  deleteEntry,
  index,
  occurrence,
  timelineData,
}: {
  deleteEntry: (source: number) => void
  index: number
  occurrence: SortedOccurrence
  timelineData: TimelineData
}) {
  const { constants } = useTheme()
  const [isStoryDrawerOpen, setStoryDrawerOpen] = useState(false)

  const canAddStory = 'story' in occurrence && occurrence.story.length === 0

  const canEditStory = 'story' in occurrence && occurrence.story.length !== 0

  const canBeDeleted = !isUnset(occurrence) && noOrphanedRemindersIfTierWasDeleted(timelineData, index)

  return (
    <>
      <Stack alignItems='center' direction='row' gap={1.5} justifyContent='flex-end'>
        {!canAddStory ? (
          false
        ) : (
          <AddOccurrence icon={faBookOpen} isAction tooltip='Történet hozzáadása' onClick={() => setStoryDrawerOpen(true)} />
        )}

        {!canEditStory ? (
          false
        ) : (
          <AddOccurrence
            icon={faBookOpen}
            isAction
            mode='edit'
            tooltip='Történet szerkesztése'
            onClick={() => setStoryDrawerOpen(true)}
          />
        )}

        {!canBeDeleted ? (
          false
        ) : (
          <ToolbarButton icon={faTrash} tooltip='Karakter törlése a körből' onClick={() => deleteEntry(index)} sx={{ p: 0 }} />
        )}
      </Stack>

      <Drawer
        anchor='right'
        open={isStoryDrawerOpen}
        onClose={() => setStoryDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', minWidth: `${constants.drawerWidth}px`, width: 0.5 } }}
      >
        <StoryDrawerContent />
      </Drawer>
    </>
  )
}
