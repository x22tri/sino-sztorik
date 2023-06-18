import React, { memo, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'
import { Box } from '@mui/material'

type RecipeStep = { id: string; content: string }

const initial: RecipeStep[] = [
  { id: 'id-1', content: '' },
  { id: 'id-2', content: 'korai' },
  { id: 'id-3', content: 'napraforgó' },
  { id: 'id-4', content: '(Emlékeztető)' },
]

const reorder = (list: RecipeStep[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function Step({ step, index }: { step: RecipeStep; index: number }) {
  return (
    <Draggable draggableId={step.id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Box
          bgcolor='primary.main'
          borderRadius={({ spacing }) => spacing(1)}
          mb={1}
          minHeight='60px'
          ref={innerRef}
          p={2}
          textAlign='center'
          width={1}
          {...draggableProps}
          {...dragHandleProps}
        >
          {step.content}
        </Box>
      )}
    </Draggable>
  )
}

const StepList = memo(({ steps }: { steps: RecipeStep[] }) => (
  <>
    {steps.map((step: RecipeStep, index: number) => (
      <Step key={step.id} {...{ index, step }} />
    ))}
  </>
))

export function TimelineDragAndDrop() {
  const [state, setState] = useState({ steps: initial })

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const steps = reorder(state.steps, result.source.index, result.destination.index)

    setState({ steps })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId='list'>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <StepList steps={state.steps} />
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}
