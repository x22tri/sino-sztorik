import { faClose, faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Autocomplete, Box, Divider, IconButton, InputLabel, TextField, Tooltip, Typography, useTheme } from '@mui/material'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { CHARS } from '../../../shared/MOCK_CHARS'
import { When } from 'react-if'
import { Character } from '../../../shared/interfaces'
import { useState } from 'react'

const charWidth = '42px'

export function ConstituentsSection() {
  const { palette } = useTheme()
  const { setValue, getValues } = useFormContext()
  const [inputValue, setInputValue] = useState('')

  return (
    <Box mt={3}>
      <InputLabel shrink sx={{ ml: 1.5 }}>
        Összetétel
      </InputLabel>

      <Box display='flex' gap={2}>
        <Controller
          name='constituents'
          render={({ field: { value } }) => {
            return (
              <Box display='flex' gap={2} ml={1}>
                {(value as string[]).map((constituent, index) => (
                  <Constituent charChinese={constituent} key={index} />
                ))}
              </Box>
            )
          }}
        />

        <Autocomplete
          filterOptions={x => x}
          options={CHARS.map(char => char)}
          isOptionEqualToValue={(option, newValue) => {
            return option.id === newValue.id
          }}
          onChange={(_, newValue, reason) => {
            if (reason === 'selectOption') {
              setValue('constituents', [...getValues('constituents'), (newValue as Character).charChinese])
            }
          }}
          onInputChange={(_, newValue, reason) => setInputValue(reason === 'input' ? newValue : '')}
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size='small'
              variant='filled'
              label='Keresés...'
            />
          )}
          getOptionLabel={option => (option as Character).charChinese}
          renderOption={(props, option) => (
            <Box component='li' display='flex' {...props}>
              <Typography component='span' variant='chineseText' fontSize='120%' mr={2}>
                {option.charChinese}
              </Typography>

              <When condition={'keyword' in option}>
                <Typography component='span' fontWeight='bold'>
                  {option.keyword}
                </Typography>
              </When>

              <When condition={'keyword' in option && 'primitiveMeaning' in option}>
                <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
              </When>

              <When condition={'primitiveMeaning' in option}>
                <FontAwesomeIcon color={palette.secondary.main} icon={faCube} size='xs' style={{ marginRight: '4px' }} />

                <Typography component='span' fontStyle='italic'>
                  {option.primitiveMeaning}
                </Typography>
              </When>
            </Box>
          )}
          sx={{ width: '100%' }}
          {...{ inputValue }}
        />
      </Box>
    </Box>
  )
}

function Constituent({ charChinese }: { charChinese: string }) {
  return (
    <Typography
      component='span'
      position='relative'
      variant='chineseText'
      sx={{ bgcolor: 'grey.50', borderRadius: 2, maxWidth: charWidth, p: 1 }}
    >
      <Tooltip title='Alapelem törlése'>
        <IconButton color='error' size='small' sx={{ position: 'absolute', top: -6, right: -6 }}>
          <FontAwesomeIcon icon={faClose} transform='shrink-8' />
        </IconButton>
      </Tooltip>

      {charChinese}
    </Typography>
  )
}
