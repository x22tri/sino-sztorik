import { Box, Button, Divider, TextField, Typography, useTheme } from '@mui/material'
import { FormEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSubmit, useRouteLoaderData, useLocation, useParams, Form } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../shared/components/AdminBreadcrumbs'
import { LoadCharEdit } from '../../../shared/route-loaders/loadCharEdit'
import { AdminAppbar } from '../../shared/AdminAppbar'
import { PreviousStep } from '../../shared/PreviousStep'
import { FullOccurrence, OccurrenceType, OccurrenceV3, WithheldOccurrence } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { SaveOrReset } from '../../shared/SaveOrReset'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type StoryLinkState = { mode: 'edit'; title: string } | { mode: 'add'; title: string; type: OccurrenceType }

export function Story() {
  const submit = useSubmit()
  const { constants } = useTheme()
  const { state } = useLocation() as { state: StoryLinkState }
  const params = useParams()
  const tier = Number(params.tier)
  const { charFormData, timelineData } = useRouteLoaderData('charEdit') as LoadCharEdit
  const { glyph } = charFormData
  const story = (timelineData[tier - 1] as FullOccurrence | WithheldOccurrence).story ?? ''
  const { control, reset, trigger } = useForm({ defaultValues: { story: String(story) } })

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit(event.currentTarget, { method: 'post' })
  }

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Történet szerkesztése (${tier}. kör)`}
        hierarchy={[
          { href: '/admin', text: 'Kezelőközpont' },
          { href: '/admin/characters', text: 'Karakterek' },
          { href: `/admin/characters/${glyph}`, text: `Áttekintés (${glyph})` },
        ]}
      />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <PreviousStep link='..' text='Áttekintés' />

          <Typography variant='h4' mb={3}>
            {state.title}
          </Typography>

          <Form method='post' {...{ onSubmit }}>
            <Controller
              name='story'
              {...{ control }}
              render={({ field: { value, onBlur, onChange } }) => (
                <TextField
                  fullWidth
                  label='Történet'
                  id='story'
                  InputLabelProps={{ shrink: true }}
                  name='story'
                  multiline
                  onChange={event => onChange(event.target.value)}
                  size='small'
                  variant='filled'
                  onBlur={() => {
                    onBlur()
                    trigger()
                  }}
                  {...{ value }}
                  sx={{ flexShrink: 1, '.Mui-error': { '&.MuiInputBase-root': { bgcolor: 'error.100' } } }}
                />
              )}
            />

            <SaveOrReset {...{ reset }} />
          </Form>

          {state.mode !== 'edit' ? null : (
            <>
              <Divider sx={{ mt: 6, mb: 2 }} />

              <Box display='flex' justifyContent='flex-end'>
                <Button color='error' startIcon={<FontAwesomeIcon icon={faTrash} transform='shrink-4' />}>
                  Karakter törlése a körből
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  )
}
