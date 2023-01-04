import { MouseEvent } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme, Chip } from '@mui/material'
import { ChipId } from '../../shared/interfaces'

export default function InfoChip({
  deselectChip,
  icon,
  id,
  isSelected,
  label,
  selectChip,
}: {
  deselectChip: () => void
  icon: IconDefinition
  id: ChipId
  isSelected: boolean
  label: string
  selectChip: (event: MouseEvent<HTMLButtonElement>, chipId: ChipId) => void
}) {
  const { palette } = useTheme()

  return (
    <Chip
      component='button'
      icon={
        <FontAwesomeIcon
          transform='left-2.5'
          style={{
            color: isSelected
              ? palette.primary.contrastText
              : palette.grey[700],
          }}
          {...{ icon }}
        />
      }
      size='small'
      // onClick={event => selectChip(event, id)}
      onMouseEnter={event => selectChip(event, id)}
      onMouseLeave={deselectChip}
      variant='outlined'
      sx={{
        backgroundColor: isSelected ? palette.primary.main : 'inherit',
        borderWidth: 0,
        borderRadius: 1,
        color: isSelected ? palette.primary.contrastText : palette.grey[700],
        px: 1,
        '&:focus': {
          boxShadow: 'none',
        },
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: isSelected
            ? `${palette.primary.main} !important` // Mobile touch is considered hover.
            : 'inherit',
          cursor: 'pointer',
        },
        '.MuiChip-label': {
          pr: 0,
        },
      }}
      {...{ label }}
    />
  )
}
