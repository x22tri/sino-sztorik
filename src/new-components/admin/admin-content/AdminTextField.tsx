import { InputAdornment, TextField, TextFieldProps, lighten, useTheme } from '@mui/material'
import { Controller, useForm, useFormContext } from 'react-hook-form-mui'
import { X } from './AdminContent'
import { useStore } from '../../shared/logic/useStore'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { useEffect, useRef, useState } from 'react'
import { Unless, When } from 'react-if'

/*

To-Do:
if new info: add colored BG to text field, add field name to newInfo, add value as defaultValue if present
if modified info: add colored BG to text field, add field name to modifiedInfo, add value as defaultValue if present
if previous info: disable text field and make BG white, add pen endAdornment that lets you edit it

*/

export function AdminTextField({ label, name, ...restProps }: TextFieldProps & { name: keyof X }) {
  const { palette } = useTheme()
  const { prevTiers } = useStore('adminChar')
  const { getValues } = useFormContext()
  const [editedField, setEditedField] = useState<keyof X | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setFocus } = useForm()

  const isFieldNew = prevTiers?.[name] !== getValues(name) && !prevTiers?.[name]
  const isFieldChanged = prevTiers?.[name] !== getValues(name) && !!prevTiers?.[name]
  const isFieldDisabled = !isFieldNew && !isFieldChanged && !!prevTiers?.[name] && editedField !== name

  const bgcolor = isFieldNew
    ? lighten(palette.success.main, 0.8)
    : isFieldChanged
    ? lighten(palette.warning.main, 0.8)
    : undefined

  const hoverBgColor = isFieldNew
    ? lighten(palette.success.main, 0.7)
    : isFieldChanged
    ? lighten(palette.warning.main, 0.7)
    : undefined

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur, ref } }) => (
        <TextField
          disabled={isFieldDisabled}
          fullWidth
          id={name}
          InputProps={{
            endAdornment: (
              <When condition={isFieldDisabled}>
                <InputAdornment position='end'>
                  <ToolbarButton
                    icon={faPen}
                    onClick={() => {
                      setEditedField(name)
                      setFocus(name)
                      console.log(inputRef.current)
                      inputRef.current?.focus()
                    }}
                    size='small'
                    tooltip='Szerkesztés'
                  ></ToolbarButton>
                </InputAdornment>
              </When>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          onBlur={() => setEditedField(null)}
          onClick={() => setEditedField(name)}
          inputRef={inputRef}
          onChange={event => onChange(event.target.value)}
          size='small'
          variant='filled'
          {...restProps}
          {...{ label, name, value }}
          sx={{ flexShrink: 1, '.MuiFilledInput-root': { bgcolor, ':hover': { bgcolor: hoverBgColor } }, ...restProps.sx }}
        />
      )}
    />
  )
}
