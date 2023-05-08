import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Typography } from '@mui/material'
import { useStore } from '../../shared/logic/useStore'

export function ExitFlashbackButton({ charChinese }: { charChinese: string }) {
  const { exitFlashback } = useStore('flashback')

  return (
    <Button
      disableElevation
      size='small'
      variant='contained'
      onClick={exitFlashback}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{ borderRadius: 6, px: 2, py: 0.5, ml: 1, minWidth: 0, '.MuiButton-startIcon': { marginRight: '2px' } }}
    >
      <Typography variant='chineseNormal'>{charChinese}</Typography>
    </Button>
  )
}
