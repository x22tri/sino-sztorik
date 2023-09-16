import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, InputAdornment, useTheme } from '@mui/material'
import { ProductivePinyinCheckbox } from '../preview-character-variant/ProductivePinyinCheckbox'
import { CharAdminTextField } from '../../../shared/AdminTextField'

export function CharacterSection({}: {}) {
  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <KeywordField />

      <PrimitiveField />

      <Box alignItems='center' display='flex' flexDirection='row' gap={2}>
        <PinyinField />

        <ProductivePinyinCheckbox />

        <FrequencyField />
      </Box>
    </Box>
  )
}

function KeywordField() {
  return <CharAdminTextField label='Kulcsszó' name='keyword' sx={{ '.MuiInputBase-input': { fontWeight: 'bold' } }} />
}

function PrimitiveField() {
  const { palette } = useTheme()

  return (
    <CharAdminTextField
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
  )
}

function PinyinField() {
  return (
    <CharAdminTextField
      label='Kiejtés'
      name='pinyin'
      sx={{ '.MuiInputBase-input': { textAlign: 'center', typography: 'pinyin' } }}
    />
  )
}

function FrequencyField() {
  return <CharAdminTextField label='Gyakoriság' name='frequency' />
}
