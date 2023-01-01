import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Story from './story/Story'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import InfoChips from './info-chips/InfoChips'
import { Display } from '../shared/utility-components'
import { ConstituentList } from './ConstituentList'
import { Presentation } from './presentation/Presentation'
import { Subheading } from './subheading/Subheading'
import { StoryTypeSwitch } from './subheading/StoryTypeSwitch'
import { useSwiper } from 'swiper/react'
import { useSmallScreen } from '../shared/utility-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function LearnCharCardDetails({
  lessonChar,
  index,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
}: {
  lessonChar: Character
  index: number
  charToReturnToFromFlashback: Character | null
  setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
}) {
  const { palette } = useTheme()

  const swiper = useSwiper()

  const [charOverride, setCharOverride] = useState<Character | null>(null)

  const [isSupplementsOpen, setIsSupplementsOpen] = useState(false)

  useEffect(() => {
    if (charToReturnToFromFlashback === null) {
      setCharOverride(null)
    }
  }, [charToReturnToFromFlashback])

  function startFlashback(constituent: string) {
    const charToFlashbackTo = findCharToFlashbackTo(constituent)

    if (charToFlashbackTo === null) {
      console.log('Constituent not found.')
      return
    }

    setCharToReturnToFromFlashback(lessonChar)

    setCharOverride(charToFlashbackTo)
  }

  function findCharToFlashbackTo(constituent: string): Character | null {
    const charInLesson = CHARS.find(char => char.charChinese === constituent)

    if (charInLesson) {
      return charInLesson
    }

    // To-Do: if the char is not in the lesson, fetch it from the server.

    return null
  }

  function toggleSupplements() {
    setIsSupplementsOpen(prevState => !prevState)
    setTimeout(() => swiper.updateAutoHeight(100), 90)
  }

  const currentlyViewedChar = charOverride ?? lessonChar

  const {
    charChinese,
    constituents,
    explanation,
    frequency,
    keyword,
    newPrimitive,
    otherUses,
    pinyin,
    prequel,
    primitiveMeaning,
    productivePhonetic,
    reminder,
    story,
  } = currentlyViewedChar

  return (
    <Box
      border={`1px solid ${palette.grey[200]}`}
      borderRadius={2}
      marginBottom={1}
      minWidth={0}
      paddingX={useSmallScreen() ? 1 : 2}
      paddingY={1}
      sx={{ backgroundColor: palette.background.paper }}
    >
      <InfoChips
        {...{ frequency, newPrimitive, prequel, productivePhonetic, reminder }}
      />

      <Subheading title='Karakter' isFirst />

      <Presentation
        {...{ charChinese, explanation, keyword, pinyin, primitiveMeaning }}
      />

      <Display if={constituents}>
        <>
          <Subheading title='Összetétel' small />

          <ConstituentList
            constituents={constituents!}
            {...{ startFlashback }}
          />
        </>
      </Display>

      <Subheading title='Történet' endContent={<StoryTypeSwitch />} />

      <Story {...{ story }} />

      {/* <Accordion
        TransitionProps={{
          // unmountOnExit: true,
          onExited: () => swiper.updateAutoHeight(1),
        }}
        expanded={isSupplementsOpen}
        onClick={toggleSupplements}
      >
       <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
          sx={{ p: 0, '.MuiAccordionSummary-content': {} }}
        >
           <Typography
              variant='h6'
              fontWeight={700}
              fontSize={'90% !important'}
            >
              aa
            </Typography>
          aa
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>aa</AccordionDetails>
      </Accordion> */}

      <Subheading
        title='Kiegészítő információk'
        small
        endContent={
          <IconButton
            size='small'
            onClick={toggleSupplements}
            sx={{
              transition: ({ constants }) => `${constants.animationDuration}ms`,
              transform: isSupplementsOpen ? 'rotate(180deg)' : undefined,
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </IconButton>
        }
      />

      <Collapse in={isSupplementsOpen}>aa</Collapse>
    </Box>
  )
}
