import { Box, Button, Stack, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Dispatch, SetStateAction } from 'react'
import { Else, If, Then, When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

export function AdminBottomNav({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
}) {
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

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
      alignItems='center'
      bottom={0}
      borderTop={`1px solid ${palette.grey[200]}`}
      display='flex'
      gap={2}
      height={constants.bottomToolbarHeight}
      justifyContent='space-between'
      paddingX={2}
      position='fixed'
      zIndex={1}
      sx={{
        bgcolor: 'background.paper',
        maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
        width: `calc(100% - ${drawerWidth}px)`,
      }}
    >
      <Box>
        <Button color='error' startIcon={<FontAwesomeIcon icon={faTrash} transform='shrink-4' />} variant='outlined'>
          Változtatások elvetése
        </Button>
      </Box>

      <Stack direction='row' gap={2}>
        <When condition={activeStep !== 0}>
          <Button onClick={stepBack}>Előző lépés</Button>
        </When>

        <If condition={activeStep !== 2}>
          <Then>
            <Button
              endIcon={<FontAwesomeIcon icon={faArrowRight} transform='shrink-4' />}
              onClick={stepForward}
              variant='outlined'
            >
              Következő lépés
            </Button>
          </Then>
          <Else>
            <Button startIcon={<FontAwesomeIcon icon={faSave} transform='shrink-4' />} onClick={saveChanges} variant='contained'>
              Változtatások mentése
            </Button>
          </Else>
        </If>
      </Stack>
    </Box>
  )
}
