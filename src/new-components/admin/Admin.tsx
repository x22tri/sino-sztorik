import { Box } from '@mui/material'
import { LayoutGrid } from '../shared/components/LayoutGrid'
import { AdminCharPickerContent } from './char-picker/AdminCharPickerContent'
import { AdminSubmenuTitle } from './AdminSubmenuTitle'
import { useState } from 'react'
import { AdminAppbar } from './admin-appbar/AdminAppbar'
import AdminContent from './admin-content/AdminContent'
import { SaveRow } from './save-row/SaveRow'

export function Admin() {
  return (
    <LayoutGrid
      sideNav={{
        title: <AdminSubmenuTitle />,
        content: <AdminCharPickerContent />,
        selected: 0,
      }}
    >
      <AdminAppbar />

      <AdminContent />

      <SaveRow />
    </LayoutGrid>
  )
}