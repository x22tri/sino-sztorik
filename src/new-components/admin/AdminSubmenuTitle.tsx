import { Box, useTheme } from '@mui/material'
import ToolbarButton from '../shared/components/ToolbarButton'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { ADMIN_ADD_CHARACTER, ADMIN_CHARACTER_LIST } from '../shared/strings'

export function AdminSubmenuTitle() {
  const { palette, spacing } = useTheme()

  return (
    <Box
      alignItems='center'
      borderBottom={`1px solid ${palette.grey[200]}`}
      color='text.secondary'
      display='flex'
      justifyContent='space-between'
      minHeight={`${spacing(8)}`}
      paddingX={`${spacing(2)}`}
      typography='titleSubtitle.subtitle'
    >
      {ADMIN_CHARACTER_LIST}

      <ToolbarButton color='primary' icon={faPlusSquare} tooltip={ADMIN_ADD_CHARACTER} onClick={() => {}} sx={{ py: 0 }} />
    </Box>
  )
}
