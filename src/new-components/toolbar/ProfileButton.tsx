import { MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToolbarButton from './ToolbarButton'
import { useMediaQuery, useTheme } from '@mui/material'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {
  USER_SETTINGS_ARIA_LABEL,
  USER_SETTINGS_TOOLTIP,
} from '../shared/strings'

export default function ProfileButton({
  onClick,
  username,
}: {
  onClick: (event: MouseEvent<HTMLElement>) => void
  username: string
}) {
  const { breakpoints } = useTheme()

  const profileText = useMediaQuery(breakpoints.down('md'))
    ? username
    : `Szia, ${username}!`

  return (
    <Box display='flex' alignItems='center'>
      <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
        {profileText}
      </Typography>

      <ToolbarButton
        ariaLabel={USER_SETTINGS_ARIA_LABEL}
        icon={faUser}
        tooltip={USER_SETTINGS_TOOLTIP}
        {...{ onClick }}
      />
    </Box>
  )
}
