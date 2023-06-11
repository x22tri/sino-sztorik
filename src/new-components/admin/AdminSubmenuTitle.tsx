import { Box, Button, useTheme } from '@mui/material'
import ToolbarButton from '../shared/components/ToolbarButton'
import { faArrowLeft, faChevronLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { ADMIN_ADD_CHARACTER, ADMIN_BACK_FROM_SUBMENU, ADMIN_CHARACTER_LIST } from '../shared/strings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LightenOnHoverButton } from '../shared/components/LightenOnHoverButton'

export function AdminSubmenuTitle() {
  const { palette, spacing } = useTheme()

  return (
    <Box
      alignItems='flex-start'
      display='flex'
      flexDirection='column'
      minHeight={`${spacing(8)}`}
      paddingX={`${spacing(2)}`}
      borderBottom={`1px solid ${palette.grey[200]}`}
    >
      <LightenOnHoverButton
        color='neutral'
        variant='text'
        startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
        size='small'
        onClick={() => {}}
        sx={{ px: 0 }}
      >
        {ADMIN_BACK_FROM_SUBMENU}
      </LightenOnHoverButton>

      <Box
        alignItems='center'
        color='text.secondary'
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        typography='titleSubtitle.subtitle'
        width={1}
      >
        {ADMIN_CHARACTER_LIST}

        <ToolbarButton color='primary' icon={faPlusSquare} tooltip={ADMIN_ADD_CHARACTER} onClick={() => {}} sx={{ py: 0 }} />
      </Box>
    </Box>
  )
}
