import React, { memo, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Subheading } from '../../learn/headings/Subheading'

export type BlueprintStep = { id: string; content: string }

const reorder = (list: BlueprintStep[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function Step({ id, content, index }: { id: string; content: string; index: number }) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Box
          alignItems='center'
          bgcolor='primary.main'
          borderRadius={({ spacing }) => spacing(1)}
          // boxSizing='content-box'
          display='flex'
          mb={1}
          minHeight='60px'
          ref={innerRef}
          p={2}
          textAlign='center'
          width={1}
          {...draggableProps}
          {...dragHandleProps}
          sx={{ cursor: 'grab' }}
        >
          <Typography margin='auto'>{content}</Typography>

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
    {steps.map(({ content, id }: BlueprintStep, index: number) => (
      <Step key={id} {...{ content, id, index }} />
    ))}
  </>
))

export function TimelineDragAndDrop({ blueprintSteps }: { blueprintSteps: BlueprintStep[] }) {
  const [state, setState] = useState({ steps: blueprintSteps })

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const steps = reorder(state.steps, result.source.index, result.destination.index)

    console.log(steps)

    setState({ steps })
  }

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
