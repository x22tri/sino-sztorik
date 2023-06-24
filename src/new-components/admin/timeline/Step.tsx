import { Dispatch, ElementType, ForwardedRef, MouseEvent, SetStateAction, forwardRef, useState } from 'react'
import {
  IconDefinition,
  faBell,
  faBookOpen,
  faChevronDown,
  faChevronUp,
  faCodeMerge,
  faCube,
  faKey,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Typography,
  Box,
  Divider,
  BoxProps,
  useTheme,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Toolbar,
  IconButtonProps,
} from '@mui/material'
import { DraggableProvided } from 'react-beautiful-dnd'
import { X, mergePreviousTiers } from '../admin-content/AdminContent'
import { BlueprintStep, BlueprintStepType } from './Timeline'
import { Else, If, Then, When } from 'react-if'
import { getReminderContentType } from './getReminderContentType'
import { CharacterEntry, CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import ToolbarButton, { FadeControlledToolbarButton } from '../../shared/components/ToolbarButton'
import { PotentialOccurrence, SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'

export function Step({
  character,
  index,
  moveUp,
  moveDown,
  step,
  steps,
}: {
  character: SortedCharacterEntry
  index: number
  moveUp: (source: number) => void
  moveDown: (source: number) => void
  step: PotentialOccurrence
  steps: SortedOccurrences
}) {
  const { palette } = useTheme()

  const isReminder = step.type === 'reminder'

  const contentType = isReminder ? getReminderContentType(steps, index) : step.type

  const canMoveUp = index !== 0 && contentType !== 'unset' && !(isReminder && !getReminderContentType(steps, index - 1))

  const canMoveDown =
    index !== steps.length - 1 &&
    contentType !== 'unset' &&
    !(steps[index + 1].type === 'reminder' && !getReminderContentType(steps, index))

  const canBeDeleted =
    // true ||
    contentType !== 'unset' &&
    !(step.type === 'keyword' && 'keyword' in character) &&
    !(step.type === 'primitive' && 'primitive' in character)

  const canAddKeyword = steps.find(step => step.type === 'keyword') === undefined

  const canAddPrimitive = steps.find(step => step.type === 'primitive') === undefined

  const canAddReminder = getReminderContentType(steps, index) !== null

  const canAddStory = (step.type === 'keyword' || step.type === 'primitive') && !('story' in step)

  const canEditStory = 'story' in step

  const canCombineUp =
    (step.type === 'keyword' && steps[index - 1]?.type === 'primitive') ||
    (step.type === 'primitive' && steps[index - 1]?.type === 'keyword')

  const canCombineDown =
    (step.type === 'keyword' && steps[index + 1]?.type === 'primitive') ||
    (step.type === 'primitive' && steps[index + 1]?.type === 'keyword')

  const tier = step.tier
  const lessonNumber = character.lessonNumber
  const indexInLesson = 'index' in step ? step.index : 0

  switch (contentType) {
    case 'keyword':
      return (
        <StepContentWrapper
          sx={{
            background: isReminder ? palette.background.paper : palette.primary.main,
            color: isReminder ? palette.primary.main : palette.primary.contrastText,
            border: isReminder ? `3px solid ${palette.primary.main}` : undefined,
            justifyContent: 'center',
          }}
          {...{
            canMoveUp,
            canMoveDown,
            canBeDeleted,
            canCombineUp,
            canCombineDown,
            canAddStory,
            canEditStory,
            index,
            tier,
            lessonNumber,
            indexInLesson,
            moveUp,
            moveDown,
          }}
        >
          <Box alignItems='center' display='flex' flexDirection='column'>
            <Typography fontWeight='bold' margin='auto'>
              {character.keyword}
            </Typography>

            {/* <BottomRow {...{ canAddStory, canEditStory, isReminder }} /> */}
          </Box>
        </StepContentWrapper>
      )
    case 'primitive':
      return (
        <StepContentWrapper
          sx={{
            background: isReminder ? palette.background.paper : palette.secondary.main,
            color: isReminder ? palette.secondary.main : palette.secondary.contrastText,
            border: isReminder ? `3px solid ${palette.secondary.main}` : undefined,
          }}
          {...{
            canMoveUp,
            canMoveDown,
            canBeDeleted,
            canCombineUp,
            canCombineDown,
            canAddStory,
            canEditStory,
            tier,
            lessonNumber,
            indexInLesson,
            index,
            moveUp,
            moveDown,
          }}
        >
          <Box alignItems='center' display='flex' flexDirection='column' margin='auto'>
            <Typography fontStyle='italic' margin='auto'>
              <FontAwesomeIcon
                color={isReminder ? palette.secondary.main : palette.secondary.contrastText}
                icon={faCube}
                style={{ marginRight: '4px' }}
              />
              {character.primitive!}
            </Typography>

            {/* <BottomRow {...{ canAddStory, canEditStory, isReminder }} /> */}
          </Box>
        </StepContentWrapper>
      )
    case 'unset':
      return (
        <StepContentWrapper
          sx={{
            background: palette.grey[50],
            color: palette.text.disabled,
            outline: `2px dashed ${palette.text.disabled}`,
            outlineOffset: '-6px',
          }}
          {...{
            canMoveUp,
            canMoveDown,
            canBeDeleted,
            canCombineUp,
            canCombineDown,
            canAddStory,
            canEditStory,
            tier,
            lessonNumber,
            indexInLesson,
            index,
            moveUp,
            moveDown,
          }}
        >
          <AddNewVariantButtons {...{ canAddKeyword, canAddPrimitive, canAddReminder }} />
        </StepContentWrapper>
      )
    case 'keywordAndPrimitive':
      return (
        <StepContentWrapper
          sx={{
            background: isReminder
              ? palette.background.paper
              : `linear-gradient(150deg, ${palette.primary.main} 25%, ${palette.secondary.main} 75%)`,
            color: isReminder ? palette.primary.main : palette.secondary.contrastText,
            borderTop: isReminder ? `3px solid ${palette.primary.main}` : undefined,
            borderLeft: isReminder ? `3px solid ${palette.primary.main}` : undefined,
            borderBottom: isReminder ? `3px solid ${palette.secondary.main}` : undefined,
            borderRight: isReminder ? `3px solid ${palette.secondary.main}` : undefined,
          }}
          {...{
            canMoveUp,
            canMoveDown,
            canBeDeleted,
            canCombineUp,
            canCombineDown,
            canAddStory,
            canEditStory,
            tier,
            lessonNumber,
            indexInLesson,
            index,
            moveUp,
            moveDown,
          }}
        >
          <Box>
            <Box alignItems='center' display='flex' flexDirection='row'>
              <Typography color={isReminder ? palette.primary.main : palette.primary.contrastText} fontWeight='bold'>
                {character.keyword}
              </Typography>

              <Divider
                flexItem
                orientation='vertical'
                sx={{ borderColor: isReminder ? palette.text.disabled : palette.secondary.contrastText, mx: 1 }}
              />

              <FontAwesomeIcon
                color={isReminder ? palette.secondary.main : palette.secondary.contrastText}
                icon={faCube}
                style={{ marginRight: '4px' }}
              />

              <Typography color={isReminder ? palette.secondary.main : palette.secondary.contrastText} fontStyle='italic'>
                {character.primitive}
              </Typography>
            </Box>

            {/* <BottomRow {...{ canAddStory, canEditStory, isReminder }} /> */}
          </Box>
        </StepContentWrapper>
      )
    case 'keywordUnexpounded':
      return (
        <StepContentWrapper
          sx={{ bgcolor: palette.primary[100]!, color: palette.primary.main }}
          {...{
            canMoveUp,
            canMoveDown,
            canBeDeleted,
            canCombineUp,
            canCombineDown,
            canAddStory,
            canEditStory,
            tier,
            lessonNumber,
            indexInLesson,
            index,
            moveUp,
            moveDown,
          }}
        >
          <Typography fontWeight='bold'>{character.keyword}</Typography>

          {/* <BottomRow {...{ canAddStory, canEditStory, isReminder }} /> */}
        </StepContentWrapper>
      )
    default:
      return <></>
  }
}
function StepContentWrapper({
  canMoveUp,
  canMoveDown,
  canBeDeleted,
  canCombineUp,
  canCombineDown,
  canAddStory,
  canEditStory,
  tier,
  lessonNumber,
  indexInLesson,
  index,
  moveUp,
  moveDown,
  children,
  ...restProps
}: BoxProps & {
  canMoveUp: boolean
  canMoveDown: boolean
  canBeDeleted: boolean
  canCombineUp: boolean
  canCombineDown: boolean
  canAddStory: boolean
  canEditStory: boolean
  tier: number
  lessonNumber: number
  indexInLesson: number
  index: number
  moveUp: (source: number) => void
  moveDown: (source: number) => void
}) {
  return (
    <Box borderRadius={({ spacing }) => spacing(6)} display='flex' p={1} {...restProps}>
      <ReorderButtons
        {...{ canMoveUp, canMoveDown, canCombineUp, canCombineDown, tier, lessonNumber, indexInLesson, index, moveUp, moveDown }}
      />

      <Box margin='auto'>{children}</Box>

      <Actions {...{ canAddStory, canEditStory, canBeDeleted }} />
    </Box>
  )
}

function ReorderButtons({
  canMoveUp,
  canMoveDown,
  canCombineUp,
  canCombineDown,
  tier,
  lessonNumber,
  indexInLesson,
  index,
  moveUp,
  moveDown,
}: {
  canMoveUp: boolean
  canMoveDown: boolean
  canCombineUp: boolean
  canCombineDown: boolean
  tier: number
  lessonNumber: number
  indexInLesson: number
  index: number
  moveUp: (source: number) => void
  moveDown: (source: number) => void
}) {
  return (
    <Box
      display='grid'
      sx={{
        grid: `".      moveUp   combineUp" auto
               "lesson lesson   lesson" auto
               ".      moveDown combineDown" auto
                / 1fr 1fr 1fr`,
      }}
    >
      <FadeControlledToolbarButton
        tooltip='Mozgatás felfelé'
        icon={faChevronUp}
        onClick={() => moveUp(index)}
        size='small'
        sx={{ visibility: canMoveUp ? 'default' : 'hidden', gridArea: 'moveUp' }}
      />

      <FadeControlledToolbarButton
        tooltip='Kombinálás felfelé'
        icon={faCodeMerge}
        onClick={() => moveUp(index)}
        size='small'
        sx={{ visibility: canCombineUp ? 'default' : 'hidden', gridArea: 'combineUp' }}
      />

      <Button
        variant='text'
        size='small'
        onClick={() => {}}
        sx={{ p: 0, visibility: indexInLesson ? 'default' : 'hidden', gridArea: 'lesson' }}
      >
        {tier}/{lessonNumber}/{indexInLesson}
      </Button>

      <FadeControlledToolbarButton
        tooltip='Mozgatás lefelé'
        icon={faChevronDown}
        onClick={() => moveDown(index)}
        size='small'
        sx={{ visibility: canMoveDown ? 'default' : 'hidden', gridArea: 'moveDown' }}
      />

      <FadeControlledToolbarButton
        tooltip='Kombinálás lefelé'
        icon={faCodeMerge}
        onClick={() => moveDown(index)}
        size='small'
        sx={{ visibility: canCombineDown ? 'default' : 'hidden', gridArea: 'combineDown' }}
      />
    </Box>
  )
}

function Actions({
  canAddStory,
  canBeDeleted,
  canEditStory,
}: {
  canAddStory: boolean
  canBeDeleted: boolean
  canEditStory: boolean
}) {
  return (
    <Stack alignItems='center' divider={<Divider flexItem />} gap={1} justifyContent='center' minWidth='64px'>
      {!canBeDeleted ? (
        false
      ) : (
        <ToolbarButton icon={faTrash} tooltip='Karakter törlése a körből' onClick={() => {}} sx={{ p: 0 }} />
      )}

      {!canAddStory ? false : <AddNewVariantButton icon={faBookOpen} tooltip='Történet hozzáadása' onClick={() => {}} />}

      {!canEditStory ? (
        false
      ) : (
        <AddNewVariantButton icon={faBookOpen} mode='edit' tooltip='Történet szerkesztése' onClick={() => {}} />
      )}
    </Stack>
  )
}

// function BottomRow({
//   canAddStory,
//   canEditStory,
//   isReminder,
// }: {
//   canAddStory: boolean
//   canEditStory: boolean
//   isReminder: boolean
// }) {
//   if (canAddStory) {
//     return (
//       <Button
//         color='white'
//         size='small'
//         variant='text'
//         startIcon={<FontAwesomeIcon icon={faBookOpen} transform='shrink-4' />}
//         onClick={() => {}}
//         sx={{ opacity: 0.8, lineHeight: 1, '.MuiButton-startIcon': { marginRight: '2px' }, ':hover': { opacity: 1 } }}
//       >
//         Történet hozzáadása
//       </Button>
//     )
//   }

//   if (canEditStory) {
//     return (
//       <Button
//         color='white'
//         size='small'
//         variant='text'
//         startIcon={<FontAwesomeIcon icon={faPen} transform='shrink-4' />}
//         onClick={() => {}}
//         sx={{ opacity: 0.8, lineHeight: 1, '.MuiButton-startIcon': { marginRight: '2px' }, ':hover': { opacity: 1 } }}
//       >
//         Történet szerkesztése
//       </Button>
//     )
//   }

//   if (isReminder) {
//     return (
//       <Box alignItems='center' display='flex' gap={0.5} justifyContent='center' sx={{ opacity: 0.8 }}>
//         <FontAwesomeIcon icon={faBell} transform='shrink-3' />
//         <Typography variant='button'>Emlékeztető</Typography>
//       </Box>
//     )
//   }

//   return null
// }

function AddNewVariantButtons({
  canAddKeyword,
  canAddPrimitive,
  canAddReminder,
}: {
  canAddKeyword: boolean
  canAddPrimitive: boolean
  canAddReminder: boolean
}) {
  return (
    <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={2}>
      {!canAddKeyword ? false : <AddNewVariantButton icon={faKey} tooltip='Kulcsszó hozzáadása' onClick={() => {}} />}

      {!canAddPrimitive ? false : <AddNewVariantButton icon={faCube} tooltip='Alapelem hozzáadása' onClick={() => {}} />}

      {!canAddReminder ? false : <AddNewVariantButton icon={faBell} tooltip='Emlékeztető hozzáadása' onClick={() => {}} />}
    </Stack>
  )
}

function AddNewVariantButton({
  icon,
  tooltip,
  mode = 'add',
  onClick,
}: {
  icon: IconDefinition
  tooltip: string
  mode?: 'add' | 'edit'
  onClick: () => void
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton className='fa-layers' {...{ onClick }} sx={{ color: 'text.disabled', justifyContent: 'center' }}>
        <FontAwesomeIcon className='fa-fw' {...{ icon }} transform='left-4' />

        <FontAwesomeIcon icon={mode === 'add' ? faPlus : faPen} transform='shrink-6 up-8 right-8' />
      </IconButton>
    </Tooltip>
  )
}
