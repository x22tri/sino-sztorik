import { StepLabel, Typography, Popover, useTheme } from '@mui/material'
import { MouseEvent, TouchEvent, useContext, useState } from 'react'
import { ADMIN_CHAR_EDIT_STEP_ONE, ADMIN_CHAR_EDIT_STEP_TWO } from '../../shared/strings'
import { CharAdminErrorContext } from '../char-admin-error-context/CharAdminErrorContext'
import { valueof } from '../../shared/interfaces'

export function CharFormAdminStepLabel() {
  const { charFormErrors } = useContext(CharAdminErrorContext)

  return <AdminStepLabel errors={charFormErrors} errorMessages={charFormErrorStrings} title={ADMIN_CHAR_EDIT_STEP_ONE} />
}

export function TimelineAdminStepLabel() {
  const { timelineErrors } = useContext(CharAdminErrorContext)

  return <AdminStepLabel errors={timelineErrors} errorMessages={timelineErrorStrings} title={ADMIN_CHAR_EDIT_STEP_TWO} />
}

export function AdminStepLabel<T extends string>({
  errors,
  errorMessages,
  title,
}: {
  errors: { [key in T]: { value: boolean } }
  errorMessages: Record<T, string>
  title: string
}) {
  const { constants, palette, spacing } = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const errorsArray = Object.entries(errors).flatMap(([key, val]) => ((val as any).value ? (key as T) : []))

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

export enum TimelineError {
  CourseLocationNotSet = 'CourseLocationNotSet',
  KeywordNotIntroduced = 'KeywordNotIntroduced',
  MissingStory = 'MissingStory',
  PrimitiveNotIntroduced = 'PrimitiveNotIntroduced',
}

const timelineErrorStrings: Record<TimelineError, string> = {
  CourseLocationNotSet: 'Legalább egy előfordulás nincs elhelyezve a leckében',
  KeywordNotIntroduced: 'A kulcsszó nincs bevezetve',
  MissingStory: 'Nincs történet legalább egy előfordulásnál',
  PrimitiveNotIntroduced: 'Az alapelem nincs bevezetve',
}

export enum CharFormError {
  FrequencyNotANumber = 'FrequencyNotANumber',
  KeywordAndFrequencyGoHandInHand = 'KeywordAndFrequencyGoHandInHand',
  NoKeywordOrPrimitive = 'NoKeywordOrPrimitive',
  KeywordAndPinyinGoHandInHand = 'KeywordAndPinyinGoHandInHand',
  NoProductivePhoneticWithoutPronunciation = 'NoProductivePhoneticWithoutPronunciation',
}

const charFormErrorStrings: Record<CharFormError, string> = {
  FrequencyNotANumber: 'A gyakoriságot számmal kell megadni',
  KeywordAndFrequencyGoHandInHand: 'Vagy kulcsszót és gyakoriságot is meg kell adni, vagy egyiket sem',
  NoKeywordOrPrimitive: 'Kötelező megadni kulcsszót és/vagy alapelemet',
  KeywordAndPinyinGoHandInHand: 'Vagy kulcsszót és kiejtést is meg kell adni, vagy egyiket sem',
  NoProductivePhoneticWithoutPronunciation: 'Kiejtés nélkül egy karakter nem lehet hangjelölő',
}
