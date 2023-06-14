import { Stack, Step, StepContent, StepLabel, Stepper, useTheme } from '@mui/material'
import { useFetcher } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { CharacterSection } from './sections/CharacterSection'
import { useState } from 'react'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { CHAR_ENTRY } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Else, If, Then } from 'react-if'
import { LocationInLessonPreview } from './LocationInLessonPreview'

export default function AdminContent() {
  const fetcher = useFetcher()
  const [activeStep, setActiveStep] = useState(0)
  const { constants } = useTheme()

  const character = CHAR_ENTRY

  function changeTier(index: number) {
    // Fetch data by merging previous tiers.
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
            <StepLabel>
              <PreviewOrAddButton tier={step} {...{ character, changeTier }} />
            </StepLabel>
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

function PreviewOrAddButton({
  character,
  changeTier,
  tier,
}: {
  character: typeof CHAR_ENTRY
  changeTier: (index: number) => void
  tier: number
}) {
  const tierVariant = character.variants.find(variant => variant.tier === tier)

  // If tierVariant, fetch lesson preview

  return (
    <If condition={!!tierVariant}>
      <Then>
        <LocationInLessonPreview
          lessonPreview={[{ charChinese: '世', index: 10 }, { charChinese: '早', index: 11 }, null]}
          onClick={() => changeTier(tier - 1)}
        />
      </Then>
      <Else>
        <ToolbarButton
          color='primary'
          icon={faPlusSquare}
          tooltip='Új változat hozzáadása'
          onClick={() => changeTier(tier - 1)}
        />
      </Else>
    </If>
  )
}
