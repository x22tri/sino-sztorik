import {
  Box,
  Divider,
  Stack,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useFetcher } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { CharacterSection } from './sections/CharacterSection'
import { useState } from 'react'

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description: 'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
]

export default function AdminContent() {
  const fetcher = useFetcher()
  const [activeStep, setActiveStep] = useState(0)
  const { constants } = useTheme()

  function changeTier(index: number) {
    setActiveStep(index)
  }

  return (
    <Stack
      boxSizing='border-box'
      bgcolor='background.paper'
      component='main'
      display='flex'
      flexDirection='column'
      marginBottom={constants.bottomToolbarHeight}
      minHeight={`calc(100vh - ${constants.bottomToolbarHeight})`}
      paddingX={2}
    >
      <Heading title='Idővonal' />

      <Stepper nonLinear orientation='vertical' {...{ activeStep }}>
        {[1, 2, 3, 4].map((step, index) => (
          <Step key={index}>
            <StepButton onClick={() => changeTier(index)}>{/* To-Do: add lesson index preview */}</StepButton>
            <StepContent>
              <fetcher.Form id='char-form' method='post' action='/admin'>
                <CharacterSection />

                {/* <Box mt={3}>
                  <TextField
                    id='story'
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label='Történet'
                    multiline
                    name='story'
                    size='small'
                    sx={{ '.MuiInputBase-root': { borderRadius: ({ spacing }) => spacing(1), minHeight: '20ch' } }}
                  />
                </Box>

                <Box alignItems='center' display='flex' flexDirection='row' mt={2}>
                  <Typography variant='h6' fontWeight='bold' flexGrow={1}>
                    Kifejezések a karakterrel
                  </Typography>

                  <Stack
                    color='primary.main'
                    direction='row'
                    divider={<Divider orientation='vertical' flexItem />}
                    spacing={2}
                    flexGrow={1}
                  >
                    {['一早', '早上', '早日'].map((phrase, index) => (
                      <Box component='span' key={index} typography='chineseText' fontSize='inherit'>
                        {phrase}
                      </Box>
                    ))}
                    <Box component='span'>+3</Box>
                  </Stack>
                </Box> */}
              </fetcher.Form>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
