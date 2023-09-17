import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Drawer, Stack, useTheme } from '@mui/material'
import { useState } from 'react'
import { PrefaceDrawerContent } from '../preface-drawer-content/PrefaceDrawerContent'
import { LessonOccurrence } from '../../../shared/route-loaders/loadLessonEdit'
import { IconButtonAddOrEdit } from '../../shared/IconButtonAddOrEdit'

export function Actions({ occurrence }: { occurrence: LessonOccurrence }) {
  const { constants } = useTheme()
  const [isPrefaceDrawerOpen, setPrefaceDrawerOpen] = useState(false)

  const canAddPreface = occurrence.variantInTier && occurrence.variantInTier.preface === ''

  const canEditPreface = occurrence.variantInTier && occurrence.variantInTier.preface !== ''

  return (
    <>
      <Stack alignItems='center' direction='row' gap={1.5} justifyContent='flex-end'>
        {!canAddPreface ? (
          false
        ) : (
          <IconButtonAddOrEdit
            icon={faBookOpen}
            isAction
            tooltip='Előszó hozzáadása'
            onClick={() => setPrefaceDrawerOpen(true)}
          />
        )}

        {!canEditPreface ? (
          false
        ) : (
          <IconButtonAddOrEdit
            icon={faBookOpen}
            isAction
            mode='edit'
            tooltip='Előszó szerkesztése'
            onClick={() => setPrefaceDrawerOpen(true)}
          />
        )}
      </Stack>

      <Drawer
        anchor='right'
        open={isPrefaceDrawerOpen}
        onClose={() => setPrefaceDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', minWidth: `${constants.drawerWidth}px`, width: 0.5 } }}
      >
        <PrefaceDrawerContent />
      </Drawer>
    </>
  )
}
