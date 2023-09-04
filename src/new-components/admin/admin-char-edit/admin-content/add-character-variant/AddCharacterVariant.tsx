import { Button, StepLabel } from '@mui/material'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function AddCharacterVariant({ onClick }: { onClick: () => void }) {
  return (
    <StepLabel>
      <Button size='small' startIcon={<FontAwesomeIcon icon={faPlusSquare} />} sx={{}} {...{ onClick }}>
        Új változat hozzáadása
      </Button>
      {/* To-Do: Hide button if current tier? */}
    </StepLabel>
  )
}
