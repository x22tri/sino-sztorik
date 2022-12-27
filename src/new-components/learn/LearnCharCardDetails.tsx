import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  MouseEvent,
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
  Badge,
  Button,
  Chip,
  Popover,
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
  faClockRotateLeft,
  faCubesStacked,
  faQuestionCircle,
  faVolumeDown,
  faVolumeHigh,
  faVolumeUp,
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
      <Chips char={currentlyViewedChar} />
      {/* <Box sx={{ height: spacing(1) }} /> */}

      <Subheading title='Sztori' />
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

type ChipId =
  | 'newPrimitive'
  | 'reminder'
  | 'productivePinyin'
  | 'prequel'
  | 'frequency'

interface ChipType {
  id: ChipId
  icon: IconDefinition
  label: string
  labelAlwaysVisible?: boolean
  explanation: string
}

function Chips({ char }: { char: Character }) {
  const { palette } = useTheme()

  const chips: ChipType[] = [
    {
      id: 'newPrimitive',
      icon: faCubesStacked,
      label: 'Új jelentés alapelemként!',
      explanation: '',
    },
    { id: 'reminder', icon: faBell, label: 'Emlékeztető', explanation: '' },
    {
      id: 'productivePinyin',
      icon: faVolumeDown,
      label: 'Sokszor hangjelölő',
      explanation: '',
    },
    {
      id: 'prequel',
      icon: faClockRotateLeft,
      label: 'Előzmény: []',
      explanation: '',
    },
    {
      id: 'frequency',
      icon: faChartColumn,
      label: getFrequencyText(char.frequency),
      labelAlwaysVisible: true,
      explanation: `Ez a ${char.frequency}. 
      leggyakoribb írásjel a kínaiban, ezáltal 
      ${getFrequencyText(char.frequency).toLowerCase()} 
      karakternek számít.`,
    },
  ]

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [selectedChip, setSelectedChip] = useState<ChipType | null>(null)
  const [popoverExplanation, setPopoverExplanation] = useState('')

  function getChips() {
    // return chips.filter(({ id }) => id in char)
    return chips
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>, chipId: ChipId) {
    setAnchorEl(event.currentTarget)
    const foundChip = chips.find(({ id }) => id === chipId)!

    setSelectedChip(foundChip)
    setPopoverExplanation(foundChip.explanation)
  }

  function handleClose() {
    setAnchorEl(null)
    setSelectedChip(null)
  }

  return (
    <>
      <Stack
        direction='row'
        gap={1}
        divider={
          <Divider
            orientation='vertical'
            flexItem
            sx={{ borderRightWidth: '2px' }}
          />
        }
        sx={{
          my: 5,
          px: useStoryHorizontalPadding(),
          justifyContent: 'flex-end',
        }}
      >
        {getChips().map(({ icon, id, label, labelAlwaysVisible }) => (
          <InfoChip
            key={id}
            {...{
              icon,
              id,
              handleClick,
              label,
              labelAlwaysVisible,
              selectedChip,
            }}
          />
        ))}
      </Stack>
      <Popover
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...{ anchorEl }}
        sx={{
          mt: 0.5,
          '.MuiPopover-paper': {
            boxShadow: 'none',
            border: `2px solid ${palette.grey[200]}`,
          },
        }}
      >
        <Typography variant='subtitle2' sx={{ p: 1 }}>
          {popoverExplanation}
        </Typography>
      </Popover>
    </>
  )
}

function InfoChip({
  icon,
  id,
  handleClick,
  label,
  labelAlwaysVisible,
  selectedChip,
}: {
  icon: IconDefinition
  id: ChipId
  handleClick: (event: MouseEvent<HTMLButtonElement>, chipId: ChipId) => void
  label: string
  labelAlwaysVisible?: boolean
  selectedChip: ChipType | null
}) {
  const { breakpoints, palette } = useTheme()

  const hideLabel = useMediaQuery(breakpoints.down('sm')) && !labelAlwaysVisible

  const isSelected = selectedChip?.id === id

  return (
    <Chip
      component='button'
      icon={
        <FontAwesomeIcon
          transform='left-2.5'
          style={{
            color: isSelected
              ? palette.primary.contrastText
              : palette.grey[700],
          }}
          {...{ icon }}
        />
      }
      size='small'
      onClick={event => handleClick(event, id)}
      variant='outlined'
      sx={{
        backgroundColor: isSelected ? palette.primary.main : 'inherit',
        borderWidth: 0,
        borderRadius: 1,
        color: isSelected ? palette.primary.contrastText : palette.grey[700],
        p: 1,
        width: hideLabel ? '24px' : 'auto',
        '&:focus': {
          boxShadow: 'none',
        },
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: isSelected
            ? `${palette.primary.main} !important`
            : 'inherit',
        },
        '.MuiChip-label': {
          pr: 0,
          display: hideLabel ? 'none' : 'block',
        },
      }}
      {...{ label }}
    />
  )
}

function Subheading({ title }: { title: string }) {
  const { palette } = useTheme()
  return (
    <Box sx={{ px: useStoryHorizontalPadding(), color: palette.grey[500] }}>
      <Typography variant='h6'>{title}</Typography>
      <Divider sx={{ mb: 2, borderBottomWidth: '2px' }} />
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
