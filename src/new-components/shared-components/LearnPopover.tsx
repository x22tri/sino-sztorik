import { Popover, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

export function LearnPopover({
  anchorEl,
  hover,
  onClose,
  text,
}: {
  anchorEl: Element | ((element: Element) => Element) | null | undefined
  hover?: boolean
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
  text: string | undefined
}) {
  const { palette } = useTheme()

  return (
    <Popover
      {...{ anchorEl, onClose }}
      open={!!anchorEl}
      disableRestoreFocus={hover}
      marginThreshold={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        style: { boxShadow: 'none', border: `2px solid ${palette.grey[200]}` },
      }}
      sx={{ pointerEvents: hover ? 'none' : 'initial' }}
    >
      <Typography variant='subtitle2' padding={1}>
        {text}
      </Typography>
    </Popover>
  )
}
