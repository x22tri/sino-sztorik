import { Box, Tooltip } from '@mui/material'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ForwardedRef, forwardRef } from 'react'

export function InfoInLessonChip({ icon, tooltip }: { icon: IconDefinition; tooltip: string }) {
  return (
    <Tooltip title={tooltip}>
      <InfoInLessonChipForwardRef {...{ icon }} />
    </Tooltip>
  )
}

const InfoInLessonChipForwardRef = forwardRef(
  ({ icon, ...restProps }: { icon: IconDefinition }, ref: ForwardedRef<HTMLDivElement>) => (
    <Box
      alignItems='center'
      display='flex'
      bgcolor='grey.200'
      borderRadius={({ spacing }) => spacing(2)}
      p={1}
      {...restProps}
      {...{ ref }}
    >
      <FontAwesomeIcon className='fa-fw' size='sm' {...{ icon }} />
    </Box>
  )
)
