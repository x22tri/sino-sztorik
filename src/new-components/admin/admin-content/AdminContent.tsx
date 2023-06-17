import { Box, Button, Stack, Step, StepContent, Stepper, useTheme } from '@mui/material'
import { useFetcher, useLoaderData, useSearchParams } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { CharacterSection } from './sections/CharacterSection'
import { CHAR_ENTRY } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Else, If, Then } from 'react-if'
import { LocationInLessonPreview } from './LocationInLessonPreview'
import { Subheading } from '../../learn/headings/Subheading'
import { DiffInfoTier, DiffedCharacterEntry } from '../../shared/logic/loadAdminChar'
import { PreviewCharacterVariant } from './preview-character-variant/PreviewCharacterVariant'
import { AddCharacterVariant } from './add-character-variant/AddCharacterVariant'
import { ADMIN_CANCEL_SAVE, ADMIN_SAVE_CHANGES } from '../../shared/strings'

export default function AdminContent() {
  const fetcher = useFetcher()
  const { constants } = useTheme()
  const { character, diffInfos } = useLoaderData() as { character: DiffedCharacterEntry; diffInfos: DiffInfoTier[] }
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTier = Number(searchParams.get('tier'))

  function changeTier(tier: number) {
    // Fetch data by merging previous tiers.
    // Idea - have two objects: "previousInfo" and "newInfo".
    // Add simple boxes with Edit button (pencil) for "previousInfo" properties and textboxes for "newInfo" properties.
    // Clicking on Edit turns a simple box into a textbox, removes the property from previousInfo and adds it into newInfo.
    // This character object will then be the basis for rendering below.
    // let activeTier = Number(searchParams.get('tier'))

    if (tier === activeTier) {
      searchParams.delete('tier')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ tier: String(tier) })
    }
  }

  function mergePreviousTiers(charEntry: typeof CHAR_ENTRY, tierToStopAt: number) {
    const x = charEntry.variants
      .slice(0, tierToStopAt)
      .reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
    return x
  }

  console.log(diffInfos)

  // console.log(mergePreviousTiers(CHAR_ENTRY, 3))

  function isNotPresentInTier(object: object) {
    return Object.keys(object).length === 2 // "newInfo" and "modifiedInfo"
  }

  return (
    <Stack
      boxSizing='border-box'
      bgcolor='background.paper'
      component='main'
      display='flex'
      flexDirection='column'
      minHeight={`calc(100vh - ${constants.bottomToolbarHeight})`}
      paddingX={2}
    >
      <Heading title='Idővonal' />

      <Stepper nonLinear orientation='vertical' activeStep={activeTier - 1 ?? -1}>
        {[1, 2, 3, 4].map((tier, index) => (
          <Step key={index}>
            <If condition={!isNotPresentInTier(character.variants[index])}>
              <Then>
                <PreviewCharacterVariant
                  isActive={tier === activeTier}
                  variant={character.variants[index]}
                  onClick={() => changeTier(tier)}
                />
              </Then>
              <Else>
                <AddCharacterVariant onClick={() => changeTier(tier)} />
              </Else>
            </If>

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

              <Subheading title='Leckében elfoglalt hely' />

              <LocationInLessonPreview
                lessonPreview={[{ charChinese: '世', index: 10 }, { charChinese: '早', index: 11 }, null]}
                onClick={() => {}}
              />

              <Box alignItems='center' display='flex' gap={2} justifyContent='flex-end'>
                <Button variant='text'>{ADMIN_CANCEL_SAVE}</Button>
                <Button form='char-form' type='submit' variant='contained'>
                  {ADMIN_SAVE_CHANGES}
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
