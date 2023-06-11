import { faCube, faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useFetcher } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { Subheading } from '../../learn/headings/Subheading'
import { useState } from 'react'

export default function AdminContent({ toolbarHeight }: { toolbarHeight: number }) {
  const { constants, palette, spacing } = useTheme()
  const [isProductivePinyin, toggleProductivePinyin] = useState(false)

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
    >
      <fetcher.Form id='char-form' method='post' action='/admin'>
        <Heading title='Áttekintés' styles={{ my: 0 }} />

        <Box alignItems='center' display='flex' flexDirection='column'>
          <Box position='relative'>
            <TextField
              id='pinyin'
              InputLabelProps={{ shrink: true }}
              label='Kiejtés'
              name='pinyin'
              size='small'
              sx={{
                '.MuiInputBase-input': { textAlign: 'center', typography: 'pinyin' },
                '.MuiInputBase-root': { borderRadius: ({ spacing }) => spacing(1) },
              }}
            />

            <IconButton
              color={isProductivePinyin ? 'primary' : 'inherit'}
              onClick={() => toggleProductivePinyin(prev => !prev)}
              edge='start'
              size='small'
              sx={{ height: 1, position: 'absolute', marginLeft: 0.5, my: 'auto', opacity: isProductivePinyin ? 1 : 0.3 }}
            >
              <FontAwesomeIcon icon={faVolumeDown} />
            </IconButton>
          </Box>

          <Box typography='chineseText' fontSize={120} lineHeight={1}>
            早
          </Box>

          <Box fontSize={24} fontWeight='800' mt={1}>
            korai
          </Box>

          <Box fontSize={20} fontStyle='italic'>
            <FontAwesomeIcon
              icon={faCube}
              color={palette.secondary.main}
              size='xs'
              style={{ marginBottom: '2px', marginRight: spacing(0.5), verticalAlign: 'middle' }}
            />
            napraforgó
          </Box>
        </Box>

        <Divider sx={{ mt: 4 }} />

        <Subheading title='1. kör' />

        <Box alignItems='center' display='flex' gap={2} mt={3}>
          <TextField
            fullWidth
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
            fullWidth
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

        <Box mt={3}>
          <TextField
            id='story'
            InputLabelProps={{ shrink: true }}
            fullWidth
            label='Történet'
            multiline
            name='story'
            size='small'
            sx={{ '.MuiInputBase-root': { borderRadius: ({ spacing }) => spacing(1), minHeight: '20ch' } }}
          />
        </Box>
      </fetcher.Form>
    </Stack>
  )
}
