import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, InputAdornment, useTheme } from '@mui/material'
import { Subheading } from '../../../learn/headings/Subheading'
import { AdminTextField } from '../AdminTextField'
import { ProductivePinyinCheckbox } from '../preview-character-variant/ProductivePinyinCheckbox'

export function CharacterSection() {
  const { palette } = useTheme()

  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Subheading title='Karakter' styles={{ my: 0 }} />

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
