import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Box, useTheme } from '@mui/material'
import { useStore } from '../../shared/logic/useStore'
import { RESUME_LESSON } from '../../shared/strings'

export function ExitFlashbackButton({ charChinese }: { charChinese: string }) {
  const { spacing } = useTheme()
  const { exitFlashback } = useStore('flashback')

  return (
    <Button
      color='white'
      variant='contained'
      onClick={exitFlashback}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{ borderRadius: 6, minWidth: 'max-content', width: '20%', '.MuiButton-startIcon': { marginRight: spacing(1) } }}
    >
      <Box>{`${RESUME_LESSON} (${charChinese})`}</Box>
    </Button>
  )
}
