import { ElementType, ReactElement } from 'react'
import { Chip, ChipProps } from '@mui/material'
import { ChipId } from '../../shared/interfaces'

export function InfoChip<B extends ElementType>({
  icon,
  id,
  label,
  ...restProps
}: ChipProps<
  B,
  {
    icon: ReactElement
    id: ChipId
    label: string
  }
>) {
  return <Chip {...{ icon, label }} {...restProps} sx={{ pl: 0.5, ...restProps.sx }} />
}
