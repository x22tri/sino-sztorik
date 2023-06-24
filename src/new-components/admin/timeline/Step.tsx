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
  deleteEntry,
  step,
  steps,
}: {
  character: SortedCharacterEntry
  index: number
  deleteEntry: (source: number) => void
  step: PotentialOccurrence
  steps: SortedOccurrences
}) {
  const { palette } = useTheme()

  const isReminder = step.type === 'reminder'

  const contentType = isReminder ? getReminderContentType(steps, index) : step.type

  const canBeDeleted = contentType !== 'unset'

  const canAddKeyword = !steps.some(step => step.type === 'keyword') && !steps.some(step => step.type === 'keywordAndPrimitive')

  const canAddPrimitive =
    !steps.some(step => step.type === 'primitive') && !steps.some(step => step.type === 'keywordAndPrimitive')

  const canAddReminder = getReminderContentType(steps, index) !== null

  const canAddStory =
    (step.type === 'keyword' || step.type === 'primitive' || step.type === 'keywordAndPrimitive') && !('story' in step)

  const canEditStory = 'story' in step

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
            canBeDeleted,
            canAddStory,
            canEditStory,
            contentType,
            deleteEntry,
            index,
            tier,
            lessonNumber,
            indexInLesson,
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
            canBeDeleted,

            canAddStory,
            canEditStory,
            contentType,
            deleteEntry,
            tier,
            lessonNumber,
            indexInLesson,
            index,
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
            canBeDeleted,

            canAddStory,
            canEditStory,
            contentType,
            deleteEntry,
            tier,
            lessonNumber,
            indexInLesson,
            index,
          }}
        >
          <AddNews {...{ canAddKeyword, canAddPrimitive, canAddReminder }} />
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
            canBeDeleted,

            canAddStory,
            canEditStory,
            contentType,
            deleteEntry,
            tier,
            lessonNumber,
            indexInLesson,
            index,
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
            canBeDeleted,
            canAddStory,
            canEditStory,
            contentType,
            deleteEntry,
            tier,
            lessonNumber,
            indexInLesson,
            index,
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
  canBeDeleted,

  canAddStory,
  canEditStory,
  contentType,
  deleteEntry,
  tier,
  lessonNumber,
  indexInLesson,
  index,

  children,
  ...restProps
}: BoxProps & {
  canBeDeleted: boolean

  canAddStory: boolean
  canEditStory: boolean
  contentType: BlueprintStepType | null
  deleteEntry: (source: number) => void
  tier: number
  lessonNumber: number
  indexInLesson: number
  index: number
}) {
  return (
    <Box
      borderRadius={({ spacing }) => spacing(6)}
      display='grid'
      minHeight={({ spacing }) => spacing(10)}
      pr={3}
      pl={2}
      {...restProps}
      sx={{ grid: `"location content actions" auto / 1fr 4fr 1fr`, ...restProps.sx }}
    >
      <When condition={contentType !== 'unset'}>
        <CourseLocation {...{ tier, lessonNumber, indexInLesson }} />
      </When>

      <Box margin='auto' gridArea='content'>
        {children}
      </Box>

      <Actions {...{ canAddStory, canEditStory, canBeDeleted, deleteEntry, index }} />
    </Box>
  )
}

function CourseLocation({ tier, lessonNumber, indexInLesson }: { tier: number; lessonNumber: number; indexInLesson: number }) {
  return (
    <Button variant='text' size='small' onClick={() => {}} sx={{ height: 'fit-content', alignSelf: 'center' }}>
      {tier}/{lessonNumber}/{indexInLesson}
    </Button>
  )
}

function Actions({
  canAddStory,
  canBeDeleted,
  canEditStory,
  deleteEntry,
  index,
}: {
  canAddStory: boolean
  canBeDeleted: boolean
  canEditStory: boolean
  deleteEntry: (source: number) => void
  index: number
}) {
  return (
    <Stack alignItems='center' direction='row' gap={1} justifyContent='flex-end'>
      {!canAddStory ? false : <AddNew icon={faBookOpen} isAction tooltip='Történet hozzáadása' onClick={() => {}} />}

      {!canEditStory ? (
        false
      ) : (
        <AddNew icon={faBookOpen} isAction mode='edit' tooltip='Történet szerkesztése' onClick={() => {}} />
      )}

      {!canBeDeleted ? (
        false
      ) : (
        <ToolbarButton icon={faTrash} tooltip='Karakter törlése a körből' onClick={() => deleteEntry(index)} sx={{ p: 0 }} />
      )}
    </Stack>
  )
}

function AddNews({
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
      {!canAddKeyword ? false : <AddNew icon={faKey} tooltip='Kulcsszó hozzáadása' onClick={() => {}} />}

      {!canAddPrimitive ? false : <AddNew icon={faCube} tooltip='Alapelem hozzáadása' onClick={() => {}} />}

      {!canAddReminder ? false : <AddNew icon={faBell} tooltip='Emlékeztető hozzáadása' onClick={() => {}} />}
    </Stack>
  )
}

function AddNew({
  icon,
  isAction = false,
  tooltip,
  mode = 'add',
  onClick,
}: {
  icon: IconDefinition
  isAction?: boolean
  tooltip: string
  mode?: 'add' | 'edit'
  onClick: () => void
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        className='fa-layers'
        {...{ onClick }}
        sx={{ color: isAction ? undefined : 'text.disabled', justifyContent: 'center' }}
      >
        <FontAwesomeIcon className='fa-fw' {...{ icon }} transform='left-4' />

        <FontAwesomeIcon icon={mode === 'add' ? faPlus : faPen} transform='shrink-6 up-9 right-9' />
      </IconButton>
    </Tooltip>
  )
}
