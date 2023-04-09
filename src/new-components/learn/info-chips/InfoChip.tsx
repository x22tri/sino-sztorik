import { MouseEvent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chip } from '@mui/material'
import { ChipType } from '../../shared/interfaces'
import { LearnPopover } from '../../shared/components/LearnPopover'

export default function InfoChip({ chip }: { chip: ChipType }) {
  const { explanation, icon, id, label } = chip

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
        onClick={() => {}} // MUI applies hover styling only if chip is clickable.
        onMouseEnter={event => openPopover(event)}
        onMouseLeave={closePopover}
        size='small'
        variant='outlined'
        sx={{
          borderWidth: 0,
          borderRadius: 1,
          px: 1,
          '.MuiChip-label': { pr: 0 },
        }}
        {...{ label }}
      />

      <LearnPopover {...{ anchorEl }} hover text={explanation} />
    </>
  )
}
