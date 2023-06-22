import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography, Box, Divider, BoxProps, useTheme } from '@mui/material'
import { DraggableProvided } from 'react-beautiful-dnd'
import { X } from '../admin-content/AdminContent'
import { BlueprintStepType } from './TimelineDragAndDrop'

export function StepContent({
  mergedChar,
  provided,
  type,
}: {
  mergedChar: X
  provided: DraggableProvided
  type: BlueprintStepType
}) {
  const { palette } = useTheme()

  switch (type) {
    case 'keyword':
      return (
        <StepContentWrapper
          sx={{ background: ({ palette }) => palette.primary.main, color: ({ palette }) => palette.primary.contrastText }}
          {...{ provided }}
        >
          <Typography fontWeight='bold' margin='auto'>
            {mergedChar.keyword}
          </Typography>
        </StepContentWrapper>
      )
    case 'primitive':
      return (
        <StepContentWrapper sx={{ background: palette.secondary.main, color: palette.secondary.contrastText }} {...{ provided }}>
          <Typography fontStyle='italic' margin='auto'>
            <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />
            {mergedChar.primitive}
          </Typography>
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
            background: `linear-gradient(150deg, ${palette.primary.main} 25%, ${palette.secondary.main} 75%)`,
            color: palette.secondary.contrastText,
          }}
          {...{ provided }}
        >
          <Typography fontWeight='bold'>{mergedChar.keyword}</Typography>

          <Divider flexItem orientation='vertical' sx={{ borderColor: palette.secondary.contrastText, mx: 1 }} />

          <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />

          <Typography fontStyle='italic'>{mergedChar.primitive}</Typography>
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
      minHeight='72px'
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
