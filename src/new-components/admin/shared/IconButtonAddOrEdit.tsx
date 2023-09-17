import { IconDefinition, faPlus, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip, IconButton } from '@mui/material'

export function IconButtonAddOrEdit({
  icon,
  isAction = false,
  tooltip,
  mode = 'add',
  onClick,
}: {
  icon: IconDefinition
  isAction?: boolean
  tooltip: string
  mode?: 'add' | 'edit'
  onClick: () => void
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        className='fa-layers'
        {...{ onClick }}
        sx={{ color: isAction ? undefined : 'text.disabled', justifyContent: 'center' }}
      >
        <FontAwesomeIcon className='fa-fw' {...{ icon }} transform='left-4' />

        <FontAwesomeIcon icon={mode === 'add' ? faPlus : faPen} transform='shrink-6 up-9 right-9' />
      </IconButton>
    </Tooltip>
  )
}
