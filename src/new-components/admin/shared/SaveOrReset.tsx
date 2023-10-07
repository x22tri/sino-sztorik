import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@mui/material'

export function SaveOrReset({ reset, save }: { reset: () => void; save?: () => void }) {
  return (
    <Box display='flex' gap={2} mt={6}>
      <Button
        onClick={() => (save ? save() : {})}
        startIcon={<FontAwesomeIcon icon={faSave} transform='shrink-4' />}
        variant='contained'
        type={save ? 'button' : 'submit'}
      >
        Mentés
      </Button>

      <Button onClick={reset} type='button'>
        Változtatások elvetése
      </Button>
    </Box>
  )
}
