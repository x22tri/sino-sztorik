import React, { memo, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'
import { Box } from '@mui/material'

// const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
//   const custom: any = {
//     id: `id-${k}`,
//     content: `Quote ${k}`,
//   }

//   return custom
// })

type Item = { id: string; content: string }

const initial: Item[] = [
  { id: 'id-1', content: '' },
  { id: 'id-2', content: 'korai' },
  { id: 'id-3', content: 'napraforgó' },
  { id: 'id-4', content: '(Emlékeztető)' },
]

const grid = 8
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result as Item[]
}

function Quote({ quote, index }: { quote: any; index: number }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Box
          bgcolor='primary.main'
          borderRadius={({ spacing }) => spacing(1)}
          mb={1}
          minHeight='60px'
          ref={innerRef}
          p={2}
          textAlign='center'
          {...draggableProps}
          {...dragHandleProps}
        >
          {quote.content}
        </Box>
      )}
    </Draggable>
  )
}

const QuoteList = memo(({ quotes }: { quotes: any }) =>
  quotes.map((quote: Item, index: number) => <Quote quote={quote} index={index} key={quote.id} />)
)

export function TimelineDragAndDrop() {
  const [state, setState] = useState({ quotes: initial })

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const quotes = reorder(state.quotes, result.source.index, result.destination.index)

    setState({ quotes })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId='list'>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}
