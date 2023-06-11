import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider, InputAdornment, Stack, TextField, useTheme } from '@mui/material'
import { useFetcher } from 'react-router-dom'

export default function AdminContent({ toolbarHeight }: { toolbarHeight: number }) {
  const { constants, palette } = useTheme()

  const fetcher = useFetcher()

  return (
    <Stack
      boxSizing='border-box'
      bgcolor='background.paper'
      component='main'
      display='flex'
      flexDirection='column'
      marginBottom={constants.bottomToolbarHeight}
      minHeight={`calc(100vh - ${constants.bottomToolbarHeight})`}
      padding={2}
      rowGap={3}
    >
      {/* <Box typography='chineseText' fontSize={120} lineHeight={1}>
        早
      </Box>

      <Divider /> */}

      <fetcher.Form id='char-form' method='post' action='/admin'>
        <Box alignItems='center' display='flex' gap={2}>
          <Box typography='chineseText' fontWeight='bold' fontSize={32} lineHeight={1}>
            早
          </Box>

          <TextField
            id='keyword'
            InputLabelProps={{ shrink: true }}
            label='Kulcsszó'
            name='keyword'
            size='small'
            sx={{
              '.MuiInputBase-input': { fontWeight: 'bold' },
              '.MuiInputBase-root': { borderRadius: ({ spacing }) => spacing(1) },
            }}
          />

          <TextField
            color='secondary'
            id='primitive'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FontAwesomeIcon color={palette.secondary.main} icon={faCube} />
                </InputAdornment>
              ),
            }}
            label='Alapelemként'
            name='primitive'
            size='small'
            sx={{
              '.MuiInputBase-input': { fontStyle: 'italic' },
              '.MuiInputBase-root': { borderRadius: ({ spacing }) => spacing(1) },
            }}
          />
        </Box>
      </fetcher.Form>
    </Stack>
  )
}
