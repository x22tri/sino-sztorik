import { Box, Button, Typography } from '@mui/material'
import { ERROR_AIYA, ERROR_BACK_TO_MAIN_PAGE, ERROR_GENERIC_MESSAGE } from '../shared/strings'
import { When } from 'react-if'
import { LandingAppbar } from '../landing/LandingAppbar'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ErrorPage() {
  return (
    <>
      <LandingAppbar />

      <Box alignItems='center' display='flex' flexDirection='column' gap={12}>
        <Aiya />

        <Typography>{ERROR_GENERIC_MESSAGE}</Typography>

        <Button
          color='primary'
          href='/'
          size='large'
          variant='contained'
          endIcon={<FontAwesomeIcon icon={faArrowRight} transform='shrink-4' />}
          sx={{ borderRadius: 6 }}
        >
          {ERROR_BACK_TO_MAIN_PAGE}
        </Button>
      </Box>
    </>
  )
}

function Aiya() {
  return (
    <Box display='flex' flexDirection='row' gap={5} mt={6}>
      {ERROR_AIYA.map(({ glyph, keyword, pinyin }, index) => (
        <Box
          alignItems='center'
          display='grid'
          key={index}
          textAlign='center'
          sx={{
            grid: `"pinyin" auto
                   "glyph" auto
                   "keyword" auto
                   / auto`,
          }}
        >
          <When condition={pinyin}>
            <Typography gridArea='pinyin' variant='pinyin' fontSize={20}>
              {pinyin}
            </Typography>
          </When>

          <Typography gridArea='glyph' variant='chineseText' fontWeight='bold' fontSize={86}>
            {glyph}
          </Typography>

          <When condition={keyword}>
            <Typography gridArea='keyword' fontWeight='bold' fontSize={20}>
              {keyword}
            </Typography>
          </When>
        </Box>
      ))}
    </Box>
  )
}
