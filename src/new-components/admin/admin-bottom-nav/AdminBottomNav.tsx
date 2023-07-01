import { Box, Button, Stack, Tooltip, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Dispatch, SetStateAction } from 'react'
import { Else, If, Then, When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Wrap } from '../../shared/utility-components'
import { ADMIN_CHAR_EDIT_STEP_ONE, ADMIN_CHAR_EDIT_STEP_THREE, ADMIN_CHAR_EDIT_STEP_TWO } from '../../shared/strings'

export function AdminBottomNav({
  activeStep,
  setActiveStep,
  isFinalCheckDisabled,
}: {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  isFinalCheckDisabled: boolean
}) {
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()

  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth
  const isStepForwardButtonDisabled = activeStep === 1 && isFinalCheckDisabled

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
        <When condition={activeStep !== 0}>
          <StepBackButton onClick={stepBack} text={activeStep === 1 ? ADMIN_CHAR_EDIT_STEP_ONE : ADMIN_CHAR_EDIT_STEP_TWO} />
        </When>

        <If condition={activeStep !== 2}>
          <Then>
            <StepForwardButton
              onClick={stepForward}
              text={activeStep === 0 ? ADMIN_CHAR_EDIT_STEP_TWO : ADMIN_CHAR_EDIT_STEP_THREE}
              {...{ isStepForwardButtonDisabled }}
            />
          </Then>

          <Else>
            <SaveChangesButton onClick={saveChanges} />
          </Else>
        </If>
      </Stack>
    </Box>
  )
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
  isStepForwardButtonDisabled,
  onClick,
  text,
}: {
  isStepForwardButtonDisabled: boolean
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
