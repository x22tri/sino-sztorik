import {
  Dispatch,
  ElementType,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Card, { CardProps } from '@mui/material/Card'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import WestIcon from '@mui/icons-material/West'
import SwiperInstance, { Keyboard } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  IconDefinition,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function MajorActionButton({ text }: { text: string }) {
  const { palette } = useTheme()

  return (
    <Button
      variant='contained'
      color='secondary'
      sx={{
        border: '2px solid transparent',
        borderRadius: '0 8px',
        boxShadow: 'none',
        '&:hover': {
          border: `2px solid ${palette.secondary.dark}`,
          boxShadow: 'none',
        },
      }}
    >
      {text}
    </Button>
  )
}

export function MinorActionButton({ text }: { text: string }) {
  return (
    <Button
      variant='outlined'
      color='primary'
      sx={{
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px',
        },
      }}
    >
      {text}
    </Button>
  )
}

interface LightenOnHoverButtonProps {
  icon?: IconDefinition
}

export function LightenOnHoverButton<B extends ElementType>(
  props: ButtonProps<B, { component?: B }>
) {
  const { constants } = useTheme()

  return (
    <Button
      {...props}
      sx={{
        transition: `${constants.animationDuration}ms`,
        // color: palette.grey[600],
        // pb: 0,
        // borderRadius: 0,
        // borderBottom: '2px solid transparent',
        '&:hover': {
          backgroundColor: 'inherit',
          filter: 'brightness(1.3)',
        },
        '&:focus': {
          filter: 'brightness(1.3)',
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  )
}

export function LearnActionButton({
  color,
  icon,
  label,
}: {
  color?: 'primary' | 'secondary' | 'neutral'
  icon: IconDefinition
  label: string
}) {
  return (
    <LightenOnHoverButton
      size='small'
      startIcon={<FontAwesomeIcon {...{ icon }} />}
      {...{ color }}
    >
      {label}
    </LightenOnHoverButton>
  )
}

export function BackButton({
  onClick,
  text,
}: {
  onClick: (event: MouseEvent<HTMLElement>) => void
  text: string
}) {
  return (
    <LightenOnHoverButton
      {...{ onClick }}
      startIcon={<WestIcon fontSize='small' />}
    >
      <Typography component='span' textTransform='none'>
        {text}
      </Typography>
    </LightenOnHoverButton>
  )
}

export function RoundedCard<C extends ElementType>(
  props: CardProps<C, { component?: C }>
) {
  const { palette, constants } = useTheme()

  return (
    <Card
      {...props}
      sx={{
        transition: `border ${constants.animationDuration * 2}ms ease-out`,
        borderWidth: '10px 0 0',
        // borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: palette.grey[200],
        // borderRadius: '16px',
        backgroundColor: palette.background.paper,
        boxShadow: 'none',
        // boxShadow: `3px 5px ${palette.grey[400]}`,
        p: 2,
        // height: '100%',
        // overflowY: 'auto',
        ...props.sx,
      }}
    >
      {props.children}
    </Card>
  )
}

export function CardSwiperWrapper({
  initialSlide = 0,
  children,
  noArrows,
  setSwiperInstance,
  setActiveIndex,
}: {
  initialSlide?: number
  children: ReactNode
  noArrows?: boolean
  setSwiperInstance?: Dispatch<SetStateAction<SwiperInstance | null>>
  setActiveIndex?: Dispatch<SetStateAction<number>>
}) {
  const { constants, palette } = useTheme()

  const [grabbed, setGrabbed] = useState(false)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  return (
    <>
      {grabbed || isBeginning || noArrows ? null : (
        <ArrowLeftIcon
          sx={{
            position: 'absolute',
            top: '50%',
            left: '-20px',
            transform: 'translateY(-50%)',
            color: palette.grey[400],
          }}
        />
      )}

      <Swiper
        centeredSlides={true}
        keyboard={true}
        modules={[Keyboard]}
        onTouchStart={swiper => {
          setGrabbed(true)
          swiper.setGrabCursor()
        }}
        onTouchEnd={swiper => {
          setGrabbed(false)
          swiper.unsetGrabCursor()
        }}
        onSwiper={swiper =>
          setSwiperInstance ? setSwiperInstance(swiper) : {}
        }
        onActiveIndexChange={({ activeIndex, isBeginning, isEnd }) => {
          setActiveIndex && setActiveIndex(activeIndex)
          setIsBeginning(isBeginning)
          setIsEnd(isEnd)
        }}
        slidesPerView={1}
        spaceBetween={10}
        {...{ initialSlide }}
        style={{ height: `calc(100% - ${constants.backButtonStripHeight})` }}
      >
        {children}
      </Swiper>

      {grabbed || isEnd || noArrows ? null : (
        <ArrowRightIcon
          sx={{
            position: 'absolute',
            top: '50%',
            right: '-20px',
            transform: 'translateY(-50%)',
            color: palette.grey[400],
          }}
        />
      )}
    </>
  )
}

export function CardSwiperContent({ children }: { children: ReactNode }) {
  return (
    <SwiperSlide
    // style={{ height: '100%' }}
    >
      <Box
        sx={{
          mb: 1,
          // height: '100%'
        }}
      >
        {children}
      </Box>
    </SwiperSlide>
  )
}

export function ContentContainer({ children }: { children: ReactNode }) {
  const { constants } = useTheme()

  return (
    <Container
      component='main'
      maxWidth='lg'
      sx={{
        display: 'flex',
        position: 'relative',
        // // justifyContent: 'space-between',
        // height: `calc(100% - ${constants.toolbarHeight})`,
      }}
    >
      {children}
    </Container>
  )
}

function Scrollable({ children }: { children: ReactNode }) {
  return (
    <Box display='flex' minWidth={0} sx={{ overflowY: 'scroll' }}>
      {children}
    </Box>
  )
}
