import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography, Stack, Button, lighten, TextField, useTheme } from '@mui/material'
import { useState } from 'react'
import { AssembledLesson } from '../../../shared/interfaces'

export function LessonEditStorySection({ selectedLesson }: { selectedLesson: AssembledLesson }) {
  const [isEditing, setIsEditing] = useState(false)

  const { preface } = selectedLesson

  const occurrenceHasNoPreface = preface === ''

  function startEdit() {
    console.log('test')
    setIsEditing(true)
  }

  function cancelEdit() {
    setIsEditing(false)
  }

  function saveEdit() {
    setIsEditing(false)
  }

  return (
    <>
      <Heading canEdit={!isEditing && !occurrenceHasNoPreface} {...{ startEdit }} />

      {isEditing ? (
        <PrefaceEditor {...{ cancelEdit, preface, saveEdit }} /> // To-Do: Make text editor
      ) : occurrenceHasNoPreface ? (
        <MissingPreface {...{ startEdit }} />
      ) : (
        <Typography component='p' gridArea='preface' mb={4}>
          {preface}
        </Typography>
      )}
    </>
  )
}
function Heading({ canEdit, startEdit }: { canEdit: boolean; startEdit: () => void }) {
  const { spacing } = useTheme()

  if (canEdit) {
    return (
      <Stack alignItems='center' direction='row' gap={1}>
        <Typography variant='h5' fontWeight={700}>
          Előszó
        </Typography>

        <Button
          onClick={startEdit}
          startIcon={<FontAwesomeIcon icon={faPen} transform='shrink-4' />}
          sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
        >
          Szerkesztés
        </Button>
      </Stack>
    )
  }

  return (
    <Typography variant='h5' fontWeight={700}>
      Előszó
    </Typography>
  )
}

function MissingPreface({ startEdit }: { startEdit: () => void }) {
  const { palette, spacing } = useTheme()

  return (
    <Stack
      alignItems='center'
      bgcolor={lighten(palette.error.main, 0.8)}
      borderRadius={spacing(2)}
      justifyContent='center'
      minHeight='200px'
      my={3}
      gap={1}
      sx={{ outline: `2px dashed ${palette.error.main}`, outlineOffset: '-6px' }}
    >
      <Button
        onClick={startEdit}
        color='white'
        startIcon={<FontAwesomeIcon icon={faPen} transform='shrink-4' />}
        variant='contained'
        sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
      >
        Hozzáadás
      </Button>
    </Stack>
  )
}

function PrefaceEditor({ cancelEdit, preface, saveEdit }: { cancelEdit: () => void; preface: string; saveEdit: () => void }) {
  return (
    <>
      {/*  To-Do: Make text editor */}
      <TextField defaultValue={preface} multiline sx={{ mt: 1, width: 1 }} />

      <Stack direction='row' gap={2} mt={2} justifyContent='flex-end'>
        <Button onClick={cancelEdit}>Elvetés</Button>

        <Button onClick={saveEdit} variant='contained'>
          Mentés
        </Button>
      </Stack>
    </>
  )
}
