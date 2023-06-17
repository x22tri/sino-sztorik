import { Box, Button, Stack, Step, StepContent, Stepper, useTheme } from '@mui/material'
import { useFetcher, useLoaderData, useSearchParams } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { CharacterSection } from './sections/CharacterSection'
import { CHAR_ENTRY } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Else, If, Then } from 'react-if'
import { LocationInLessonPreview } from './LocationInLessonPreview'
import { Subheading } from '../../learn/headings/Subheading'
import { DiffInfoTier, DiffedCharacterEntry, DiffedCharacterEntryVariant } from '../../shared/logic/loadAdminChar'
import { PreviewCharacterVariant } from './preview-character-variant/PreviewCharacterVariant'
import { AddCharacterVariant } from './add-character-variant/AddCharacterVariant'
import { ADMIN_CANCEL_SAVE, ADMIN_SAVE_CHANGES } from '../../shared/strings'
import { FormContainer, useForm } from 'react-hook-form-mui'
import { CharEditForm } from '../char-edit-form/CharEditForm'

export type X = Omit<DiffedCharacterEntryVariant, 'index' | 'tier' | 'newInfo' | 'modifiedInfo'>

export function mergePreviousTiers(charEntry: DiffedCharacterEntry, tierToStopAt: number): X {
  return charEntry.variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

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
          <Step key={tier}>
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
              <CharEditForm />
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
