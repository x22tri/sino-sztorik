import { memo, useState } from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'
import { Box, Stack } from '@mui/material'
import { Subheading } from '../../learn/headings/Subheading'
import { CharacterEntry, CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { X, mergePreviousTiers } from '../admin-content/AdminContent'
import { StepContent } from './StepContent'
import { getReminderContentType } from './getReminderContentType'

export type BlueprintStepType = 'keyword' | 'primitive' | 'unset' | 'reminder' | 'keywordUnexpounded' | 'keywordAndPrimitive'

export type BlueprintStep = {
  id: string
  type: BlueprintStepType
  isReminder?: boolean
}

function reorder(list: BlueprintStep[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function Step({ index, step, steps, mergedChar }: { index: number; step: BlueprintStep; steps: BlueprintStep[]; mergedChar: X }) {
  const { id, type } = step
  const isReminder = type === 'reminder'

  const contentType = isReminder ? getReminderContentType(steps, index) : type

  return (
    <Draggable draggableId={id} isDragDisabled={type === 'unset'} {...{ index }}>
      {provided => (
        <StepContent type={contentType} {...{ isReminder, mergedChar, provided }} />

        // <IconButton onClick={() => console.log('x')} sx={{ justifySelf: 'flex-end' }}>
        //       <FontAwesomeIcon icon={faTrash} />
        //     </IconButton>
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
  character,
}: {
  blueprintSteps: BlueprintStep[]
  getBlueprintSteps({ variants }: CharacterEntry): BlueprintStep[]
  character: CharacterEntry
}) {
  const [state, setState] = useState({ steps: blueprintSteps })

  const [mergedChar, setMergedChar] = useState(mergePreviousTiers(character.variants, 4))

  // console.log(mergedChar)

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

  // console.log(state)

  return (
    <Box width={1}>
      <Subheading title='Sorrend' />

      <Box display='flex' marginTop={2} width={1}>
        <Stack>
          {[1, 2, 3, 4].map(tier => (
            <Box alignItems='center' display='flex' key={tier} mb={1} minHeight='96px' p={2}>
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
