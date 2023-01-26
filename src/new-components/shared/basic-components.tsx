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
import Button from '@mui/material/Button'
import Card, { CardProps } from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import WestIcon from '@mui/icons-material/West'
import SwiperInstance, { EffectCreative, Keyboard } from 'swiper'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { LightenOnHoverButton } from '../shared-components/LightenOnHoverButton'
import { scrollToTop, useKeydown, useSmallScreen } from './utility-functions'
import { useSwiperInstance } from './state'

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
      sx={{ borderWidth: '2px', '&:hover': { borderWidth: '2px' } }}
    >
      {text}
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

export function LessonSwiper(props: SwiperProps) {
  const { swiperInstance, setSwiperInstance } = useSwiperInstance()

  useKeydown([
    { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
    { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
  ])

  return (
    <Swiper
      autoHeight
      creativeEffect={{
        prev: { opacity: 0, translate: ['-20%', 0, -1] },
        next: { opacity: 1, translate: ['100%', 0, 1] },
      }}
      effect={useSmallScreen() ? 'creative' : 'slide'}
      modules={[EffectCreative]}
      onSlideChange={scrollToTop}
      onSlideChangeTransitionEnd={scrollToTop}
      onSwiper={swiper => setSwiperInstance(swiper)}
      simulateTouch={false}
      spaceBetween={0}
      {...props}
    >
      {props.children}
    </Swiper>
  )
}
