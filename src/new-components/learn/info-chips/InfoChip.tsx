import { ElementType, MouseEvent, ReactElement } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMediaQuery, useTheme, Chip, ChipProps } from '@mui/material'
import { ChipId } from '../../shared/interfaces'

export function InfoChip<B extends ElementType>({
  icon,
  id,
  label,
  ...restProps
}: // selectChip,
ChipProps<
  B,
  {
    icon: ReactElement
    id: ChipId
    label: string
    // selectChip: (event: MouseEvent<HTMLButtonElement>, chipId: ChipId) => void
  }
>) {
  return (
    <Chip
      // component='button'
      // onClick={event => selectChip(event, id)}
      // sx={{ pl: 0.5 }}
      {...{ icon, label }}
      {...restProps}
      sx={{ pl: 0.5, ...restProps.sx }}
    />
  )
}
