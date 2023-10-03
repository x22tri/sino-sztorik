import { Button, Stack, TextField, Typography, lighten, useTheme } from '@mui/material'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Story from '../../../../learn/story/Story'
import { UnsubmittedCharacter } from '../timeline/Timeline'
import { useState } from 'react'
import { Paragraph } from '../../../../shared/interfaces'

export function CharEditStorySection({ selectedChar }: { selectedChar: UnsubmittedCharacter }) {
  const [isEditing, setIsEditing] = useState(false)

  const occurrenceHasNoStory = 'story' in selectedChar && selectedChar.story.length === 0

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
      <Heading canEdit={!isEditing && !occurrenceHasNoStory && !selectedChar.reminder} {...{ startEdit }} />

      {isEditing ? (
        <StoryEditor story={selectedChar.story} {...{ cancelEdit, saveEdit }} /> // To-Do: Make text editor
      ) : occurrenceHasNoStory ? (
        <MissingStory {...{ startEdit }} />
      ) : (
        <Story story={selectedChar.story} />
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
          Történet
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
      Történet
    </Typography>
  )
}

function MissingStory({ startEdit }: { startEdit: () => void }) {
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

function StoryEditor({ cancelEdit, saveEdit, story }: { cancelEdit: () => void; saveEdit: () => void; story: Paragraph[] }) {
  return (
    <>
      {/*  To-Do: Make text editor */}
      <TextField defaultValue={story} multiline sx={{ mt: 1, width: 1 }} />

      <Stack direction='row' gap={2} mt={2} justifyContent='flex-end'>
        <Button onClick={cancelEdit}>Elvetés</Button>

        <Button onClick={saveEdit} variant='contained'>
          Mentés
        </Button>
      </Stack>
    </>
  )
}
