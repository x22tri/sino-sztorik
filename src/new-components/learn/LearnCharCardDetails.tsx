import { Dispatch, SetStateAction, useState, useEffect, Fragment } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { useSwiper } from 'swiper/react'
import { RoundedCard } from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Story from './Story'
import SupplementsOverview from './SupplementsOverview'
import { blue, teal } from '@mui/material/colors'
import { Chip, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faChartColumn,
  faCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Theme } from '@material-ui/core'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { KEYWORD_EXPLANATION_TOOLTIP } from '../shared/strings'

export function useStoryHorizontalPadding() {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('md')) ? 1 : 2
}

export default function LearnCharCardDetails({
  lessonChar,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
}: {
  lessonChar: Character
  charToReturnToFromFlashback: Character | null
  setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
}) {
  const { palette, spacing } = useTheme()

  const swiper = useSwiper()

  const [charOverride, setCharOverride] = useState<Character | null>(null)

  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false)

  useEffect(() => {
    if (charToReturnToFromFlashback === null) {
      setCharOverride(null)
    }
  }, [charToReturnToFromFlashback])

  function startFlashback(constituent: string) {
    const charToFlashbackTo = findCharToFlashbackTo(constituent)

    if (charToFlashbackTo === null) {
      setIsErrorSnackbarOpen(true)
      return
    }

    setCharToReturnToFromFlashback(lessonChar)

    setCharOverride(charToFlashbackTo)

    swiper.disable()
  }

  function findCharToFlashbackTo(constituent: string): Character | null {
    const charInLesson = CHARS.find(char => char.charChinese === constituent)

    if (charInLesson) {
      return charInLesson
    }

    return null
  }

  const currentlyViewedChar = charOverride ?? lessonChar

  const {
    charChinese,
    constituents,
    explanation,
    frequency,
    keyword,
    otherUses,
    primitiveMeaning,
    story,
  } = currentlyViewedChar

  return (
    <Box
      sx={{
        mx: 1,
        // ...(charToReturnToFromFlashback !== null
        //   ? { borderColor: 'black' }
        //   : {}),
      }}
      // className='disable-select'
    >
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={6000}
        message='Constituent not found.'
      />
      {/* <Box position='relative' minHeight='32px'> */}
      {/* <Frequency {...{ frequency }} /> */}
      {/* {constituents ? (
        <ConstituentList
          {...{
            constituents,
            isActiveSlide,
            startFlashback,
          }}
        />
      ) : null} */}
      {/* <SupplementsOverview {...{ otherUses }} /> */}
      {/* </Box> */}
      {/* <Subheading title='Karakter' /> */}

      <Box sx={{ height: spacing(3) }} />

      <Box>
        <Typography
          variant='chineseHeading'
          component='h2'
          textAlign='center'
          sx={{ my: 1 }}
        >
          {charChinese}
        </Typography>

        {!keyword ? null : (
          <Box
            display='flex'
            justifyContent='center'
            position='relative'
            typography='h4'
          >
            <Typography
              variant='h4'
              position='relative'
              color={palette.primary.main}
            >
              {keyword}

              {!explanation ? null : (
                <Tooltip title={KEYWORD_EXPLANATION_TOOLTIP}>
                  <Box
                    display='flex'
                    component='span'
                    position='absolute'
                    right={0}
                    top={0}
                    color={palette.primary.light}
                    sx={{
                      transform: 'translate(85%)',
                      '&:hover': { color: palette.primary.lightHovered },
                    }}
                  >
                    <FontAwesomeIcon
                      size='xs'
                      transform='shrink-7'
                      icon={faQuestionCircle}
                    />
                  </Box>
                </Tooltip>
              )}
            </Typography>
          </Box>
        )}
      </Box>
      {!primitiveMeaning ? null : (
        <Typography
          component='h4'
          variant='primitiveMeaning'
          display='flex'
          justifyContent='center'
        >
          {primitiveMeaning}
        </Typography>
      )}
      <Box sx={{ height: spacing(5) }} />
      <Chips />
      <Box sx={{ height: spacing(1) }} />

      <Subheading title='' />
      <Story {...{ story }} />
      {/* <Box sx={{ height: spacing(1) }} /> */}
    </Box>
  )
}

function Chips() {
  const { breakpoints, palette } = useTheme()

  const isSmallScreen = useMediaQuery(breakpoints.down('md'))

  return (
    <Stack
      direction={isSmallScreen ? 'column' : 'row'}
      // display='flex'
      // spacing={1}
      flexWrap='wrap'
      gap={isSmallScreen ? 0.5 : 1}
      divider={<Divider orientation='vertical' flexItem />}
      sx={{
        px: useStoryHorizontalPadding(),
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      <InfoChip icon={faChartColumn} label='Fonetikus elem' />
      <InfoChip icon={faChartColumn} label='Fonetikus elem' />
      <InfoChip icon={faChartColumn} label='Igen gyakori' />
    </Stack>
  )
}

function InfoChip({ label, icon }: { label: string; icon: IconDefinition }) {
  return (
    <Chip
      icon={<FontAwesomeIcon {...{ icon }} />}
      variant='outlined'
      size='small'
      sx={{ borderWidth: 0, '.MuiChip-label': { paddingRight: 0 } }}
      {...{ label }}
    />
  )
}

function Subheading({ title }: { title: string }) {
  const { palette } = useTheme()
  return (
    <Box sx={{ px: useStoryHorizontalPadding(), color: palette.grey[500] }}>
      <Typography variant='h6'>{title}</Typography>
      <Divider sx={{ mb: 2 }} />
    </Box>
  )
}

function ConstituentList({
  constituents,
  isActiveSlide,
  startFlashback,
}: {
  constituents: string[]
  isActiveSlide: boolean
  startFlashback: (constituent: string) => void
}) {
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      {constituents.map((constituent, index) => (
        <Fragment key={index}>
          <Link
            onClick={() => startFlashback(constituent)}
            tabIndex={isActiveSlide ? index + 1 : -1}
            underline='hover'
            sx={{
              mx: 1,
              typography: 'chineseNormal',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            {constituent}
          </Link>
        </Fragment>
      ))}
    </Box>
  )
}
