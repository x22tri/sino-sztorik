import { Box, Button, Stack, Tooltip, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Dispatch, SetStateAction, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Wrap } from '../../shared/utility-components'
import { ADMIN_CHAR_EDIT_STEP_ONE, ADMIN_CHAR_EDIT_STEP_THREE, ADMIN_CHAR_EDIT_STEP_TWO } from '../../shared/strings'
import { CharAdminErrorContext, getCharAdminErrors } from '../char-admin-error-context/CharAdminErrorContext'

export function AdminBottomNav({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
}) {
  const isSmallScreen = useSmallScreen()
  const { constants, palette } = useTheme()
  const { charFormErrors, timelineErrors } = useContext(CharAdminErrorContext)

  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth
  const isFinalCheckDisabled = getCharAdminErrors(charFormErrors).length > 0 || getCharAdminErrors(timelineErrors).length > 0

  function stepBack() {
    setActiveStep(prev => prev - 1)
  }

  function stepForward() {
    setActiveStep(prev => prev + 1)
  }

  function saveChanges() {
    console.log('done')
  }

  return (
    <Box
      alignContent='center'
      bottom={0}
      borderTop={`1px solid ${palette.grey[200]}`}
      display='grid'
      height={constants.bottomToolbarHeight}
      paddingX={2}
      position='fixed'
      zIndex={1}
      sx={{
        bgcolor: 'background.paper',
        grid: `"revert navigate" auto / max-content auto`,
        maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
        width: `calc(100% - ${drawerWidth}px)`,
      }}
    >
      <RevertChangesButton />

      <Stack direction='row' gap={2} gridArea='navigate' marginLeft='auto'>
        <Buttons {...{ activeStep, isFinalCheckDisabled, saveChanges, stepBack, stepForward }} />
      </Stack>
    </Box>
  )
}

function Buttons({
  activeStep,
  isFinalCheckDisabled,
  saveChanges,
  stepBack,
  stepForward,
}: {
  activeStep: number
  isFinalCheckDisabled: boolean
  saveChanges: () => void
  stepBack: () => void
  stepForward: () => void
}) {
  switch (activeStep) {
    case 0:
      return <StepForwardButton onClick={stepForward} text={ADMIN_CHAR_EDIT_STEP_TWO} />
    case 1:
      return (
        <>
          <StepBackButton onClick={stepBack} text={ADMIN_CHAR_EDIT_STEP_ONE} />
          <StepForwardButton
            onClick={stepForward}
            text={ADMIN_CHAR_EDIT_STEP_THREE}
            isStepForwardButtonDisabled={isFinalCheckDisabled}
          />
        </>
      )
    case 2:
      return (
        <>
          <StepBackButton onClick={stepBack} text={ADMIN_CHAR_EDIT_STEP_TWO} />
          <SaveChangesButton onClick={saveChanges} />
        </>
      )
    default:
      throw new Error('Unknown step.')
  }
}

function RevertChangesButton() {
  return (
    <Button
      color='error'
      startIcon={<FontAwesomeIcon icon={faTrash} transform='shrink-4' />}
      variant='outlined'
      sx={{ gridArea: 'revert' }}
    >
      Változtatások elvetése
    </Button>
  )
}

function SaveChangesButton({ onClick }: { onClick: () => void }) {
  return (
    <Button startIcon={<FontAwesomeIcon icon={faSave} transform='shrink-4' />} variant='contained' {...{ onClick }}>
      Változtatások mentése
    </Button>
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
