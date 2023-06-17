import { TextField, TextFieldProps, darken, lighten, useTheme } from '@mui/material'

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
      }}
    />
  )
}
