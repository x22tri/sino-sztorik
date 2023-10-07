import { Box, TextField, Typography, useTheme } from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Form, useParams, useRouteLoaderData, useSubmit } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../shared/components/AdminBreadcrumbs'
import { AdminAppbar } from '../../shared/AdminAppbar'
import { PreviousStep } from '../../shared/PreviousStep'
import { LoadLessonEdit } from '../../../shared/route-loaders/loadLessonEdit'
import { SaveOrReset } from '../../shared/SaveOrReset'
import { FormEvent } from 'react'

export function BaseInfo() {
  const submit = useSubmit()
  const { constants } = useTheme()
  const params = useParams()
  const lessonNumber = Number(params.lessonNumber)

  const { lessonFormData } = useRouteLoaderData('lessonEdit') as LoadLessonEdit

  const { control, formState, reset } = useForm({ defaultValues: { title: lessonFormData.title }, mode: 'onBlur' })

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (formState.isValid) {
      submit(event.currentTarget)
    }
  }

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Alapadatok`}
        hierarchy={[
          { href: '../../..', text: 'Kezelőközpont' },
          { href: '../..', text: 'Karakterek' },
          { href: '..', text: `Áttekintés (${lessonNumber}. lecke)` },
        ]}
      />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <PreviousStep link='..' text={`Áttekintés (${lessonNumber}. lecke)`} />

          <Form method='post' {...{ onSubmit }}>
            <Typography variant='h4' mt={2} mb={3}>
              Lecke átnevezése
            </Typography>

            <Controller
              name='title'
              rules={{ required: 'Kötelező címet megadni' }}
              {...{ control }}
              render={({ field: { value, onBlur, onChange } }) => (
                <TextField
                  error={!!formState.errors.title?.message}
                  fullWidth
                  id='title'
                  helperText={(formState.errors.title?.message as string) || ' '}
                  InputLabelProps={{ shrink: true }}
                  label='Lecke címe'
                  name='title'
                  onChange={event => onChange(event.target.value)}
                  size='small'
                  variant='filled'
                  {...{ onBlur, value }}
                  sx={{ flexShrink: 1, '.Mui-error': { '&.MuiInputBase-root': { bgcolor: 'error.100' } } }}
                />
              )}
            />

            <SaveOrReset {...{ reset }} />
          </Form>
        </Box>
      </Box>
    </>
  )
}
