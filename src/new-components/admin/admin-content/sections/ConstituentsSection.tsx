import { Box, InputLabel, useTheme } from '@mui/material'
import { Controller } from 'react-hook-form'

export function ConstituentsSection() {
  const { palette } = useTheme()

  return (
    <Box mt={3} ml={1.5}>
      <InputLabel shrink>Összetétel</InputLabel>
      <Controller
        name='constituents'
        render={({ field: { value, onChange } }) => {
          return (
            <Box display='flex' gap={3}>
              {(value as string[]).map((constituent, index) => (
                <Box component='span' key={index}>
                  {constituent}
                </Box>
              ))}
            </Box>
          )
        }}
      />
    </Box>
  )
}
