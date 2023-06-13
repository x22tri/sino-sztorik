import { Box, Divider, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useFetcher } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { CharacterSection } from './sections/CharacterSection'

export default function AdminContent() {
  const { constants } = useTheme()

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
      paddingX={2}
    >
      <Heading title='Idővonal' />

      <fetcher.Form id='char-form' method='post' action='/admin'>
        <CharacterSection />

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

        <Box alignItems='center' display='flex' flexDirection='row' mt={2}>
          <Typography variant='h6' fontWeight='bold' flexGrow={1}>
            Kifejezések a karakterrel
          </Typography>

          <Stack
            color='primary.main'
            direction='row'
            divider={<Divider orientation='vertical' flexItem />}
            spacing={2}
            flexGrow={1}
          >
            {['一早', '早上', '早日'].map((phrase, index) => (
              <Box component='span' key={index} typography='chineseText' fontSize='inherit'>
                {phrase}
              </Box>
            ))}
            <Box component='span'>+3</Box>
          </Stack>
        </Box>
      </fetcher.Form>
    </Stack>
  )
}
