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
      open={!!anchorEl}
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
      sx={{ mt: 0.5 }}
    >
      <Typography variant='subtitle2' padding={1}>
        {text}
      </Typography>
    </Popover>
  )
}
