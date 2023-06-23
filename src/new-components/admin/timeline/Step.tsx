import { faBell, faBookOpen, faChevronDown, faChevronUp, faCube, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography, Box, Divider, BoxProps, useTheme, Button, IconButton } from '@mui/material'
import { DraggableProvided } from 'react-beautiful-dnd'
import { X } from '../admin-content/AdminContent'
import { BlueprintStep, BlueprintStepType } from './Timeline'
import { When } from 'react-if'
import { getReminderContentType } from './getReminderContentType'
import { CharacterEntry } from '../../shared/MOCK_DATABASE_ENTRIES'

export function Step({
  character,
  index,
  mergedChar,
  moveUp,
  moveDown,
  step,
  steps,
}: {
  character: CharacterEntry
  index: number
  mergedChar: X
  moveUp: (source: number) => void
  moveDown: (source: number) => void
  step: BlueprintStep
  steps: BlueprintStep[]
}) {
  const { palette } = useTheme()

  const isReminder = step.type === 'reminder'

  const type = isReminder ? getReminderContentType(steps, index) : step.type

  const canMoveUp = index !== 0 && type !== 'unset'

  const canMoveDown = index !== steps.length - 1 && type !== 'unset'

  const canBeDeleted = type !== 'unset'

  const tier = step.variant.tier
  const lessonNumber = character.lessonNumber
  const indexInLesson = step.variant.index

  switch (type) {
    case 'keyword':
      return (
        <StepContentWrapper
          sx={{
            background: isReminder ? palette.background.paper : palette.primary.main,
            color: isReminder ? palette.primary.main : palette.primary.contrastText,
            border: isReminder ? `3px solid ${palette.primary.main}` : undefined,
            justifyContent: 'center',
          }}
          {...{ canMoveUp, canMoveDown, canBeDeleted, index, tier, lessonNumber, indexInLesson, moveUp, moveDown }}
        >
          <Box alignItems='center' display='flex' flexDirection='column'>
            <Typography fontWeight='bold' margin='auto'>
              {mergedChar.keyword}
            </Typography>

            <When condition={isReminder}>
              <ReminderLabel />
            </When>
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
          {...{ canMoveUp, canMoveDown, canBeDeleted, tier, lessonNumber, indexInLesson, index, moveUp, moveDown }}
        >
          <Box alignItems='center' display='flex' flexDirection='column' margin='auto'>
            <Typography fontStyle='italic' margin='auto'>
              <FontAwesomeIcon
                color={isReminder ? palette.secondary.main : palette.secondary.contrastText}
                icon={faCube}
                style={{ marginRight: '4px' }}
              />
              {mergedChar.primitive!}
            </Typography>

            <When condition={isReminder}>
              <ReminderLabel />
            </When>
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
          {...{ canMoveUp, canMoveDown, canBeDeleted, tier, lessonNumber, indexInLesson, index, moveUp, moveDown }}
        >
          <Box margin='auto' />
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
          {...{ canMoveUp, canMoveDown, canBeDeleted, tier, lessonNumber, indexInLesson, index, moveUp, moveDown }}
        >
          <Box>
            <Box alignItems='center' display='flex' flexDirection='row'>
              <Typography color={isReminder ? palette.primary.main : palette.primary.contrastText} fontWeight='bold'>
                {mergedChar.keyword}
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
                {mergedChar.primitive}
              </Typography>
            </Box>

            <When condition={isReminder}>
              <ReminderLabel />
            </When>
          </Box>
        </StepContentWrapper>
      )
    case 'keywordUnexpounded':
      return (
        <StepContentWrapper
          sx={{ bgcolor: palette.primary[100]!, color: palette.primary.main }}
          {...{ canMoveUp, canMoveDown, canBeDeleted, tier, lessonNumber, indexInLesson, index, moveUp, moveDown }}
        >
          <Typography fontWeight='bold'>{mergedChar.keyword}</Typography>
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
  tier: number
  lessonNumber: number
  indexInLesson: number
  index: number
  moveUp: (source: number) => void
  moveDown: (source: number) => void
}) {
  return (
    <Box borderRadius={({ spacing }) => spacing(6)} display='flex' p={1} {...restProps}>
      <ReorderButton {...{ canMoveUp, canMoveDown, tier, lessonNumber, indexInLesson, index, moveUp, moveDown }} />

      <Box margin='auto'>{children}</Box>

      <DeleteVariantButton {...{ canBeDeleted }} />
    </Box>
  )
}

function ReorderButton({
  canMoveUp,
  canMoveDown,
  tier,
  lessonNumber,
  indexInLesson,
  index,
  moveUp,
  moveDown,
}: {
  canMoveUp: boolean
  canMoveDown: boolean
  tier: number
  lessonNumber: number
  indexInLesson: number
  index: number
  moveUp: (source: number) => void
  moveDown: (source: number) => void
}) {
  return (
    <Box display='flex' flexDirection='column' minWidth='64px'>
      <IconButton onClick={() => moveUp(index)} size='small' sx={{ visibility: canMoveUp ? 'default' : 'hidden' }}>
        <FontAwesomeIcon icon={faChevronUp} />
      </IconButton>

      <Button variant='text' size='small' onClick={() => {}} sx={{ py: 0, visibility: tier ? 'default' : 'hidden' }}>
        {tier}/{lessonNumber}/{indexInLesson ?? '?'}
      </Button>

      <IconButton onClick={() => moveDown(index)} size='small' sx={{ visibility: canMoveDown ? 'default' : 'hidden' }}>
        <FontAwesomeIcon icon={faChevronDown} />
      </IconButton>
    </Box>
  )
}

function DeleteVariantButton({ canBeDeleted }: { canBeDeleted: boolean }) {
  return (
    <IconButton onClick={() => {}} size='small' sx={{ minWidth: '64px', visibility: canBeDeleted ? 'default' : 'hidden' }}>
      <FontAwesomeIcon icon={faTrash} />
    </IconButton>
  )
}

function EditStoryButton() {
  return (
    <Button
      color='white'
      size='small'
      variant='text'
      onClick={() => {}}
      sx={{ opacity: 0.8, lineHeight: 1, ':hover': { opacity: 1 } }}
    >
      Történet szerkesztése
    </Button>
  )
}

function AddStoryButton() {
  return (
    <Button
      color='white'
      size='small'
      variant='text'
      startIcon={<FontAwesomeIcon icon={faBookOpen} transform='shrink-4' />}
      onClick={() => {}}
      sx={{ opacity: 0.8, lineHeight: 1, '.MuiButton-startIcon': { marginRight: '2px' }, ':hover': { opacity: 1 } }}
    >
      Történet hozzáadása
    </Button>
  )
}

function ReminderLabel() {
  return (
    <Box alignItems='center' display='flex' gap={0.5} justifyContent='center' sx={{ opacity: 0.8 }}>
      <FontAwesomeIcon icon={faBell} transform='shrink-3' />
      <Typography variant='button'>Emlékeztető</Typography>
    </Box>
  )
}
