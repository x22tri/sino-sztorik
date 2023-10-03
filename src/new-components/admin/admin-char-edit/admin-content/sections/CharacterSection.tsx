import { faArrowRight, faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { CharAdminTextField } from '../../../shared/AdminTextField'
import { Controller } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { NextStep } from '../../../shared/NextStep'
import { CharEditHeading } from '../AdminCharEditContent'
import { PreviousStep } from '../../../shared/PreviousStep'
import { Subheading } from '../../../../learn/headings/Subheading'

export function CharacterSection() {
  const { glyph } = useParams()

  return (
    <>
      <PreviousStep link={'/admin/characters'} text='Karakterek' />

      <Typography variant='h4' mb={3}>
        Alapadatok
      </Typography>

      <Stack gap={3}>
        <KeywordField />

        <PrimitiveField />

        <Box alignItems='center' display='flex' flexDirection='row' gap={2}>
          <PinyinField />

          <ProductivePinyinCheckbox />
        </Box>

        <FrequencyField />
      </Stack>

      <NextStep link={`/admin/characters/${glyph}/form/2`} text='Összetétel' />
    </>
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
  return <CharAdminTextField label='Kiejtés' name='pinyin' sx={{ '.MuiInputBase-input': { typography: 'pinyin' } }} />
}

function FrequencyField() {
  return <CharAdminTextField label='Gyakoriság' name='frequency' />
}

function ProductivePinyinCheckbox() {
  return (
    <Controller
      name='productivePinyin'
      render={({ field: { value, onChange } }) => (
        <FormControl>
          <FormGroup row>
            <FormControlLabel
              disableTypography
              control={
                <Checkbox
                  checked={!!value}
                  onChange={() => onChange(!value)}
                  {...{ value }}
                  sx={{
                    ':hover': { bgcolor: 'transparent', opacity: 0.8 },
                  }}
                />
              }
              label='Gyakran hangjelölő?'
              sx={{ mr: 0, typography: 'body2', lineHeight: 1.2 }}
            />
          </FormGroup>
        </FormControl>
      )}
    />
  )
}
