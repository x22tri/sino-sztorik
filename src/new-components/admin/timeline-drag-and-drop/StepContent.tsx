import { faBook, faBookOpen, faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography, Box, Divider, BoxProps, useTheme, Button } from '@mui/material'
import { DraggableProvided } from 'react-beautiful-dnd'
import { X } from '../admin-content/AdminContent'
import { BlueprintStepType } from './TimelineDragAndDrop'
import { ReactNode } from 'react'
import { Wrap } from '../../shared/utility-components'
import { When } from 'react-if'

export function StepContent({
  isReminder,
  mergedChar,
  provided,
  type,
}: {
  isReminder: boolean
  mergedChar: X
  provided: DraggableProvided
  type: BlueprintStepType
}) {
  const { palette } = useTheme()

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
          {...{ provided }}
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
          {...{ provided }}
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
          {...{ provided }}
        >
          <Box margin='auto' />
        </StepContentWrapper>
      )
    case 'keywordAndPrimitive':
      return (
        <StepContentWrapper
          sx={{
            justifyContent: 'center',
            background: isReminder
              ? palette.background.paper
              : `linear-gradient(150deg, ${palette.primary.main} 25%, ${palette.secondary.main} 75%)`,
            color: isReminder ? palette.primary.main : palette.secondary.contrastText,
            borderTop: isReminder ? `3px solid ${palette.primary.main}` : undefined,
            borderLeft: isReminder ? `3px solid ${palette.primary.main}` : undefined,
            borderBottom: isReminder ? `3px solid ${palette.secondary.main}` : undefined,
            borderRight: isReminder ? `3px solid ${palette.secondary.main}` : undefined,
          }}
          {...{ provided }}
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
        <StepContentWrapper sx={{ bgcolor: palette.primary[100]!, color: palette.primary.main }} {...{ provided }}>
          <Typography fontWeight='bold' margin='auto'>
            {mergedChar.keyword}
          </Typography>
        </StepContentWrapper>
      )
    default:
      return <></>
  }
}
function StepContentWrapper({ children, provided, ...restProps }: BoxProps & { provided: DraggableProvided }) {
  const { draggableProps, dragHandleProps, innerRef } = provided

  return (
    <Box
      alignItems='center'
      borderRadius={({ spacing }) => spacing(6)}
      display='flex'
      mb={1}
      minHeight='96px'
      p={2}
      ref={innerRef}
      textAlign='center'
      width={1}
      {...draggableProps}
      {...dragHandleProps}
      {...restProps}
    >
      {children}
    </Box>
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
    <Typography variant='button' sx={{ opacity: 0.8 }}>
      Emlékeztető
    </Typography>
  )
}
