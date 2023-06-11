import { Box } from '@mui/material'
import { LayoutGrid } from '../shared/components/LayoutGrid'
import { LandingAppbar } from '../landing/LandingAppbar'
import { AdminCharPickerContent } from './char-picker/AdminCharPickerContent'
import { AdminSubmenuTitle } from './AdminSubmenuTitle'
import { useState } from 'react'
import { AdminAppbar } from './admin-appbar/AdminAppbar'

export function Admin() {
  const [toolbarHeight, setToolbarHeight] = useState(0)

  return (
    <LayoutGrid
      sideNav={{
        title: <AdminSubmenuTitle />,
        content: <AdminCharPickerContent />,
        selected: 0,
      }}
    >
      <AdminAppbar {...{ setToolbarHeight, toolbarHeight }} />

      <Box>a</Box>
    </LayoutGrid>
  )
}
