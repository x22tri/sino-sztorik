import {
  Dispatch,
  ElementType,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
} from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Card, { CardProps } from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import WestIcon from '@mui/icons-material/West'
import SwiperInstance, { Keyboard } from 'swiper'
// import Swiper as SwiperInstance from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

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

export function LightenOnHoverButton<B extends ElementType>(
  props: ButtonProps<B, { component?: B }>
) {
  const { palette } = useTheme()

  return (
    <Button
      {...props}
      sx={{
        color: palette.grey[600],
        pb: 0,
        borderRadius: 0,
        borderBottom: '2px solid transparent',
        '&:hover': {
          backgroundColor: 'inherit',
          filter: 'brightness(1.3)',
        },
        '&:focus': {
          borderBottom: '2px solid', // The border will take the text's color.
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
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
      sx={{ ml: 1.5 }}
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
  const { palette } = useTheme()

  return (
    <Card
      {...props}
      sx={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: palette.grey[200],
        borderRadius: '16px',
        backgroundColor: palette.background.paper,
        boxShadow: `3px 5px ${palette.grey[400]}`,
        p: 2,
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
  setSwiperInstance,
}: {
  initialSlide?: number
  children: ReactNode
  setSwiperInstance?: Dispatch<SetStateAction<SwiperInstance | null>>
}) {
  return (
    <Swiper
      centeredSlides={true}
      keyboard={true}
      modules={[Keyboard]}
      onTouchStart={swiper => swiper.setGrabCursor()}
      onTouchEnd={swiper => swiper.unsetGrabCursor()}
      onSwiper={swiper => (setSwiperInstance ? setSwiperInstance(swiper) : {})}
      slidesPerView={1}
      spaceBetween={10}
      {...{ initialSlide }}
    >
      {children}
    </Swiper>
  )
}

export function CardSwiperContent({
  children,
  noArrows,
}: {
  children: ReactNode
  noArrows?: boolean
}) {
  const { palette } = useTheme()

  return (
    <SwiperSlide>
      <Box position='relative'>
        {noArrows ? null : (
          <ArrowLeftIcon
            sx={{
              position: 'absolute',
              top: '50%',
              left: '-3px',
              transform: 'translateY(-50%)',
              color: palette.grey[400],
            }}
          />
        )}

        {children}

        {noArrows ? null : (
          <ArrowRightIcon
            sx={{
              position: 'absolute',
              top: '50%',
              right: '-3px',
              transform: 'translateY(-50%)',
              color: palette.grey[400],
            }}
          />
        )}
      </Box>
    </SwiperSlide>
  )
}
