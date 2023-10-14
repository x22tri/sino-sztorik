import { useTheme, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StoryLinkState } from '../../char-edit/story/Story'

export function OverviewLink({
  disabled = false,
  icon,
  link,
  state,
  text,
}: {
  disabled?: boolean
  icon?: IconDefinition
  link: string
  state?: Record<string, any>
  text: string
}) {
  const { spacing } = useTheme()

  return (
    <Button
      component={RouterLink}
      to={link}
      startIcon={icon ? <FontAwesomeIcon transform='shrink-4' {...{ icon }} /> : undefined}
      {...{ state }}
      sx={{
        color: disabled ? 'action.disabled' : 'primary.main',
        pointerEvents: disabled ? 'none' : 'initial',
        '.MuiButton-startIcon': { marginRight: spacing(0.75) },
      }}
    >
      {text}
    </Button>
  )
}
