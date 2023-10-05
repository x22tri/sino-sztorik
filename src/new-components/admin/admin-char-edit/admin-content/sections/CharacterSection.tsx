import { faCube, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from '@mui/material'
import { Controller, FieldValues, FormProvider, RegisterOptions, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useRouteLoaderData } from 'react-router-dom'
import { LoadCharEdit } from '../../../../shared/route-loaders/loadCharEdit'

type CharacterSectionInput = {
  frequency: number | undefined
  keyword: string | undefined
  pinyin: string | undefined
  primitive: string | undefined
  productivePinyin: boolean | undefined
}

export function CharacterSection() {
  const { charFormData } = useRouteLoaderData('charEdit') as LoadCharEdit

  const { frequency, keyword, pinyin, primitive, productivePinyin } = charFormData

  const methods = useForm<CharacterSectionInput>({
    defaultValues: { frequency, keyword, pinyin, primitive, productivePinyin },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<CharacterSectionInput> = (data: any) => {
    console.log(data)
  }

  const resetForm = () => {
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant='h4' mb={3}>
          Alapadatok
        </Typography>

        <Stack gap={1}>
          <KeywordField />

          <PrimitiveField />

          <Box alignItems='flex-start' display='flex' flexDirection='row' gap={2}>
            <PinyinField />

            <ProductivePinyinCheckbox />
          </Box>

          <FrequencyField />
        </Stack>

        <Box display='flex' gap={2} mt={6}>
          <Button startIcon={<FontAwesomeIcon icon={faSave} transform='shrink-4' />} variant='contained' type='submit'>
            Mentés
          </Button>

          <Button onClick={resetForm} type='button'>
            Elvetés
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}

function KeywordField() {
  const { getValues } = useFormContext()

  return (
    <CharEditTextField
      label='Kulcsszó'
      name='keyword'
      rules={{ validate: () => (!getValues('keyword') && !getValues('primitive') ? ' ' : true) }}
      sx={{ '.MuiInputBase-input': { fontWeight: 'bold' } }}
    />
  )
}

function PrimitiveField() {
  const { palette } = useTheme()
  const { getValues } = useFormContext()

  return (
    <CharEditTextField
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
      rules={{
        validate: () =>
          !getValues('keyword') && !getValues('primitive')
            ? 'A "Kulcsszó" és az "Alapelemként" mezők legalább egyike kötelező'
            : true,
      }}
      sx={{ '.MuiInputBase-input': { fontStyle: 'italic' } }}
    />
  )
}

function PinyinField() {
  const { getValues } = useFormContext()

  return (
    <CharEditTextField
      label='Kiejtés'
      name='pinyin'
      rules={{
        validate: () =>
          !getValues('keyword') && getValues('pinyin')
            ? 'Kulcsszó nélkül kiejtés sem adható meg'
            : getValues('keyword') && !getValues('pinyin')
            ? 'Ha a kulcsszó meg van adva, a kiejtést is meg kell adni'
            : true,
      }}
      sx={{ '.MuiInputBase-input': { typography: 'pinyin' } }}
    />
  )
}

function FrequencyField() {
  const { getValues } = useFormContext()

  return (
    <CharEditTextField
      label='Gyakoriság'
      name='frequency'
      rules={{
        validate: () =>
          !getValues('keyword') && getValues('frequency')
            ? 'Kulcsszó nélkül gyakoriság sem adható meg'
            : getValues('keyword') && !getValues('frequency')
            ? 'Ha a kulcsszó meg van adva, a gyakoriságot is meg kell adni'
            : !/^(0|[1-9][0-9]*)$/.test(getValues('frequency'))
            ? 'A gyakoriságot egész számmal kell megadni'
            : true,
      }}
    />
  )
}

function ProductivePinyinCheckbox() {
  const { formState, getValues } = useFormContext()

  return (
    <Box>
      <Controller
        name='productivePinyin'
        rules={{
          validate: () =>
            !getValues('pinyin') && getValues('productivePinyin')
              ? 'Kiejtés nélkül egy karakter nem lehet gyakran hangjelölő'
              : true,
        }}
        render={({ field }) => (
          <FormControlLabel
            disableTypography
            control={
              <Checkbox
                color={formState.errors.productivePinyin?.message ? 'error' : 'primary'}
                checked={field.value}
                {...field}
                sx={{ ':hover': { bgcolor: 'transparent', opacity: 0.8 } }}
              />
            }
            label='Gyakran hangjelölő?'
            sx={{ mr: 0, typography: 'body2', lineHeight: 1.2 }}
          />
        )}
      />
      <FormHelperText sx={{ color: 'error.main' }}>
        {(formState.errors.productivePinyin?.message as string) || ' '}
      </FormHelperText>
    </Box>
  )
}

function CharEditTextField({
  label,
  name,
  rules = {},
  ...restProps
}: TextFieldProps & {
  name: string
  rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined
}) {
  const { palette } = useTheme()
  const { formState, trigger } = useFormContext()

  return (
    <Controller
      {...{ name, rules }}
      render={({ field: { value, onBlur, onChange } }) => (
        <TextField
          error={!!formState.errors[name]?.message}
          fullWidth
          id={name}
          helperText={(formState.errors[name]?.message as string) || ' '}
          InputLabelProps={{ shrink: true }}
          onChange={event => onChange(event.target.value)}
          size='small'
          variant='filled'
          onBlur={() => {
            onBlur()
            trigger()
          }}
          {...restProps}
          {...{ label, name, value }}
          sx={{ flexShrink: 1, '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } }, ...restProps.sx }}
        />
      )}
    />
  )
}
