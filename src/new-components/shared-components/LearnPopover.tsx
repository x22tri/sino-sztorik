import { Popover, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

export function LearnPopover({
  anchorEl,
  container,
  onClose,
  text,
}: {
  anchorEl: Element | ((element: Element) => Element) | null | undefined
  container?: Element | (() => Element | null) | null | undefined
  onClose:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined
  text: string | undefined
}) {
  const { palette } = useTheme()

  const marginThreshold = 4

  return (
    <Popover
      {...{ anchorEl, container, marginThreshold, onClose }}
      open={!!anchorEl}
      anchorReference='anchorPosition'
      anchorPosition={{ top: 32, left: 0 }}
      PaperProps={{
        style: {
          maxWidth: `calc(100% - ${marginThreshold * 3}px)`,
          boxShadow: 'none',
          border: `2px solid ${palette.grey[200]}`,
        },
      }}
      sx={{ mt: 0.5 }}
    >
      <Typography variant='subtitle2' padding={1}>
        {text}
      </Typography>
    </Popover>
  )
}
