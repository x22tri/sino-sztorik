import { TextField, TextFieldProps } from '@mui/material'

export function AdminTextField({ label, name, ...restProps }: TextFieldProps) {
  return (
    <TextField
      fullWidth
      id={name}
      InputLabelProps={{ shrink: true }}
      size='small'
      variant='filled'
      {...restProps}
      {...{ label, name }}
    />
  )
}
