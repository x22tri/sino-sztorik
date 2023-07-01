import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { Controller } from 'react-hook-form'

export function ProductivePinyinCheckbox() {
  return (
    <Controller
      name='productivePinyin'
      render={({ field: { value, onChange } }) => (
        <FormControl sx={{ minWidth: 'min-content' }}>
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
