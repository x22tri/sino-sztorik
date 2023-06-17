import {
  Box,
  Button,
  Chip,
  Stack,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  useTheme,
  useThemeProps,
} from '@mui/material'
import { useFetcher, useLoaderData } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { CharacterSection } from './sections/CharacterSection'
import { useState } from 'react'
import {
  IconDefinition,
  faBookOpen,
  faChartColumn,
  faCube,
  faCubesStacked,
  faKey,
  faPen,
  faPlus,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { CHAR_ENTRY, CharacterEntry } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Case, Else, If, Switch, Then, When } from 'react-if'
import { LocationInLessonPreview } from './LocationInLessonPreview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Subheading } from '../../learn/headings/Subheading'
import { DiffedCharacterEntry, DiffedCharacterEntryVariant } from '../../shared/logic/loadAdminChar'

const CHAR_ENTRY_CONVERTED = {
  charChinese: '早',
  lessonNumber: 2,
  phrases: [1, 2], // An array of phrase ID's.
  similars: [3], // An array of "similar" ID's.
  variants: [
    {
      constituents: ['日', '十'], // Call getUnlockedMeanings before presenting to the user.
      frequency: 462,
      index: 11,
      keyword: 'korai',
      otherUses: [
        { pinyin: 'zhèng', meanings: ['test1', 'test2'] },
        { pinyin: 'zhēng', meanings: ['test3'] },
      ],
      pinyin: 'zǎo',
      story: [
        [
          `Egy `,
          { constituent: 'nap', references: '日' },
          ` amely egy `,
          { constituent: 'tűn', references: '十' },
          `pihen meg – gyakorlatilag ilyen egy napraforgó, annak vékony szárával és ragyogó virágával.`,
        ],
        [
          `Ismeretes, hogy azért hívjuk a napraforgót napraforgónak, mert követi a `,
          { constituent: 'nap', references: '日' },
          `mozgását – magyarán, a kertben a `,
          { constituent: 'nap', references: '日' },
          ` erre a virágra süt a leg`,
          { keyword: 'korábban' },
          `. Nem csoda hát, hogy a karakter jelentése `,
          { keyword: '„korai”' },
          `.`,
        ],
      ],
      tier: 1,
    },
    {
      index: 8,
      primitive: 'napraforgó',
      story: [
        [
          `Egy `,
          { constituent: 'nap', references: '日' },
          ` amely egy `,
          { constituent: 'tűn', references: '十' },
          `pihen meg – gyakorlatilag ilyen egy `,
          { primitive: 'napraforgó' },
          `, annak vékony szárával és ragyogó virágával.`,
        ],
        [
          `Ismeretes, hogy azért hívjuk a `,
          { primitive: 'napraforgót napraforgónak' },
          `, mert követi a `,
          { constituent: 'nap', references: '日' },
          `mozgását – magyarán, a kertben a `,
          { constituent: 'nap', references: '日' },
          ` erre a virágra süt a leg`,
          { keyword: 'korábban' },
          `. Nem csoda hát, hogy a karakter jelentése `,
          { keyword: '„korai”' },
          `.`,
        ],
      ],
      tier: 2,
    }, // When there's a "primitive" property on a variant that isn't the first one in the array, a "newPrimitive" flag is added.
    {
      // index: 2,
      // tier: 3,
    }, // When only these two properties exist on a variant, a "reminder" flag is added.
  ],
}

export default function AdminContent() {
  const fetcher = useFetcher()
  const [activeStep, setActiveStep] = useState(-1)
  const { constants } = useTheme()
  const character = useLoaderData() as DiffedCharacterEntry

  function changeTier(index: number) {
    // Fetch data by merging previous tiers.
    // Idea - have two objects: "previousInfo" and "newInfo".
    // Add simple boxes with Edit button (pencil) for "previousInfo" properties and textboxes for "newInfo" properties.
    // Clicking on Edit turns a simple box into a textbox, removes the property from previousInfo and adds it into newInfo.
    // This character object will then be the basis for rendering below.
    setActiveStep(activeStep === index ? -1 : index)
  }

  function mergePreviousTiers(charEntry: typeof CHAR_ENTRY, tierToStopAt: number) {
    const x = charEntry.variants
      .slice(0, tierToStopAt)
      .reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
    // console.log(x)
    return x
  }

  // console.log(character)

  // console.log(mergePreviousTiers(CHAR_ENTRY, 3))

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
            <PreviewOrAddButton tier={step} variant={character.variants[index]} {...{ changeTier }} />

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
                onClick={() => changeTier(step - 1)}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}

function PreviewOrAddButton({
  changeTier,
  tier,
  variant,
}: {
  changeTier: (index: number) => void
  tier: number
  variant: DiffedCharacterEntryVariant
}) {
  console.log(variant)
  const { palette } = useTheme()

  // If tierVariant, fetch lesson preview

  function isEmpty(object: object) {
    return Object.keys(object).length === 2 // "newInfo" and "modifiedInfo"
  }

  const keyIconDictionary: Partial<Record<keyof DiffedCharacterEntryVariant, IconDefinition>> = {
    keyword: faKey,
    primitive: faCube,
    story: faBookOpen,
    constituents: faCubesStacked,
    frequency: faChartColumn,
  }

  return (
    <If condition={!isEmpty(variant)}>
      <Then>
        <StepButton
          onClick={() => changeTier(tier - 1)}
          sx={{
            py: 0,
            my: 1,
            transition: ({ constants }) => constants.animationDuration,
            '.MuiStepIcon-root': { transition: ({ constants }) => constants.animationDuration },
            ':hover': { borderBottom: `3px solid ${palette.primary.main}` },
          }}
        >
          <When condition={variant.newInfo.length > 0}>
            <Stack alignItems='stretch' direction='row' gap={1}>
              <FontAwesomeIcon icon={faPlus} size='sm' style={{ alignSelf: 'center' }} />

              {variant.newInfo.map(newInfoKey => (
                <Switch key={newInfoKey}>
                  <Case condition={newInfoKey === 'keyword'}>
                    <Chip
                      icon={<FontAwesomeIcon color={palette.primary.main} icon={faKey} size='sm' />}
                      label={variant.keyword}
                      sx={{ bgcolor: 'primary.100', color: 'primary.main', pointerEvents: 'none', pl: 0.5 }}
                    />
                  </Case>
                  <Case condition={newInfoKey === 'primitive'}>
                    <Chip
                      icon={<FontAwesomeIcon color={palette.secondary.main} icon={faCube} size='sm' />}
                      label={variant.primitive}
                      sx={{ bgcolor: 'secondary.100', color: 'secondary.main', pointerEvents: 'none', pl: 0.5 }}
                    />
                  </Case>
                  <Case condition={newInfoKey === 'story'}>
                    <Box alignItems='center' display='flex' bgcolor='grey.200' borderRadius={({ spacing }) => spacing(2)} p={1}>
                      <FontAwesomeIcon icon={faBookOpen} size='sm' />
                    </Box>
                  </Case>
                </Switch>

                // <When condition={newInfoKey in keyIconDictionary} key={newInfoKey}>
                //   <Chip icon={<FontAwesomeIcon icon={keyIconDictionary[newInfoKey]!} size='sm' />} label={newInfoKey} />
                // </When>
              ))}
            </Stack>
          </When>

          {/* To-Do: Hide button if current tier? */}
        </StepButton>
      </Then>
      <Else>
        <StepLabel>
          <Button
            onClick={() => changeTier(tier - 1)}
            size='small'
            startIcon={<FontAwesomeIcon icon={faPlusSquare} />}
            sx={{ px: 1.5 }}
          >
            Új változat hozzáadása
          </Button>
        </StepLabel>
      </Else>
    </If>
  )
}
