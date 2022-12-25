import { MouseEvent } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  IconButton,
  Badge,
  Typography,
  useTheme,
  Tooltip,
} from '@mui/material'
import { useNavButtonStyling } from './useNavButtonStyling'

export function BottomNavigationButton({
  badgeContent,
  bottomText,
  disabled = false,
  icon,
  onClick,
  tooltipText,
}: {
  badgeContent?: number
  bottomText?: string
  disabled?: boolean
  icon: IconDefinition
  onClick: (event: MouseEvent<HTMLElement>) => void
  tooltipText?: string
}) {
  const navButtonStyling = useNavButtonStyling()

  return (
    <Box
      component='span'
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{ ...navButtonStyling }}
    >
      <Tooltip
        disableTouchListener
        leaveTouchDelay={3000}
        enterTouchDelay={50}
        title={tooltipText ?? ''}
      >
        <span>
          <IconButton
            // size='large'
            sx={{ ...navButtonStyling, color: 'inherit' }}
            {...{ disabled, onClick }}
          >
            {badgeContent === null ? (
              <FontAwesomeIcon {...{ icon }} transform='grow-4' />
            ) : (
              <Badge {...{ badgeContent }} color='primary'>
                <FontAwesomeIcon {...{ icon }} transform='grow-4' />
              </Badge>
            )}
          </IconButton>
        </span>
      </Tooltip>

      {!bottomText ? null : (
        <Typography variant='overline' sx={{ mt: -1, lineHeight: 1.5 }}>
          {bottomText}
        </Typography>
      )}
    </Box>
  )
}
