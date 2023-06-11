import { Box, useTheme } from '@mui/material'
import ToolbarButton from '../shared/components/ToolbarButton'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ADMIN_BACK_FROM_SUBMENU, ADMIN_CHARACTER_LIST } from '../shared/strings'

export function AdminSubmenuTitle() {
  const { palette, spacing } = useTheme()

  return (
    <Box
      alignItems='center'
      display='flex'
      gap={0.5}
      minHeight={`${spacing(8)}`}
      paddingX={`${spacing(2)}`}
      borderBottom={`1px solid ${palette.grey[200]}`}
    >
      <ToolbarButton icon={faArrowLeft} tooltip={ADMIN_BACK_FROM_SUBMENU} onClick={() => {}} size='small' />
      <Box component='span' typography='titleSubtitle.subtitle' sx={{ color: 'text.secondary' }}>
        {ADMIN_CHARACTER_LIST}
      </Box>
    </Box>
  )
}
