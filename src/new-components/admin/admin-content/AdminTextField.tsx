import { InputAdornment, TextField, TextFieldProps, lighten, useTheme } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useStore } from '../../shared/logic/useStore'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { useContext, useEffect, useRef, useState } from 'react'
import { When } from 'react-if'
import { CharacterEntryV3 } from '../../shared/MOCK_DATABASE_ENTRIES'
import { CharAdminErrorContext, getCharAdminErrors } from '../char-admin-error-context/CharAdminErrorContext'

export function AdminTextField({ label, name, ...restProps }: TextFieldProps & { name: keyof CharacterEntryV3 }) {
  const inputRef = useRef<HTMLInputElement>(null)
  // const [editedField, setEditedField] = useState<keyof CharacterEntryV3 | null>(null)
  const { palette } = useTheme()
  const { charFormErrors } = useContext(CharAdminErrorContext)
  // const { getValues } = useFormContext()

  // const isFieldDisabled = !isFieldNew && !isFieldChanged && !!prevTiers?.[name] && editedField !== name

  // const isFieldDisabled = false

  // const bgcolor = isFieldNew
  //   ? lighten(palette.success.main, 0.8)
  //   : isFieldChanged
  //   ? lighten(palette.warning.main, 0.8)
  //   : undefined

  // const hoverBgColor = isFieldNew
  //   ? lighten(palette.success.main, 0.7)
  //   : isFieldChanged
  //   ? lighten(palette.warning.main, 0.7)
  //   : undefined

  // useEffect(() => {
  //   if (editedField && !isFieldDisabled) {
  //     inputRef?.current?.focus()
  //   }
  // }, [editedField, isFieldDisabled])

  return (
    <Controller
      {...{ name }}
      render={({ field: { value, onChange } }) => (
        <TextField
          error={isFieldErrored(charFormErrors, name)}
          fullWidth
          id={name}
          InputLabelProps={{ shrink: true }}
          // onBlur={() => setEditedField(null)}
          onChange={event => onChange(event.target.value)}
          // onClick={() => setEditedField(name)}
          inputRef={inputRef}
          size='small'
          variant='filled'
          {...restProps}
          {...{ label, name, value }}
          sx={{
            flexShrink: 1,
            '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } },
            // '.MuiFilledInput-root': { bgcolor, ':hover': { bgcolor: hoverBgColor } },
            // '.Mui-disabled': { bgcolor: 'inherit', color: 'inherit' },
            ...restProps.sx,
          }}
        />
      )}
    />
  )
}

function isFieldErrored<T extends string, U extends object>(
  errors: {
    [key in T]: { value: boolean; dependencies: keyof U[] }
  },
  fieldName: keyof U
) {
  return (Object.values(errors) as { value: boolean; dependencies: (keyof U)[] }[]).some(
    ({ value, dependencies }) => value && dependencies.includes(fieldName)
  )
}
