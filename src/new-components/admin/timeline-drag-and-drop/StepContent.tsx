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
            background: isReminder ? '#7C91BC' : palette.primary.main,
            color: palette.primary.contrastText,
            justifyContent: 'center',
          }}
          {...{ provided }}
        >
          <ParenthesesWrapper {...{ isReminder }}>
            <Typography fontWeight='bold' margin='auto'>
              {mergedChar.keyword}
            </Typography>
          </ParenthesesWrapper>
        </StepContentWrapper>
      )
    case 'primitive':
      return (
        <StepContentWrapper
          sx={{ background: isReminder ? '#9577A9' : palette.secondary.main, color: palette.secondary.contrastText }}
          {...{ provided }}
        >
          <Box display='flex' flexDirection='column' margin='auto'>
            <ParenthesesWrapper {...{ isReminder }}>
              <Typography fontStyle='italic' margin='auto'>
                <FontAwesomeIcon
                  color={palette.secondary.contrastText}
                  icon={faCube}
                  style={{ marginRight: '4px', marginLeft: '2px' }}
                />
                {mergedChar.primitive!}
              </Typography>
            </ParenthesesWrapper>

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
            outlineOffset: '-4px',
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
              ? `linear-gradient(150deg, ${palette.primary[400]} 25%, ${palette.secondary[400]} 75%)`
              : `linear-gradient(150deg, ${palette.primary.main} 25%, ${palette.secondary.main} 75%)`,
            color: palette.secondary.contrastText,
          }}
          {...{ provided }}
        >
          <ParenthesesWrapper {...{ isReminder }}>
            <Typography fontWeight='bold'>{mergedChar.keyword}</Typography>

            <Divider flexItem orientation='vertical' sx={{ borderColor: palette.secondary.contrastText, mx: 1 }} />

            <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />

            <Typography fontStyle='italic'>{mergedChar.primitive}</Typography>
          </ParenthesesWrapper>
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

function ParenthesesWrapper({ children, isReminder }: { children: JSX.Element | JSX.Element[]; isReminder: boolean }) {
  return (
    <Wrap
      if={isReminder}
      with={children => (
        <Box alignItems='center' display='flex'>
          &#40;&nbsp;
          {children}
          &nbsp;&#41;
        </Box>
      )}
    >
      {children}
    </Wrap>
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
