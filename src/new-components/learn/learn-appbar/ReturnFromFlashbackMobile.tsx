import { Button, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Character } from '../../shared/interfaces'

export function ReturnFromFlashbackMobile({
  charToReturnToFromFlashback,
  returnFromFlashback,
}: {
  charToReturnToFromFlashback: Character
  returnFromFlashback: () => void
}) {
  return (
    <Button
      size='small'
      variant='contained'
      onClick={returnFromFlashback}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{
        py: 0,
        px: 1,
        ml: 1,
        minWidth: 0,
        '.MuiButton-startIcon': { marginRight: '2px' },
      }}
    >
      <Typography variant='chineseNormal'>
        {charToReturnToFromFlashback.charChinese}
      </Typography>
    </Button>
  )
}
