import { Box } from '@mui/material'
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { MajorActionButton } from '../../shared/basic-components'

export default function LessonStartColumn() {
  return (
    <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
      <Box
        display='flex'
        flexDirection='row'
        gap={3}
        justifyContent='space-between'
      >
        <MajorActionButton text='TANULÁS' sx={{ width: '100%' }} />
        <IconButton>
          <FontAwesomeIcon icon={faChevronDown} />
        </IconButton>
      </Box>
    </Box>
  )
}
