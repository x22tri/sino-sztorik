import { Box, Button, IconButton, Stack, SxProps, TextField, useTheme } from '@mui/material'
import { Control, Controller, FieldValues, useFieldArray, useFormContext } from 'react-hook-form'
import { OtherUse } from '../../../shared/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export function OtherUsesSection() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'otherUses' })

  function appendOtherUseEntry() {
    append({ pinyin: '', meanings: [' '] })
  }

  function removeOtherUseEntry(index: number) {
    remove(index)
  }

  return (
    <Stack gap={4}>
      {fields.map((field, index) => (
        <OtherUseEntry
          key={field.id}
          {...{ appendOtherUseEntry, control, field: field as OtherUse & { id: string }, index, removeOtherUseEntry }}
        />
      ))}

      <AddNewButton onClick={appendOtherUseEntry} title='Új kiejtés' />
    </Stack>
  )
}

const OtherUseEntry = ({
  control,
  field,
  index,
  removeOtherUseEntry,
}: {
  control: Control<FieldValues, any>
  field: OtherUse & { id: string }
  index: number
  removeOtherUseEntry: (index: number) => void
}) => {
  const { palette } = useTheme()
  const { fields, append, remove } = useFieldArray({ control, name: `otherUses.${index}.meanings` })

  function appendOtherUseMeaning() {
    append(' ')
  }

  function removeOtherUseMeaning(meaningIndex: number) {
    remove(meaningIndex)
  }

  return (
    <Box display='grid' gap={2} sx={{ gridTemplateColumns: `2, max-content auto)` }}>
      <Controller
        {...{ control }}
        name={`otherUses.${index}.pinyin`}
        render={({ field: { value, onChange } }) => (
          <TextField
            {...field}
            error={isEmptyString(value)}
            onChange={event => onChange(event.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton color='error' onClick={() => removeOtherUseEntry(index)}>
                  <FontAwesomeIcon icon={faTrashAlt} size='xs' />
                </IconButton>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size='small'
            variant='filled'
            label={`${index + 1}. kiejtés`}
            sx={{ gridColumn: '1 / 2', '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } } }}
            {...{ value }}
          />
        )}
      />
      {fields.map((meaning, meaningIndex) => (
        <Controller
          {...{ control }}
          key={meaning.id}
          name={`otherUses.${index}.meanings.${meaningIndex}`}
          render={({ field: { value, onChange } }) => (
            <TextField
              {...field}
              error={isEmptyString(value.trim())}
              onChange={event => onChange(event.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    color='error'
                    onClick={() => removeOtherUseMeaning(meaningIndex)}
                    sx={{ visibility: fields.length === 1 ? 'hidden' : 'visible' }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size='xs' />
                  </IconButton>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              size='small'
              variant='filled'
              label={`${meaningIndex + 1}. jelentés`}
              sx={{ gridColumn: '2 / 3', '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } } }}
              value={value.trim()}
            />
          )}
        />
      ))}

      <AddNewButton onClick={appendOtherUseMeaning} title='Új jelentés ehhez a kiejtéshez' sx={{ gridColumn: '2 / 3' }} />
    </Box>
  )
}

function AddNewButton({ onClick, sx, title }: { onClick: () => void; sx?: SxProps; title: string }) {
  const { palette, spacing } = useTheme()

  return (
    <Button
      {...{ onClick }}
      sx={{
        borderRadius: spacing(1.5),
        minHeight: spacing(6),
        outline: `2px dashed ${palette.primary.main}`,
        outlineOffset: '-6px',
        ...sx,
      }}
    >
      {title}
    </Button>
  )
}

function isEmptyString(string: string) {
  return string === ''
}
