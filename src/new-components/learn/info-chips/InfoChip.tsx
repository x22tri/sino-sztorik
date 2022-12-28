import { MouseEvent } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMediaQuery, useTheme, Chip } from '@mui/material'
import { ChipId } from '../../shared/interfaces'

export default function InfoChip({
  icon,
  id,
  isSelected,
  label,
  labelAlwaysVisible,
  selectChip,
}: {
  icon: IconDefinition
  id: ChipId
  isSelected: boolean
  label: string
  labelAlwaysVisible?: boolean
  selectChip: (event: MouseEvent<HTMLButtonElement>, chipId: ChipId) => void
}) {
  const { breakpoints, palette } = useTheme()

  const hideLabel = useMediaQuery(breakpoints.down('sm')) && !labelAlwaysVisible

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
      onClick={event => selectChip(event, id)}
      variant='outlined'
      sx={{
        backgroundColor: isSelected ? palette.primary.main : 'inherit',
        borderWidth: 0,
        borderRadius: 1,
        color: isSelected ? palette.primary.contrastText : palette.grey[700],
        p: 1,
        width: hideLabel ? '24px' : 'auto',
        '&:focus': {
          boxShadow: 'none',
        },
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: isSelected
            ? `${palette.primary.main} !important` // Mobile touch is considered hover.
            : 'inherit',
        },
        '.MuiChip-label': {
          pr: 0,
          display: hideLabel ? 'none' : 'block',
        },
      }}
      {...{ label }}
    />
  )
}
