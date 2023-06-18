import { TextField, TextFieldProps, lighten, useTheme } from '@mui/material'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'
import { X, mergePreviousTiers } from './AdminContent'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { DiffedCharacterEntry, DiffInfoTier } from '../../shared/logic/loadAdminChar'
import { useStore } from '../../shared/logic/useStore'

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

  const isFieldNew = prevTiers?.[name] !== getValues(name) && !prevTiers?.[name]
  const isFieldChanged = prevTiers?.[name] !== getValues(name) && !!prevTiers?.[name]
  const isFieldDisabled = !isFieldNew && !isFieldChanged && !!prevTiers?.[name]

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
    <TextFieldElement
      disabled={isFieldDisabled}
      fullWidth
      id={name}
      InputLabelProps={{ shrink: true }}
      size='small'
      variant='filled'
      {...restProps}
      {...{ label, name }}
      sx={{ '.MuiFilledInput-root': { bgcolor, ':hover': { bgcolor: hoverBgColor } }, ...restProps.sx }}
      // validation={}
      onBlur={e => console.log(e)}
    />
  )
}
