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
  const { palette } = useTheme()

  const fontColor = {
    color: palette.grey[700],
    '@media (hover: hover)': {
      '&:hover': {
        backgroundColor: 'transparent',
        color: palette.grey[500],
        cursor: 'pointer',
      },
    },
    '&:active': {
      backgroundColor: 'transparent',
      color: palette.primary.main,
    },
  }

  return (
    <Box
      component='span'
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{ ...fontColor }}
    >
      <Tooltip
        disableTouchListener
        leaveTouchDelay={3000}
        enterTouchDelay={50}
        title={tooltipText ?? ''}
      >
        <IconButton
          size='large'
          sx={{ ...fontColor, color: 'inherit' }}
          {...{ disabled, onClick }}
        >
          {badgeContent === null ? (
            <FontAwesomeIcon {...{ icon }} />
          ) : (
            <Badge {...{ badgeContent }} color='primary'>
              <FontAwesomeIcon {...{ icon }} />
            </Badge>
          )}
        </IconButton>
      </Tooltip>

      {!bottomText ? null : (
        <Typography variant='overline' sx={{ mt: -2.5 }}>
          {bottomText}
        </Typography>
      )}
    </Box>
  )
}
