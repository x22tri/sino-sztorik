import { Popover, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

export function LearnPopover({
  anchorEl,
  onClose,
  text,
}: {
  anchorEl: Element | ((element: Element) => Element) | null | undefined
  onClose:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined
  text: string | undefined
}) {
  const { palette } = useTheme()

  return (
    <Popover
      {...{ anchorEl, onClose }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!anchorEl}
      sx={{
        mt: 0.5,
        '.MuiPopover-paper': {
          boxShadow: 'none',
          border: `2px solid ${palette.grey[200]}`,
        },
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Typography variant='subtitle2' padding={1}>
        {text}
      </Typography>
    </Popover>
  )
}
