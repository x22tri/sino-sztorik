import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, InputLabel, Tooltip, Typography, useTheme } from '@mui/material'
import { Controller } from 'react-hook-form'

const charWidth = '42px'

export function ConstituentsSection() {
  return (
    <Box mt={3}>
      <InputLabel shrink sx={{ ml: 1.5 }}>
        Összetétel
      </InputLabel>
      <Controller
        name='constituents'
        render={({ field: { value, onChange } }) => {
          return (
            <Box display='flex' gap={2} ml={1}>
              {(value as string[]).map((constituent, index) => (
                <Constituent charChinese={constituent} key={index} />
              ))}
            </Box>
          )
        }}
      />
    </Box>
  )
}

function Constituent({ charChinese }: { charChinese: string }) {
  return (
    <Typography
      component='span'
      position='relative'
      variant='chineseText'
      sx={{ bgcolor: 'grey.50', borderRadius: 2, maxWidth: charWidth, p: 1 }}
    >
      <Tooltip title='Alapelem törlése'>
        <IconButton color='error' size='small' sx={{ position: 'absolute', top: -6, right: -6 }}>
          <FontAwesomeIcon icon={faClose} transform='shrink-8' />
        </IconButton>
      </Tooltip>

      {charChinese}
    </Typography>
  )
}
