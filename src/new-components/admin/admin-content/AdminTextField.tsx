import { TextField, TextFieldProps, lighten, useTheme } from '@mui/material'

/*

To-Do:
if new info: add colored BG to text field, add field name to newInfo, add value as defaultValue if present
if modified info: add colored BG to text field, add field name to modifiedInfo, add value as defaultValue if present
if previous info: disable text field and make BG white, add pen endAdornment that lets you edit it

*/

export function AdminTextField({ label, name, ...restProps }: TextFieldProps) {
  const { palette } = useTheme()
  const isModifiedInfo = name === 'frequency'

  return (
    <TextField
      fullWidth
      id={name}
      InputLabelProps={{ shrink: true }}
      size='small'
      variant='filled'
      {...restProps}
      {...{ label, name }}
      sx={{
        '.MuiFilledInput-root': {
          bgcolor: isModifiedInfo ? lighten(palette.warning.main, 0.8) : undefined,
          ':hover': { bgcolor: isModifiedInfo ? lighten(palette.warning.main, 0.7) : undefined },
        },
        ...restProps.sx,
      }}
    />
  )
}
