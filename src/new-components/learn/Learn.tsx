import { Dispatch, SetStateAction, MouseEvent, useState } from 'react'
import {
  Badge,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import Box from '@mui/material/Box'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  BackButton,
  ContentContainer,
} from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import {
  BACK_TO_LESSON_FROM_FLASHBACK,
  BOTTOM_NAVIGATION_FREQUENCY,
  BOTTOM_NAVIGATION_NEXT_CHARACTER,
  BOTTOM_NAVIGATION_PREVIOUS_CHARACTER,
  BOTTOM_NAVIGATION_SUPPLEMENTS,
} from '../shared/strings'
import { CHARS } from './MOCK_CHARS'
import Swiper from 'swiper'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnCharCardDetails from './LearnCharCardDetails'
import { LearnAppbar } from '../toolbar/AppbarWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faChartColumn,
  faChevronCircleLeft,
  faChevronLeft,
  faGraduationCap,
  faSquare,
  faSquareCaretLeft,
  faSquareCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import { BottomNavigationButton } from './BottomNavigationButton'
import { getFrequencyText } from './getFrequencyText'

export default function Learn() {
  const { constants, palette } = useTheme()

  const lessonDataSource = CHARS

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null) // Outside of Swiper, useSwiper() can't be used.

  const [activeIndex, setActiveIndex] = useState(1)

  const currentChar = lessonDataSource[activeIndex]

  function returnFromFlashback() {
    setCharToReturnToFromFlashback(null)
    swiperInstance!.enable()
  }

  function moveToPreviousCharacter() {
    setActiveIndex(prev => prev - 1)
    window.scrollTo(0, 0)
  }

  function moveToNextCharacter() {
    setActiveIndex(prev => prev + 1)
    window.scrollTo(0, 0)
  }

  function switchToSupplementsView() {}

  function openFrequencyPopup(frequency: number | undefined) {
    console.log(getFrequencyText(frequency))
  }

  return (
    <>
      <LearnAppbar
        lessonLength={CHARS.length}
        isLocked={!!charToReturnToFromFlashback}
        {...{ activeIndex }}
      />
      <ContentContainer>
        <Box
          maxWidth={constants.maxContentWidth}
          height='100%'
          position='relative'
          margin='auto'
        >
          {/* <Box sx={{ minHeight: constants.backButtonStripHeight }}>
            {charToReturnToFromFlashback !== null ? (
              <BackButton
                onClick={() => returnFromFlashback()}
                text={`${BACK_TO_LESSON_FROM_FLASHBACK} 
              (${charToReturnToFromFlashback!.charChinese})
              `}
              />
            ) : null}
          </Box> */}

          {/* <LearnCharCardSwiper
            chars={lessonDataSource}
            {...{
              charToReturnToFromFlashback,
              setCharToReturnToFromFlashback,
              swiperInstance,
              setSwiperInstance,
              setActiveIndex,
            }}
          /> */}
          {/* {lessonDataSource.map(char => ( */}
          <LearnCharCardDetails
            lessonChar={currentChar}
            isActiveSlide={true}
            {...{
              charToReturnToFromFlashback,
              setCharToReturnToFromFlashback,
            }}
          />
          {/* ))} */}

          <Drawer
            anchor='bottom'
            open={true}
            variant='permanent'
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              mx: 'auto',
              mt: 7, // Needed so that the drawer doesn't cover the bottom of the content.
              '.MuiPaper-root': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
              },
            }}
          >
            <Box
              maxWidth={constants.maxContentWidth}
              display='flex'
              width='100%'
              justifyContent='space-between'
              alignItems='center'
              sx={{ px: 2 }}
            >
              <BottomNavigationButton
                disabled={activeIndex === 0}
                icon={faSquareCaretLeft}
                onClick={moveToPreviousCharacter}
                tooltipText={BOTTOM_NAVIGATION_PREVIOUS_CHARACTER}
              />

              <BottomNavigationButton
                bottomText={String(currentChar.frequency)}
                icon={faChartColumn}
                onClick={() => openFrequencyPopup(currentChar.frequency)}
                tooltipText={BOTTOM_NAVIGATION_FREQUENCY}
              />

              <BottomNavigationButton
                badgeContent={getTotalSupplementAmount(currentChar)}
                icon={faGraduationCap}
                onClick={switchToSupplementsView}
                tooltipText={BOTTOM_NAVIGATION_SUPPLEMENTS}
              />

              <BottomNavigationButton
                disabled={activeIndex === lessonDataSource.length - 1}
                icon={faSquareCaretRight}
                onClick={moveToNextCharacter}
                tooltipText={BOTTOM_NAVIGATION_NEXT_CHARACTER}
              />
            </Box>
          </Drawer>
        </Box>
      </ContentContainer>
    </>
  )
}

function getTotalSupplementAmount(char: Character) {
  return char.otherUses?.length
}

// function LearnCharCardSwiper({
//   chars,
//   charToReturnToFromFlashback,
//   setCharToReturnToFromFlashback,
//   setSwiperInstance,
//   setActiveIndex,
// }: {
//   chars: Character[]
//   charToReturnToFromFlashback: Character | null
//   setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
//   setSwiperInstance: Dispatch<SetStateAction<Swiper | null>>
//   setActiveIndex: Dispatch<SetStateAction<number>>
// }) {
//   return (
//     <CardSwiperWrapper
//       noArrows={charToReturnToFromFlashback !== null}
//       {...{ setSwiperInstance, setActiveIndex }}
//     >
//       {chars.map(char => (
//         <SwiperSlide key={char.id}>
//           {({ isActive }) => (
//             <CardSwiperContent>
//               <LearnCharCardDetails
//                 lessonChar={char}
//                 isActiveSlide={isActive}
//                 {...{
//                   charToReturnToFromFlashback,
//                   setCharToReturnToFromFlashback,
//                 }}
//               />
//             </CardSwiperContent>
//           )}
//         </SwiperSlide>
//       ))}
//     </CardSwiperWrapper>
//   )
// }
