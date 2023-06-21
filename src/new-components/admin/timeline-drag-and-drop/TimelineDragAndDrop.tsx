import React, { ReactNode, memo, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'
import { Box, BoxProps, Divider, IconButton, Palette, Stack, SxProps, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faCube } from '@fortawesome/free-solid-svg-icons'
import { Subheading } from '../../learn/headings/Subheading'
import { CharacterEntry, CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Blueprint } from '../Blueprint'
import { X, getBlueprintSteps, mergePreviousTiers } from '../admin-content/AdminContent'

export type BlueprintStepType = 'keyword' | 'primitive' | 'unset' | 'reminder' | 'keywordUnexpounded' | 'keywordAndPrimitive'

export type BlueprintStep = {
  id: string
  variant: CharacterEntryVariant
  type: BlueprintStepType
  isReminder?: boolean
}

function reorder(list: BlueprintStep[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function getReminder() {}

function getKeywordAndPrimitive(
  palette: Palette,
  variant: CharacterEntryVariant
): { isDragDisabled?: boolean; sx: SxProps; content: string | ReactNode } {
  return {
    sx: {
      background: `linear-gradient(150deg, ${palette.primary.main} 25%, ${palette.secondary.main} 75%)`,
      color: palette.secondary.contrastText,
    },
    content: (
      <Box alignItems='center' display='flex' margin='auto'>
        <Typography fontWeight='bold'>{variant.keyword}</Typography>
        <Divider flexItem orientation='vertical' sx={{ borderColor: palette.secondary.contrastText, mx: 1 }} />
        <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />
        <Typography fontStyle='italic'>{variant.primitive}</Typography>
      </Box>
    ),
  }
}

function Step({ index, step, steps }: { index: number; step: BlueprintStep; steps: BlueprintStep[] }) {
  const { palette } = useTheme()
  const { id, variant, type } = step

  const soFar = mergePreviousTiers(
    steps.map(s => s.variant),
    index + 1
  )

  const stylesMap: Record<BlueprintStepType, { isDragDisabled?: boolean; sx: SxProps; content: string | ReactNode }> = {
    keyword: {
      sx: { bgcolor: palette.primary.main, color: palette.primary.contrastText },
      content: (
        <Typography fontWeight='bold' margin='auto'>
          {variant.keyword}
        </Typography>
      ),
    },
    primitive: {
      sx: { bgcolor: palette.secondary.main, color: palette.secondary.contrastText },
      content: (
        <Typography fontStyle='italic' margin='auto'>
          <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />
          {variant.primitive}
        </Typography>
      ),
    },
    unset: {
      sx: {
        bgcolor: palette.grey[50],
        color: palette.text.disabled,
        outline: `2px dashed ${palette.text.disabled}`,
        outlineOffset: '-4px',
      },
      isDragDisabled: true,
      content: <Box margin='auto' />,
    },
    reminder: { sx: {}, content: null },
    keywordAndPrimitive: {
      sx: {
        background: `linear-gradient(150deg, ${palette.primary.main} 25%, ${palette.secondary.main} 75%)`,
        color: palette.secondary.contrastText,
      },
      content: (
        <Box alignItems='center' display='flex' margin='auto'>
          <Typography fontWeight='bold'>{variant.keyword}</Typography>

          <Divider flexItem orientation='vertical' sx={{ borderColor: palette.secondary.contrastText, mx: 1 }} />

          <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />

          <Typography fontStyle='italic'>{variant.primitive}</Typography>
        </Box>
      ),
    },
    keywordUnexpounded: {
      sx: { bgcolor: palette.primary[100]!, color: palette.primary.main },
      content: (
        <Typography fontWeight='bold' margin='auto'>
          {variant.keyword}
        </Typography>
      ),
    },
  }

  const reminderContentType: BlueprintStepType | null =
    'keyword' in soFar && 'primitive' in soFar
      ? 'keywordAndPrimitive'
      : 'keyword' in soFar
      ? 'keyword'
      : 'primitive' in soFar
      ? 'primitive'
      : null

  // }

  // console.log(soFar)
  // console.log(reminderContentType)

  stylesMap.reminder = !reminderContentType
    ? { sx: {}, content: null }
    : { sx: { ...stylesMap[reminderContentType!].sx }, content: stylesMap[reminderContentType!].content }

  const { isDragDisabled, sx, content } = stylesMap[type]

  return (
    <Draggable draggableId={id} {...{ index, isDragDisabled }}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Box
          alignItems='center'
          borderRadius={({ spacing }) => spacing(6)}
          display='flex'
          mb={1}
          minHeight='60px'
          ref={innerRef}
          p={2}
          textAlign='center'
          width={1}
          {...draggableProps}
          {...dragHandleProps}
          sx={{ cursor: isDragDisabled ? 'inherit' : 'grab', ...sx }}
        >
          {content}

          <IconButton onClick={() => console.log('x')} sx={{ justifySelf: 'flex-end' }}>
            <FontAwesomeIcon icon={faBookOpen} />
          </IconButton>
        </Box>
      )}
    </Draggable>
  )
}

const StepList = memo(({ steps }: { steps: BlueprintStep[] }) => (
  <>
    {steps.map((step: BlueprintStep, index: number) => (
      <Step key={step.id} {...{ index, step, steps }} />
    ))}
  </>
))

export function TimelineDragAndDrop({
  blueprintSteps,
  getBlueprintSteps,
}: {
  blueprintSteps: BlueprintStep[]
  getBlueprintSteps({ variants }: CharacterEntry): BlueprintStep[]
}) {
  const [state, setState] = useState({ steps: blueprintSteps })

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const steps = reorder(state.steps, result.source.index, result.destination.index)

    // console.log(steps)

    setState({ steps })
  }

  console.log(state)

  return (
    <Box width={1}>
      <Subheading title='Sorrend' />

      <Box display='flex' marginTop={2} width={1}>
        <Stack>
          {[1, 2, 3, 4].map(tier => (
            <Box alignItems='center' display='flex' key={tier} mb={1} minHeight='72px' p={2}>
              {tier}
            </Box>
          ))}
        </Stack>

        <DragDropContext {...{ onDragEnd }}>
          <StrictModeDroppable droppableId='list'>
            {({ droppableProps, innerRef, placeholder }) => (
              <Box ref={innerRef} width={1} {...droppableProps}>
                <StepList steps={state.steps} />
                {placeholder}
              </Box>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </Box>
    </Box>
  )
}
