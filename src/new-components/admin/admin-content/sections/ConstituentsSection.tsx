import { faCube, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { CHARS } from '../../../shared/MOCK_CHARS'
import { When } from 'react-if'
import { Character } from '../../../shared/interfaces'
import { useState } from 'react'
import { matchSorter } from 'match-sorter'

const charWidth = '42px'

export function ConstituentsSection() {
  const { setValue, getValues } = useFormContext()
  const [inputValue, setInputValue] = useState('')

  function addConstituent(newValue: Character, reason: AutocompleteChangeReason) {
    if (reason === 'selectOption') {
      setValue('constituents', [...getValues('constituents'), newValue.glyph])
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

  return (
    <Box display='flex' gap={2}>
      <Controller
        name='constituents'
        render={({ field: { value } }) => (
          <Box display={value.length ? 'flex' : 'none'} gap={2}>
            {(value as string[]).map((constituent, index) => (
              <Constituent glyph={constituent} key={index} {...{ index, removeConstituent }} />
            ))}
          </Box>
        )}
      />

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
        {...{ filterOptions, inputValue }}
      />
    </Box>
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
