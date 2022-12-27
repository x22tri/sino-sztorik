import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  Fragment,
  ReactNode,
} from 'react'
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
import {
  Button,
  Chip,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faBell,
  faBroadcastTower,
  faChartColumn,
  faCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Theme } from '@material-ui/core'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { KEYWORD_EXPLANATION_TOOLTIP } from '../shared/strings'
import { getFrequencyText } from './getFrequencyText'

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
      minWidth={0}
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
      {/* <Box sx={{ height: spacing(5) }} /> */}
      <Chips {...{ frequency }} />
      {/* <Box sx={{ height: spacing(1) }} /> */}

      {/* <Subheading title='' /> */}
      <Story {...{ story }} />
      {/* <Box sx={{ height: spacing(1) }} /> */}
    </Box>
  )
}

function Scrollable({ children }: { children: ReactNode }) {
  return (
    <Box display='flex' minWidth={0} sx={{ overflowY: 'scroll' }}>
      {children}
    </Box>
  )
}

function Chips({ frequency }: { frequency: number | undefined }) {
  const { breakpoints, palette } = useTheme()

  const isSmallScreen = useMediaQuery(breakpoints.down('md'))

  return (
    <Stack
      // direction={isSmallScreen ? 'column' : 'row'}
      direction='row'
      // maxWidth='100%'
      // display='flex'
      // spacing={1}
      // flexWrap='nowrap'
      // maxWidth='100%'
      // maxWidth='100vw'
      // overflow='auto'
      // gap={isSmallScreen ? 0.5 : 1}
      gap={1}
      divider={<Divider orientation='vertical' flexItem />}
      sx={{
        // overflowY: 'scroll',
        // minWidth: 0,
        // display: 'flex',
        // overflowY: 'scroll',
        my: 5,
        // ml: 'auto',
        // float: 'right',
        px: useStoryHorizontalPadding(),
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
      }}
    >
      {/* <Box
    //   // component='ul'
    //   // maxWidth='100vw'
    //   // position='relative'
    //   // maxWidth='100%'
    //   // // maxWidth='200px'
    //   display='flex'
    //   // position='relative'
    //   // flexGrow={0}
    //   // flexShrink={2}
    //   // width='100%'
    //   // // flexWrap='nowrap'
    //   // overflow='hidden'
    //   minWidth={0}
    //   minHeight={0}
    //   // overflow='hidden'
    //   sx={{
    //     // minWidth: 0,
    //     maxWidth: '100%',
    //     //   display: 'flex',
    //     // overflowX: 'scroll',
    //     // overflowY: 'scroll',
    //     // flexWrap: 'nowrap',
    //     whiteSpace: 'nowrap',
    //     // listStyle: 'none',
    //     // padding: theme.spacing(0.5),
    //     // margin: 0,
    //     // overflowX: 'scroll',
    //     // overflowY: 'hidden',
    //     // maxWidth: '100%',
    //     overflow: 'scroll',
    //     // right: 0,
    //     //   padding: '20px',
    //     // justifyContent: 'flex-end',
    //   }}
    //   // sx={{ justifyContent: 'flex-end' }}
    // > */}
      <InfoChip icon={faBell} label='Emlékeztető' />
      <InfoChip icon={faBroadcastTower} label='Fonetikus elem' />
      <InfoChip icon={faChartColumn} label={getFrequencyText(frequency)} />
      {/* // </Box> */}
    </Stack>
  )
}

function InfoChip({ label, icon }: { label: string; icon: IconDefinition }) {
  const { palette } = useTheme()

  return (
    // <li>
    <Chip
      icon={<FontAwesomeIcon {...{ icon }} />}
      size='small'
      onClick={() => {}}
      variant='outlined'
      sx={{
        alignItems: 'center',
        // overflow: 'hidden',
        // display: 'inline-block',
        color: palette.grey[700],
        px: 0.5,
        borderWidth: 0,
        borderRadius: 0,
        '.MuiChip-label': { paddingRight: 0, paddingLeft: 1.5 },
        '.MuiChip-root': {
          // display: 'flex',
          // flexDirection: 'column',
          '&:hover, &:focus, &:active': {
            background: 'red',
            transition: 'none',
            boxShadow: 'none',
          },
        },
        '.MuiChip-clickable': {
          '&:hover, &:focus, &:active': {
            background: 'red',
            transition: 'none',
            boxShadow: 'none',
          },
        },
        '.MuiButtonBase-root': {
          '&:hover, &:focus, &:active': {
            background: 'red',
            transition: 'none',
            boxShadow: 'none',
          },
        },
        '&:hover, &:focus, &:active': {
          transition: 'none',
          boxShadow: 'none',
          background: 'red',
        },
      }}
      {...{ label }}
    />
    // </li>
    // <Button
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     textTransform: 'none',
    //     color: palette.grey[600],
    //   }}
    // >
    //   <FontAwesomeIcon {...{ icon }} />
    //   <Typography variant='subtitle2'>{label}</Typography>
    // </Button>
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
