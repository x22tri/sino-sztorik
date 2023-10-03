import { Box, Button, Slide, Stack, Tooltip, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Dispatch, SetStateAction, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Wrap } from '../../shared/utility-components'
import { ADMIN_EDIT_STEPS_STEP_ONE, ADMIN_EDIT_STEPS_STEP_THREE, ADMIN_EDIT_STEPS_STEP_TWO } from '../../shared/strings'
import { CharAdminErrorContext } from '../admin-char-edit/error-context/CharAdminErrorContext'
import { useFormContext } from 'react-hook-form'
import { CharTimelineData } from '../../shared/route-loaders/loadCharEdit'
import { isShallowEqual } from '../../shared/utility-functions'
import { getErrors } from './getErrors'
import { LessonOccurrence, LessonTimelineData } from '../../shared/route-loaders/loadLessonEdit'
import { SortedOccurrence } from '../../shared/MOCK_DATABASE_ENTRIES'

export function AdminBottomNav<T extends CharTimelineData | LessonTimelineData>({
  activeStep,
  savedTimelineData,
  setActiveStep,
  setTimelineData,
  timelineData,
}: {
  activeStep: number
  savedTimelineData: T
  setActiveStep: Dispatch<SetStateAction<number>>
  setTimelineData: Dispatch<SetStateAction<T>>
  timelineData: T
}) {
  const isSmallScreen = useSmallScreen()
  const { constants, palette, spacing } = useTheme()
  const { charFormErrors, timelineErrors } = useContext(CharAdminErrorContext)

  // const isFinalCheckDisabled = getErrors(charFormErrors).length > 0 || getErrors(timelineErrors).length > 0

  const isSaveDisabled = getErrors(charFormErrors).length > 0 || getErrors(timelineErrors).length > 0

  function stepBack() {
    setActiveStep(prev => prev - 1)
    window.scrollTo({ top: 0 })
  }

  function stepForward() {
    setActiveStep(prev => prev + 1)
    window.scrollTo({ top: 0 })
  }

  function saveChanges() {
    console.log('done')
  }

  return (
    <Slide direction='up' in={true}>
      <Box
        alignContent='center'
        bottom={0}
        borderTop={`1px solid ${palette.grey[300]}`}
        borderLeft={`1px solid ${palette.grey[300]}`}
        borderRight={`1px solid ${palette.grey[300]}`}
        display='grid'
        height={constants.bottomToolbarHeight}
        paddingX={2}
        position='fixed'
        zIndex={1}
        sx={{
          bgcolor: 'background.paper',
          borderTopLeftRadius: spacing(2),
          borderTopRightRadius: spacing(2),
          grid: `"revert navigate" auto / max-content auto`,
          maxWidth: { xs: constants.maxContentWidth, lg: `calc(${constants.maxContentWidth} - ${constants.drawerWidth}px)` },
          width: isSmallScreen ? 1 : `calc(100% - ${constants.drawerWidth}px)`,
        }}
      >
        <RevertChangesButton {...{ savedTimelineData, setTimelineData, timelineData }} />

        <Stack direction='row' gap={2} gridArea='navigate' marginLeft='auto'>
          <Buttons {...{ activeStep, isSaveDisabled, saveChanges, stepBack, stepForward }} />
        </Stack>
      </Box>
    </Slide>
  )
}

function Buttons({
  activeStep,
  // isFinalCheckDisabled,
  isSaveDisabled,
  saveChanges,
  stepBack,
  stepForward,
}: {
  activeStep: number
  // isFinalCheckDisabled: boolean
  isSaveDisabled: boolean
  saveChanges: () => void
  stepBack: () => void
  stepForward: () => void
}) {
  switch (activeStep) {
    case 0:
      return <StepForwardButton onClick={stepForward} text={ADMIN_EDIT_STEPS_STEP_TWO} />
    case 1:
      return (
        <>
          <StepBackButton onClick={stepBack} text={ADMIN_EDIT_STEPS_STEP_ONE} />
          {/* <StepForwardButton
            onClick={stepForward}
            text={ADMIN_EDIT_STEPS_STEP_THREE}
            isStepForwardButtonDisabled={isFinalCheckDisabled}
          /> */}
          <SaveChangesButton onClick={saveChanges} {...{ isSaveDisabled }} />
        </>
      )
    // case 2:
    //   return (
    //     <>
    //       <StepBackButton onClick={stepBack} text={ADMIN_EDIT_STEPS_STEP_TWO} />
    //       <SaveChangesButton onClick={saveChanges} />
    //     </>
    //   )
    default:
      throw new Error('Unknown step.')
  }
}

function RevertChangesButton<T extends CharTimelineData | LessonTimelineData>({
  savedTimelineData,
  setTimelineData,
  timelineData,
}: {
  savedTimelineData: T
  setTimelineData: Dispatch<SetStateAction<T>>
  timelineData: T
}) {
  const { formState, reset } = useFormContext()

  function revertChanges() {
    reset()
    setTimelineData(savedTimelineData)
  }

  const hasTimelineDataChanged = (savedTimelineData as Array<SortedOccurrence | LessonOccurrence>).every((occurrence, index) =>
    isShallowEqual(occurrence, timelineData[index])
  )

  return (
    <Button
      color='error'
      disabled={!formState.isDirty && hasTimelineDataChanged}
      startIcon={<FontAwesomeIcon icon={faTrash} transform='shrink-4' />}
      onClick={revertChanges}
      variant='outlined'
      sx={{ gridArea: 'revert' }}
    >
      Változtatások elvetése
    </Button>
  )
}

function SaveChangesButton({ isSaveDisabled = false, onClick }: { isSaveDisabled?: boolean; onClick: () => void }) {
  return (
    <Wrap
      if={isSaveDisabled}
      with={children => (
        <Tooltip title='Oldd fel a problémákat a mentéshez'>
          <span>{children}</span>
        </Tooltip>
      )}
    >
      <Button
        disabled={isSaveDisabled}
        startIcon={<FontAwesomeIcon icon={faSave} transform='shrink-4' />}
        variant='contained'
        {...{ onClick }}
      >
        Változtatások mentése
      </Button>
    </Wrap>
  )
}

function StepBackButton({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <Button startIcon={<FontAwesomeIcon icon={faArrowLeft} transform='shrink-4' />} {...{ onClick }}>
      {text}
    </Button>
  )
}

function StepForwardButton({
  isStepForwardButtonDisabled = false,
  onClick,
  text,
}: {
  isStepForwardButtonDisabled?: boolean
  onClick: () => void
  text: string
}) {
  return (
    <Wrap
      if={isStepForwardButtonDisabled}
      with={children => (
        <Tooltip title='Oldd fel a problémákat az ellenőrzéshez'>
          <span>{children}</span>
        </Tooltip>
      )}
    >
      <Button
        disabled={isStepForwardButtonDisabled}
        endIcon={<FontAwesomeIcon icon={faArrowRight} transform='shrink-4' />}
        variant='outlined'
        {...{ onClick }}
      >
        {text}
      </Button>
    </Wrap>
  )
}
