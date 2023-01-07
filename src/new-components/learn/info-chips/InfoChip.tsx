import { MouseEvent, useState } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme, Chip } from '@mui/material'
import { ChipId } from '../../shared/interfaces'
import { LearnPopover } from '../../shared-components/LearnPopover'

export default function InfoChip({
  // deselectChip,
  explanation,
  icon,
  id,
  // isSelected,
  label,
}: // selectChip,
{
  // deselectChip: () => void
  explanation: string
  icon: IconDefinition
  id: ChipId
  // isSelected: boolean
  label: string
  // selectChip: (event: MouseEvent<HTMLButtonElement>, chipId: ChipId) => void
}) {
  // const { palette } = useTheme()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  function openPopover(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function closePopover() {
    setAnchorEl(null)
  }

  return (
    <>
      <Chip
        component='button'
        icon={<FontAwesomeIcon transform='left-2.5' {...{ icon }} />}
        size='small'
        onClick={() => {}} // MUI applies hover styling only if chip is clickable.
        onMouseEnter={event => openPopover(event)}
        onMouseLeave={closePopover}
        variant='outlined'
        sx={{
          borderWidth: 0,
          borderRadius: 1,
          px: 1,
          '.MuiChip-label': { pr: 0 },
        }}
        {...{ label }}
      />

      <LearnPopover
        {...{ anchorEl }}
        hover
        // onClose={adeselectChip}
        text={explanation}
      />
    </>
  )
}
