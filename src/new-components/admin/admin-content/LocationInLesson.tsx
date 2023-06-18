import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export function LocationInLesson({ tier, lessonNumber, index }: { tier: number; lessonNumber: number; index: number }) {
  return (
    <Box alignItems='center' display='flex' marginY={2} gap={3}>
      <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1}>
        <Typography variant='h5' fontWeight='bold'>
          {tier}. kör
        </Typography>

        <Typography variant='h5' fontWeight='bold'>
          {lessonNumber}. lecke
        </Typography>

        <Typography variant='h5' fontWeight='bold'>
          {index}. karakter
        </Typography>
      </Stack>
      <Button
        component={Link}
        size='small'
        startIcon={<FontAwesomeIcon icon={faArrowRightArrowLeft} />}
        to={`lessons/${lessonNumber}`}
      >
        Áthelyezés
      </Button>
    </Box>
  )
}
