import { Box, Button, useTheme } from '@mui/material'
import { AssembledLesson } from '../../shared/interfaces'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { ADMIN_CANCEL_SAVE, ADMIN_SAVE_CHANGES } from '../../shared/strings'

export function SaveRow() {
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

  return (
    <Box
      alignItems='center'
      bottom={0}
      borderTop={`1px solid ${palette.grey[200]}`}
      display='flex'
      justifyContent='flex-end'
      gap={2}
      height={constants.bottomToolbarHeight}
      paddingX={2}
      position='fixed'
      zIndex={1}
      sx={{
        bgcolor: 'background.paper',
        maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
        width: `calc(100% - ${drawerWidth}px)`,
      }}
    >
      <Button variant='text'>{ADMIN_CANCEL_SAVE}</Button>
      <Button form='char-form' type='submit' variant='contained'>
        {ADMIN_SAVE_CHANGES}
      </Button>
    </Box>
  )
}
