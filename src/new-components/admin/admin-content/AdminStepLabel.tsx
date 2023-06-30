import { Step, StepLabel, Typography, Popover, useTheme } from '@mui/material'
import { MouseEvent, TouchEvent, useState } from 'react'

export enum TimelineError {
  MissingStory = 'MissingStory',
  KeywordNotIntroduced = 'KeywordNotIntroduced',
  PrimitiveNotIntroduced = 'PrimitiveNotIntroduced',
  CourseLocationNotSet = 'CourseLocationNotSet',
}

export function AdminStepLabel({
  errorsArray,
  errorMessages,
  title,
}: {
  errorsArray: TimelineError[]
  errorMessages: Record<TimelineError, string>
  title: string
}) {
  const { constants, palette, spacing } = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  function openPopover(event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
    if (!errorsArray.length) {
      return
    }

    setAnchorEl(event.currentTarget)
  }

  function closePopover() {
    setAnchorEl(null)
  }

  return (
    <>
      <StepLabel
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
        optional={
          !errorsArray.length ? (
            false
          ) : (
            <Typography variant='caption' color='error'>{`${errorsArray.length} probléma`}</Typography>
          )
        }
        error={!!errorsArray.length}
        sx={{ '.MuiStepLabel-labelContainer': { lineHeight: 0.8 } }}
      >
        {title}
      </StepLabel>

      <Popover
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        disableRestoreFocus
        open={!!anchorEl}
        marginThreshold={2}
        PaperProps={{
          style: {
            backgroundColor: palette.error.main,
            borderRadius: spacing(2),
            boxShadow: constants.boxShadow,
            color: palette.primary.contrastText,
            padding: spacing(2),
          },
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ pointerEvents: 'none', marginTop: spacing(1) }}
        {...{ anchorEl }}
      >
        {errorsArray.map((error, index) => (
          <Typography key={index} variant='body2' lineHeight={2} maxWidth='48ch'>
            • {errorMessages[error]}
          </Typography>
        ))}
      </Popover>
    </>
  )
}
