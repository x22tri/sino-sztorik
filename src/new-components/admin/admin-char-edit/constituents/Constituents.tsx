import { faCube, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { CHARS } from '../../../shared/MOCK_CHARS'
import { When } from 'react-if'
import { Character } from '../../../shared/interfaces'
import { FormEvent, useState } from 'react'
import { matchSorter } from 'match-sorter'
import { Form, useRouteLoaderData, useSubmit } from 'react-router-dom'
import { PreviousStep } from '../../shared/PreviousStep'
import { AdminBreadcrumbs } from '../../../shared/components/AdminBreadcrumbs'
import { AdminAppbar } from '../../shared/AdminAppbar'
import { LoadCharEdit } from '../../../shared/route-loaders/loadCharEdit'

const charWidth = '42px'

export function Constituents() {
  const submit = useSubmit()
  const { constants } = useTheme()
  const { charFormData } = useRouteLoaderData('charEdit') as LoadCharEdit
  const { constituents, glyph } = charFormData
  const { control, getValues, reset, setValue } = useForm({ defaultValues: { constituents } })
  const [inputValue, setInputValue] = useState('')

  function addConstituent(newValue: Character, reason: AutocompleteChangeReason) {
    if (reason === 'selectOption') {
      setValue('constituents', [...(getValues('constituents') ?? []), newValue.glyph])
    }
  }

  function removeConstituent(index: number) {
    const constituents = getValues('constituents') as string[]
    constituents.splice(index, 1)
    setValue('constituents', constituents)
  }

  function filterOptions(options: Character[], { inputValue }: { inputValue: string }) {
    return matchSorter(options, inputValue, { keys: ['glyph', 'primitive', 'keyword'] })
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit(event.currentTarget)
  }

  function resetForm() {
    reset()
  }

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Összetétel`}
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
            Összetétel
          </Typography>

          <Box display='flex' gap={2}>
            <Form method='post' {...{ onSubmit }}>
              <Controller
                name='constituents'
                {...{ control }}
                render={({ field: { onBlur, value } }) => (
                  <>
                    <Box display={value?.length ? 'flex' : 'none'} gap={2}>
                      {(value as string[]).map((constituent, index) => (
                        <Constituent glyph={constituent} key={index} {...{ index, removeConstituent }} />
                      ))}
                    </Box>

                    <input type='hidden' name='constituents' {...{ value }} />

                    <Autocomplete
                      disableClearable
                      getOptionLabel={option => (option as Character).glyph}
                      isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
                      noOptionsText='Nincs találat'
                      options={CHARS.map(char => char)}
                      onChange={(_, newValue, reason) => addConstituent(newValue as Character, reason)}
                      onInputChange={(_, newValue, reason) => setInputValue(reason === 'input' ? newValue : '')}
                      renderInput={params => (
                        <TextField
                          {...params}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          size='small'
                          variant='filled'
                          label='Alapelem keresése...'
                        />
                      )}
                      renderOption={(props, option) => <SearchRow {...props} {...{ props, option }} />}
                      sx={{ width: '100%' }}
                      {...{ filterOptions, inputValue, onBlur }}
                    />
                  </>
                )}
              />

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
      </Box>
    </>
  )
}

function Constituent({
  glyph,
  index,
  removeConstituent,
}: {
  glyph: string
  index: number
  removeConstituent: (index: number) => void
}) {
  return (
    <Typography
      component='span'
      position='relative'
      variant='chineseText'
      sx={{ bgcolor: 'grey.50', borderRadius: 2, maxWidth: charWidth, p: 1 }}
    >
      <Tooltip title='Alapelem törlése'>
        <IconButton
          color='error'
          onClick={() => removeConstituent(index)}
          size='small'
          sx={{ position: 'absolute', top: -6, right: -6 }}
        >
          <FontAwesomeIcon icon={faTrash} transform='shrink-9' />
        </IconButton>
      </Tooltip>

      {glyph}
    </Typography>
  )
}

function SearchRow({ props, option }: { props: React.HTMLAttributes<HTMLLIElement>; option: Character }) {
  const { palette } = useTheme()

  return (
    <Box component='li' display='flex' {...props} sx={{ '&.Mui-selected': { bgcolor: 'red' } }}>
      <Typography component='span' variant='chineseText' fontSize='120%' mr={2}>
        {option.glyph}
      </Typography>

      <When condition={'keyword' in option}>
        <Typography component='span' fontWeight='bold'>
          {option.keyword}
        </Typography>
      </When>

      <When condition={'keyword' in option && 'primitive' in option}>
        <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
      </When>

      <When condition={'primitive' in option}>
        <FontAwesomeIcon color={palette.secondary.main} icon={faCube} size='xs' style={{ marginRight: '4px' }} />

        <Typography component='span' fontStyle='italic'>
          {option.primitive}
        </Typography>
      </When>
    </Box>
  )
}
