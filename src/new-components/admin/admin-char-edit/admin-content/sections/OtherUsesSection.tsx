import { Box, Button, Divider, IconButton, Stack, SxProps, TextField, Typography, useTheme } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { OtherUse } from '../../../../shared/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Form, useRouteLoaderData, useSubmit } from 'react-router-dom'
import { PreviousStep } from '../../../shared/PreviousStep'
import { AdminBreadcrumbs } from '../../../../shared/components/AdminBreadcrumbs'
import { AdminAppbar } from '../../../shared/AdminAppbar'
import { FormEvent } from 'react'
import { LoadCharEdit } from '../../../../shared/route-loaders/loadCharEdit'

export function OtherUsesSection() {
  const submit = useSubmit()
  const { constants } = useTheme()
  const { charFormData } = useRouteLoaderData('charEdit') as LoadCharEdit
  const { glyph, otherUses } = charFormData
  const { control, getValues, reset } = useForm({ defaultValues: { otherUses } })
  const { fields, append, remove } = useFieldArray({ control, name: 'otherUses' })

  function appendOtherUseEntry() {
    append({ pinyin: '', meanings: [' '] })
  }

  function removeOtherUseEntry(index: number) {
    remove(index)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData()

    const otherUses = getValues('otherUses') ?? []

    formData.append('otherUses', JSON.stringify(otherUses))

    submit(formData, { method: 'post' })
  }

  function resetForm() {
    reset()
  }

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Egyéb jelentések`}
        hierarchy={[
          { href: '/admin', text: 'Kezelőközpont' },
          { href: '/admin/characters', text: 'Karakterek' },
          { href: `/admin/characters/${glyph}`, text: `Áttekintés (${glyph})` },
        ]}
      />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <PreviousStep link={`/admin/characters/${glyph}`} text='Áttekintés' />

          <Typography variant='h4' mb={3}>
            Egyéb jelentések
          </Typography>

          <Form method='post' {...{ onSubmit }}>
            {fields.map((field, index) => (
              <OtherUseEntry key={field.id} {...{ appendOtherUseEntry, control, field, index, removeOtherUseEntry }} />
            ))}

            <AddNewButton onClick={appendOtherUseEntry} title='Új kiejtés' />

            <Box display='flex' gap={2} mt={6}>
              <Button startIcon={<FontAwesomeIcon icon={faSave} transform='shrink-4' />} variant='contained' type='submit'>
                Mentés
              </Button>

              <Button onClick={resetForm} type='button'>
                Változtatások elvetése
              </Button>
            </Box>
          </Form>
        </Box>
      </Box>
    </>
  )
}

const OtherUseEntry = ({
  control,
  field,
  index,
  removeOtherUseEntry,
}: {
  control: any
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
    <>
      <Stack gap={2}>
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
                    <FontAwesomeIcon icon={faXmark} size='xs' />
                  </IconButton>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size='small'
              variant='filled'
              label={`${index + 1}. kiejtés`}
              sx={{ '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } } }}
              {...{ value }}
            />
          )}
        />

        <Stack gap={2} ml={8}>
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
                        <FontAwesomeIcon icon={faXmark} size='xs' />
                      </IconButton>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  size='small'
                  variant='filled'
                  label={`${meaningIndex + 1}. jelentés`}
                  sx={{ '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } } }}
                  value={value.trim()}
                />
              )}
            />
          ))}

          <AddNewButton onClick={appendOtherUseMeaning} title='Új jelentés ehhez a kiejtéshez' />
        </Stack>
      </Stack>
      <Divider sx={{ my: 3 }} />
    </>
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
        width: 1,
      }}
    >
      {title}
    </Button>
  )
}

function isEmptyString(string: string) {
  return string === ''
}
