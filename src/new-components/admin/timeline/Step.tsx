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
import { Link } from 'react-router-dom'

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

  const tier = step.tier
  const lessonNumber = character.lessonNumber
  const indexInLesson = 'index' in step ? step.index : 0

  switch (contentType) {
    case 'keyword':
      return (
        <StepContentWrapper
          sx={{
            background: isReminder ? palette.background.paper : palette.primary[200]!,
            color: palette.primary.main,
            border: isReminder ? `3px solid ${palette.primary.main}` : undefined,
            justifyContent: 'center',
          }}
          {...{
            contentType,
            deleteEntry,
            index,
            tier,
            lessonNumber,
            indexInLesson,
            step,
          }}
        >
          <Box alignItems='center' display='flex'>
            <When condition={isReminder}>
              <ReminderIcon />
            </When>

            <Typography fontWeight='bold' margin='auto'>
              {character.keyword}
            </Typography>
          </Box>
        </StepContentWrapper>
      )
    case 'primitive':
      return (
        <StepContentWrapper
          sx={{
            background: isReminder ? palette.background.paper : palette.secondary[200]!,
            color: palette.secondary.main,
            border: isReminder ? `3px solid ${palette.secondary.main}` : undefined,
          }}
          {...{
            contentType,
            deleteEntry,
            tier,
            lessonNumber,
            indexInLesson,
            index,
            step,
          }}
        >
          <Box alignItems='center' display='flex'>
            <When condition={isReminder}>
              <ReminderIcon />
            </When>

            <Typography fontStyle='italic' margin='auto'>
              <FontAwesomeIcon color={palette.secondary.main} icon={faCube} style={{ marginRight: '4px' }} />
              {character.primitive!}
            </Typography>
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
            contentType,
            deleteEntry,
            tier,
            lessonNumber,
            indexInLesson,
            index,
            step,
          }}
        >
          <AddNews {...{ steps, index }} />
        </StepContentWrapper>
      )
    case 'keywordAndPrimitive':
      return (
        <StepContentWrapper
          sx={{
            background: isReminder
              ? palette.background.paper
              : `linear-gradient(150deg, ${palette.primary[200]} 25%, ${palette.secondary[200]} 75%)`,
            border: '3px solid',
            borderColor: !isReminder
              ? undefined
              : `${palette.primary.main} ${palette.secondary.main} ${palette.secondary.main} ${palette.primary.main}`,
          }}
          {...{
            contentType,
            deleteEntry,
            tier,
            lessonNumber,
            indexInLesson,
            index,
            step,
          }}
        >
          <Box alignItems='center' display='flex'>
            <When condition={isReminder}>
              <ReminderIcon />
            </When>

            <Typography color={palette.primary.main} fontWeight='bold'>
              {character.keyword}
            </Typography>

            <Divider flexItem orientation='vertical' sx={{ borderColor: palette.text.disabled, mx: 1 }} />

            <FontAwesomeIcon color={palette.secondary.main} icon={faCube} style={{ marginRight: '4px' }} />

            <Typography color={palette.secondary.main} fontStyle='italic'>
              {character.primitive}
            </Typography>
          </Box>
        </StepContentWrapper>
      )
    case 'keywordUnexpounded':
      return (
        <StepContentWrapper
          sx={{ bgcolor: palette.primary[100]!, color: palette.primary.main }}
          {...{
            contentType,
            deleteEntry,
            tier,
            lessonNumber,
            indexInLesson,
            index,
            step,
          }}
        >
          <Box alignItems='center' display='flex'>
            <When condition={isReminder}>
              <ReminderIcon />
            </When>

            <Typography fontWeight='bold'>{character.keyword}</Typography>
          </Box>
        </StepContentWrapper>
      )
    default:
      return <></>
  }
}

function ReminderIcon() {
  const { palette } = useTheme()

  return (
    <Tooltip title='Emlékeztető'>
      <span>
        <FontAwesomeIcon color={palette.warning.main} icon={faBell} transform='shrink-4' style={{ marginRight: '4px' }} />
      </span>
    </Tooltip>
  )
}

function StepContentWrapper({
  contentType,
  deleteEntry,
  tier,
  lessonNumber,
  indexInLesson,
  index,
  step,
  children,
  ...restProps
}: BoxProps & {
  contentType: BlueprintStepType | null
  deleteEntry: (source: number) => void
  tier: number
  lessonNumber: number
  indexInLesson: number
  index: number
  step: PotentialOccurrence
}) {
  return (
    <Box
      borderRadius={({ spacing }) => spacing(6)}
      display='grid'
      minHeight={({ spacing }) => spacing(10)}
      pr={3}
      pl={2}
      {...restProps}
      sx={{ grid: `"location content actions" auto / 1fr 7fr 1fr`, ...restProps.sx }}
    >
      <When condition={contentType !== 'unset'}>
        <CourseLocation {...{ tier, lessonNumber, indexInLesson }} />
      </When>

      <Box margin='auto' gridArea='content'>
        {children}
      </Box>

      <Actions {...{ step, contentType, deleteEntry, index }} />
    </Box>
  )
}

function CourseLocation({ tier, lessonNumber, indexInLesson }: { tier: number; lessonNumber: number; indexInLesson: number }) {
  return (
    <Button
      component={Link}
      to={`/admin/lessons/${lessonNumber}`}
      variant='text'
      size='small'
      sx={{ alignSelf: 'center', height: 'fit-content' }}
    >
      {tier}/{lessonNumber}/{indexInLesson}
    </Button>
  )
}

function Actions({
  step,
  contentType,
  deleteEntry,
  index,
}: {
  step: PotentialOccurrence
  contentType: BlueprintStepType | null
  deleteEntry: (source: number) => void
  index: number
}) {
  const canAddStory = !('story' in step) && ['keyword', 'primitive', 'keywordAndPrimitive'].includes(step.type)

  const canEditStory = 'story' in step

  const canBeDeleted = contentType !== 'unset'

  return (
    <Stack alignItems='center' direction='row' gap={1.5} justifyContent='flex-end'>
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

function AddNews({ steps, index }: { steps: SortedOccurrences; index: number }) {
  const canAddKeyword = !steps.some(step => step.type === 'keyword') && !steps.some(step => step.type === 'keywordAndPrimitive')

  const canAddPrimitive = !steps.some(step => ['keyword', 'primitive', 'keywordAndPrimitive'].includes(step.type))

  const canAddReminder = getReminderContentType(steps, index) !== null

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
