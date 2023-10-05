import { TextField, TextFieldProps, useTheme } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useContext, useRef } from 'react'
import { CharacterEntryV3, LessonEntry } from '../../shared/MOCK_DATABASE_ENTRIES'
import { CharAdminErrorContext } from '../admin-char-edit/error-context/CharAdminErrorContext'
import { LessonEditErrorContext } from '../admin-lesson-edit/error-context/LessonEditErrorContext'

export function CharEditTextField({ label, name, ...restProps }: TextFieldProps & { name: keyof CharacterEntryV3 }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { palette } = useTheme()

  return (
    <Controller
      {...{ name }}
      render={({ field: { value, onChange } }) => (
        <TextField
          // error={isFieldErrored(charFormErrors, name)}
          fullWidth
          id={name}
          InputLabelProps={{ shrink: true }}
          onChange={event => onChange(event.target.value)}
          size='small'
          variant='filled'
          {...restProps}
          {...{ inputRef, label, name, value }}
          sx={{ flexShrink: 1, '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } }, ...restProps.sx }}
        />
      )}
    />
  )
}

export function CharAdminTextField({ label, name, ...restProps }: TextFieldProps & { name: keyof CharacterEntryV3 }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { palette } = useTheme()
  const { charFormErrors } = useContext(CharAdminErrorContext)

  return (
    <Controller
      {...{ name }}
      render={({ field: { value, onChange } }) => (
        <TextField
          error={isFieldErrored(charFormErrors, name)}
          fullWidth
          id={name}
          InputLabelProps={{ shrink: true }}
          onChange={event => onChange(event.target.value)}
          inputRef={inputRef}
          size='small'
          variant='filled'
          {...restProps}
          {...{ label, name, value }}
          sx={{ flexShrink: 1, '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } }, ...restProps.sx }}
        />
      )}
    />
  )
}

export function LessonAdminTextField({ label, name, ...restProps }: TextFieldProps & { name: keyof LessonEntry }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { palette } = useTheme()
  const { lessonFormErrors } = useContext(LessonEditErrorContext)

  return (
    <Controller
      {...{ name }}
      render={({ field: { value, onChange } }) => (
        <TextField
          error={isFieldErrored(lessonFormErrors, name)}
          fullWidth
          id={name}
          InputLabelProps={{ shrink: true }}
          onChange={event => onChange(event.target.value)}
          inputRef={inputRef}
          size='small'
          variant='filled'
          {...restProps}
          {...{ label, name, value }}
          sx={{ flexShrink: 1, '.Mui-error': { '&.MuiInputBase-root': { bgcolor: palette.error[100] } }, ...restProps.sx }}
        />
      )}
    />
  )
}

export function isFieldErrored<T extends string, U extends object>(
  errors: {
    [key in T]: { value: boolean; dependencies: keyof U[] }
  },
  fieldName: keyof U
) {
  return (Object.values(errors) as { value: boolean; dependencies: (keyof U)[] }[]).some(
    ({ value, dependencies }) => value && dependencies.includes(fieldName)
  )
}
