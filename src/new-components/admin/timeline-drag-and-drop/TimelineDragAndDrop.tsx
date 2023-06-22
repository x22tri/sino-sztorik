import React, { ReactNode, memo, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { DragDropContext, Draggable, DraggableProvided } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'
import { Badge, Box, BoxProps, Divider, Icon, IconButton, Palette, Stack, SxProps, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBook, faBookOpen, faCube, faTrash } from '@fortawesome/free-solid-svg-icons'
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

function Keyword({ keyword }: { keyword: string }) {
  return (
    <Typography fontWeight='bold' margin='auto'>
      {keyword}
    </Typography>
  )
}

function Primitive({ primitive }: { primitive: string }) {
  const { palette } = useTheme()

  return (
    <Typography fontStyle='italic' margin='auto'>
      <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />
      {primitive}
    </Typography>
  )
}

function Unset() {
  return <Box margin='auto' />
}

function KeywordAndPrimitive({ keyword, primitive }: { keyword: string; primitive: string }) {
  const { palette } = useTheme()

  return (
    <Box alignItems='center' display='flex' margin='auto'>
      <Typography fontWeight='bold'>{keyword}</Typography>

      <Divider flexItem orientation='vertical' sx={{ borderColor: palette.secondary.contrastText, mx: 1 }} />

      <FontAwesomeIcon color={palette.secondary.contrastText} icon={faCube} style={{ marginRight: '4px' }} />

      <Typography fontStyle='italic'>{primitive}</Typography>
    </Box>
  )
}

function KeywordUnexpounded({ keyword }: { keyword: string }) {
  return (
    <Typography fontWeight='bold' margin='auto'>
      {keyword}
    </Typography>
  )
}
function ContentWrapper({ children, provided, ...restProps }: BoxProps & { provided: DraggableProvided }) {
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

function ContentComponent({
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
        <ContentWrapper
          sx={{ background: ({ palette }) => palette.primary.main, color: ({ palette }) => palette.primary.contrastText }}
          {...{ provided }}
        >
          <Keyword keyword={mergedChar.keyword!} />
        </ContentWrapper>
      )
    case 'primitive':
      return (
        <ContentWrapper sx={{ background: palette.secondary.main, color: palette.secondary.contrastText }} {...{ provided }}>
          <Primitive primitive={mergedChar.primitive!} />
        </ContentWrapper>
      )
    case 'unset':
      return (
        <ContentWrapper
          sx={{
            background: palette.grey[50],
            color: palette.text.disabled,
            outline: `2px dashed ${palette.text.disabled}`,
            outlineOffset: '-4px',
          }}
          {...{ provided }}
        >
          <Unset />
        </ContentWrapper>
      )
    case 'keywordAndPrimitive':
      return (
        <ContentWrapper
          sx={{
            background: `linear-gradient(150deg, ${palette.primary.main} 25%, ${palette.secondary.main} 75%)`,
            color: palette.secondary.contrastText,
          }}
          {...{ provided }}
        >
          <KeywordAndPrimitive keyword={mergedChar.keyword!} primitive={mergedChar.primitive!} />
        </ContentWrapper>
      )
    case 'keywordUnexpounded':
      return (
        <ContentWrapper sx={{ bgcolor: palette.primary[100]!, color: palette.primary.main }} {...{ provided }}>
          <KeywordUnexpounded keyword={mergedChar.keyword!} />
        </ContentWrapper>
      )
    default:
      return <></>
  }
}

function Step({ index, step, steps, mergedChar }: { index: number; step: BlueprintStep; steps: BlueprintStep[]; mergedChar: X }) {
  const { id, type } = step

  const soFar = mergePreviousTiers(
    steps.map(s => s.variant),
    index + 1
  )

  const reminderContentType: BlueprintStepType | null =
    'keyword' in soFar && 'primitive' in soFar
      ? 'keywordAndPrimitive'
      : 'keyword' in soFar
      ? 'keyword'
      : 'primitive' in soFar
      ? 'primitive'
      : null

  const contentType = type === 'reminder' ? reminderContentType : type

  if (contentType === null) {
    throw new Error('Reminder could not get type')
  }

  return (
    <Draggable draggableId={id} isDragDisabled={type === 'unset'} {...{ index }}>
      {provided => (
        //  <Box

        //    sx={{ cursor: isDragDisabled ? 'inherit' : 'grab' }}
        //  >
        //    <Box
        //     alignItems='center'
        //     borderRadius={({ spacing }) => spacing(6)}
        //     display='flex'
        //     p={2}
        //     textAlign='center'
        //     width={1}
        //     {...{ sx }}
        //   >
        //     {content}

        //     <IconButton onClick={() => console.log('x')} sx={{ justifySelf: 'flex-end' }}>
        //       <FontAwesomeIcon icon={faTrash} />
        //     </IconButton>
        //   </Box>
        //  </Box>
        <ContentComponent type={contentType} {...{ mergedChar, provided }} />
      )}
    </Draggable>
  )
}

const StepList = memo(({ steps, mergedChar }: { steps: BlueprintStep[]; mergedChar: X }) => (
  <>
    {steps.map((step: BlueprintStep, index: number) => (
      <Step key={step.id} {...{ index, step, steps, mergedChar }} />
    ))}
  </>
))

export function TimelineDragAndDrop({
  blueprintSteps,
  getBlueprintSteps,
  character,
}: {
  blueprintSteps: BlueprintStep[]
  getBlueprintSteps({ variants }: CharacterEntry): BlueprintStep[]
  character: CharacterEntry
}) {
  const [state, setState] = useState({ steps: blueprintSteps })

  const [mergedChar, setMergedChar] = useState(mergePreviousTiers(character.variants, 4))

  console.log(mergedChar)

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
                <StepList steps={state.steps} {...{ mergedChar }} />
                {placeholder}
              </Box>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </Box>
    </Box>
  )
}
