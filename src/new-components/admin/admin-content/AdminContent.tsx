import { Box, Stack, Step, StepContent, Stepper, Typography, useTheme } from '@mui/material'
import { useFetcher, useLoaderData, useSearchParams } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { Else, If, Then } from 'react-if'
import { DiffInfoTier, DiffedCharacterEntry, DiffedCharacterEntryVariant } from '../../shared/logic/loadAdminChar'
import { PreviewCharacterVariant } from './preview-character-variant/PreviewCharacterVariant'
import { AddCharacterVariant } from './add-character-variant/AddCharacterVariant'
import { CharEditForm } from '../char-edit-form/CharEditForm'
import { CharacterEntry } from '../../shared/MOCK_DATABASE_ENTRIES'
import { LocationInLesson } from './LocationInLesson'
import { BlueprintStep, TimelineDragAndDrop } from '../timeline-drag-and-drop/TimelineDragAndDrop'
import { BlueprintSelect } from '../blueprint-select/BlueprintSelect'
import { useState } from 'react'
import { Blueprint } from '../Blueprint'

export type X = Omit<DiffedCharacterEntryVariant, 'index' | 'tier' | 'newInfo' | 'modifiedInfo'>

export function mergePreviousTiers(charEntry: DiffedCharacterEntry, tierToStopAt: number): X {
  return charEntry.variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

export default function AdminContent() {
  const { constants } = useTheme()
  const { character, diffInfos } = useLoaderData() as { character: CharacterEntry; diffInfos: DiffInfoTier[] }
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTier = Number(searchParams.get('tier'))
  const [blueprint, setBlueprint] = useState(character.blueprint)

  console.log(character)

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
    return !object || Object.keys(object).length === 0
  }

  const blueprintSteps = getBlueprintSteps(blueprint, character)

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

      <Typography marginBottom={3}>
        Válaszd ki, milyen séma szerint szeretnéd bevezetni a karaktert, majd szükség szerint rendezd át a sorrendet.
      </Typography>

      <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
        <BlueprintSelect {...{ blueprint, setBlueprint }} />

        <TimelineDragAndDrop {...{ blueprintSteps }} />
      </Box>

      {/* <Stepper nonLinear orientation='vertical' activeStep={activeTier - 1 ?? -1}>
        {[1, 2, 3, 4].map((tier, index) => (
          <Step key={tier}>
            <If condition={!isNotPresentInTier(character.variants[index])}>
              <Then>
                <PreviewCharacterVariant
                  isActive={tier === activeTier}
                  variant={character.variants[index]}
                  onClick={() => changeTier(tier)}
                  diffInfo={diffInfos[index]}
                />
              </Then>
              <Else>
                <AddCharacterVariant onClick={() => changeTier(tier)} />
              </Else>
            </If>

            <StepContent>
              <LocationInLesson tier={tier} lessonNumber={character.lessonNumber} index={character.variants[tier - 1]?.index} />

              <CharEditForm />
            </StepContent>
          </Step>
        ))}
      </Stepper> */}
    </Stack>
  )
}

function getBlueprintSteps(blueprint: Blueprint, character: CharacterEntry): BlueprintStep[] {
  return character.variants.map((variant, index) => {
    if ('keyword' in variant && 'primitive' in variant) {
      return { id: `id-${index}`, content: variant.keyword! + ' | ' + variant.primitive! }
    }

    if ('keyword' in variant) {
      return { id: `id-${index}`, content: variant.keyword! }
    }

    if ('primitive' in variant) {
      return { id: `id-${index}`, content: variant.primitive! }
    }

    if ('reminder' in variant) {
      return { id: `id-${index}`, content: '(Emlékeztető)' }
    }

    return { id: `id-${index}`, content: '' }
  })
}
