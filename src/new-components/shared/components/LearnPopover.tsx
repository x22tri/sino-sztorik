import { Popover, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

export function LearnPopover({
  anchorEl,
  hover,
  text,
}: {
  anchorEl: Element | ((element: Element) => Element) | null | undefined
  hover?: boolean
  text: string | undefined
}) {
  const { constants, spacing } = useTheme()

  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      disableRestoreFocus={hover}
      open={!!anchorEl}
      marginThreshold={2}
      PaperProps={{ style: { borderRadius: spacing(2), boxShadow: constants.boxShadow } }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ pointerEvents: hover ? 'none' : 'initial' }}
      {...{ anchorEl }}
    >
      <Typography variant='subtitle2' padding={2} maxWidth='48ch'>
        {text}
      </Typography>
    </Popover>
  )
}
