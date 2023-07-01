import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, InputAdornment, useTheme } from '@mui/material'
import { AdminTextField } from '../AdminTextField'
import { ProductivePinyinCheckbox } from '../preview-character-variant/ProductivePinyinCheckbox'
import { useFormContext, useWatch } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { CharFormError } from '../AdminStepLabel'

export function CharacterSection({
  setCharFormErrors,
}: {
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: boolean }>>
}) {
  const { palette } = useTheme()

  const keyword = useWatch({ name: 'keyword' })
  const frequency = useWatch({ name: 'frequency' })
  const primitive = useWatch({ name: 'primitive' })

  useEffect(() => {
    setCharFormErrors(prev => ({ ...prev, [CharFormError.FrequencyNotANumber]: Number.isNaN(+frequency) }))
  }, [frequency])

  useEffect(() => {
    setCharFormErrors(prev => ({ ...prev, [CharFormError.FrequencyNotPresentWithKeyword]: +frequency === 0 && !!keyword }))
  }, [frequency, keyword])

  useEffect(() => {
    setCharFormErrors(prev => ({ ...prev, [CharFormError.NoKeywordOrPrimitive]: !keyword && !primitive }))
  }, [keyword, primitive])

  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <AdminTextField label='Kulcsszó' name='keyword' sx={{ '.MuiInputBase-input': { fontWeight: 'bold' } }} />

      <AdminTextField
        color='secondary'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <FontAwesomeIcon color={palette.secondary.main} icon={faCube} />
            </InputAdornment>
          ),
        }}
        label='Alapelemként'
        name='primitive'
        sx={{ '.MuiInputBase-input': { fontStyle: 'italic' } }}
      />

      <Box alignItems='center' display='flex' flexDirection='row' gap={2}>
        <AdminTextField
          label='Kiejtés'
          name='pinyin'
          sx={{ '.MuiInputBase-input': { textAlign: 'center', typography: 'pinyin' } }}
        />

        <ProductivePinyinCheckbox />

        <AdminTextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label='Gyakoriság' name='frequency' />
      </Box>
    </Box>
  )
}
