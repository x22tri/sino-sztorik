import { Step, StepLabel, Typography, Popover, useTheme } from '@mui/material'
import { MouseEvent, TouchEvent, useState } from 'react'

export enum TimelineError {
  CourseLocationNotSet = 'CourseLocationNotSet',
  KeywordNotIntroduced = 'KeywordNotIntroduced',
  MissingStory = 'MissingStory',
  PrimitiveNotIntroduced = 'PrimitiveNotIntroduced',
}

export enum CharFormError {
  NoKeywordOrPrimitive = 'NoKeywordOrPrimitive',
}

export function AdminStepLabel<T extends string>({
  errors,
  errorMessages,
  title,
}: {
  errors: T[]
  errorMessages: Record<T, string>
  title: string
}) {
  const { constants, palette, spacing } = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  function openPopover(event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
    if (!errors.length) {
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
        optional={!errors.length ? false : <Typography variant='caption' color='error'>{`${errors.length} probléma`}</Typography>}
        error={!!errors.length}
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
        {errors.map((error, index) => (
          <Typography key={index} variant='body2' lineHeight={2} maxWidth='48ch'>
            • {errorMessages[error]}
          </Typography>
        ))}
      </Popover>
    </>
  )
}
