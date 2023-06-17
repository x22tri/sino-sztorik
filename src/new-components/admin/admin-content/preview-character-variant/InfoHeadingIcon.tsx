import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Tooltip } from '@mui/material'
import { ForwardedRef, forwardRef } from 'react'

export function InfoHeadingIcon({ icon, tooltip }: { icon: IconDefinition; tooltip: string }) {
  return (
    <Tooltip title={tooltip}>
      <InfoHeadingIconForwardedRef {...{ icon }} />
    </Tooltip>
  )
}

const InfoHeadingIconForwardedRef = forwardRef(
  ({ icon, ...restProps }: { icon: IconDefinition }, ref: ForwardedRef<HTMLDivElement>) => (
    <Box {...restProps} {...{ ref }} sx={{ alignSelf: 'center' }}>
      <FontAwesomeIcon size='sm' {...{ icon }} />
    </Box>
  )
)
