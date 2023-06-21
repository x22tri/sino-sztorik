import { Box, Divider, Palette, Stack, Step, StepContent, Stepper, Typography, useTheme } from '@mui/material'
import { useFetcher, useLoaderData, useSearchParams } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { Else, If, Then } from 'react-if'
import { DiffInfoTier, DiffedCharacterEntry, DiffedCharacterEntryVariant } from '../../shared/logic/loadAdminChar'
import { PreviewCharacterVariant } from './preview-character-variant/PreviewCharacterVariant'
import { AddCharacterVariant } from './add-character-variant/AddCharacterVariant'
import { CharEditForm } from '../char-edit-form/CharEditForm'
import { CharacterEntry, CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { LocationInLesson } from './LocationInLesson'
import { BlueprintStep, BlueprintStepType, TimelineDragAndDrop } from '../timeline-drag-and-drop/TimelineDragAndDrop'
import { BlueprintSelect } from '../blueprint-select/BlueprintSelect'
import { useState } from 'react'
import { Blueprint } from '../Blueprint'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type X = Omit<DiffedCharacterEntryVariant, 'index' | 'tier' | 'newInfo' | 'modifiedInfo'>

export function mergePreviousTiers(variants: CharacterEntryVariant[], tierToStopAt: number): X {
  return variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

export default function AdminContent() {
  const { constants } = useTheme()
  const { character, diffInfos } = useLoaderData() as { character: CharacterEntry; diffInfos: DiffInfoTier[] }
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTier = Number(searchParams.get('tier'))
  const [blueprint, setBlueprint] = useState(character.blueprint)

  // console.log(character)

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

  const blueprintSteps = getBlueprintSteps(character)

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

        <TimelineDragAndDrop {...{ blueprintSteps, getBlueprintSteps }} />
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

export function getBlueprintSteps({ variants }: CharacterEntry): BlueprintStep[] {
  return variants.map((variant, index) => ({ id: `id-${index}`, ...getBlueprintStep(variant, index, variants) }))

  //   if ('keyword' in variant && 'primitive' in variant) {
  //     return { id: `id-${index}`, variant, type: 'keywordAndPrimitive' }
  //   }

  //   if ('keyword' in variant) {
  //     return index === findLastIndex(variants, v => 'keyword' in v)
  //       ? { id: `id-${index}`, variant, type: 'keyword' }
  //       : { id: `id-${index}`, variant, type: 'keywordUnexpounded' }
  //   }

  //   if ('primitive' in variant) {
  //     return { id: `id-${index}`, variant, type: 'primitive' }
  //   }

  //   if ('reminder' in variant) {
  //     const previousTiers = mergePreviousTiers(variants, index + 1)

  //     return { id: `id-${index}`, variant, type: 'reminder' }
  //   }

  //   return { id: `id-${index}`, variant, type: 'unset' }
  // })
}

function getKeyword(variant: CharacterEntryVariant) {
  return (
    <Typography fontWeight='bold' margin='auto'>
      {variant.keyword}
    </Typography>
  )
}

function getKeywordAndPrimitive(palette: Palette, variant: CharacterEntryVariant) {
  return (
    <Box alignItems='center' display='flex' margin='auto'>
      <Typography fontWeight='bold'>{variant.keyword}</Typography>
      <Divider flexItem orientation='vertical' sx={{ borderColor: palette.secondary.contrastText, mx: 1 }} />
      <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />
      <Typography fontStyle='italic'>{variant.primitive}</Typography>
    </Box>
  )
}

function getPrimitive(palette: Palette, variant: CharacterEntryVariant) {
  return (
    <Typography fontStyle='italic' margin='auto'>
      <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />
      {variant.primitive}
    </Typography>
  )
}

function getUnset() {
  return <Box margin='auto' />
}

export function getBlueprintStep(
  variant: CharacterEntryVariant,
  index: number,
  allVariants: CharacterEntryVariant[],
  isReminder: boolean = false
): {
  variant: CharacterEntryVariant
  type: BlueprintStepType
  isReminder: boolean // To-Do: add parentheses around content when isReminder
} {
  if ('keyword' in variant && 'primitive' in variant) {
    return { variant, type: 'keywordAndPrimitive', isReminder }
  }

  if ('keyword' in variant) {
    if (isReminder) {
      return index > findLastIndex(allVariants, v => 'keyword' in v)
        ? { variant, type: 'keyword', isReminder }
        : { variant, type: 'keywordUnexpounded', isReminder }
    }

    return index === findLastIndex(allVariants, v => 'keyword' in v)
      ? { variant, type: 'keyword', isReminder }
      : { variant, type: 'keywordUnexpounded', isReminder }
  }

  if ('primitive' in variant) {
    return { variant, type: 'primitive', isReminder }
  }

  if ('reminder' in variant) {
    const previousTiers = mergePreviousTiers(allVariants, index + 1) as CharacterEntryVariant
    return getBlueprintStep(previousTiers, index, allVariants, true)
  }

  return { variant, type: 'unset', isReminder }
}

/**
 * Returns the index of the last element in the array where predicate is true, and -1
 * otherwise.
 * @param array The source array to search in
 * @param predicate find calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
 */
export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length
  while (l--) {
    if (predicate(array[l], l, array)) return l
  }
  return -1
}
