import { Button, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useStore } from '../../shared/logic/useStore'

export function ReturnFromFlashbackMobile() {
  const { interruptedChar, exitFlashback } = useStore('flashback')

  return (
    <Button
      size='small'
      variant='contained'
      onClick={exitFlashback}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{ py: 0, px: 1, ml: 1, minWidth: 0, '.MuiButton-startIcon': { marginRight: '2px' } }}
    >
      <Typography variant='chineseNormal'>{interruptedChar?.charChinese}</Typography>
    </Button>
  )
}
