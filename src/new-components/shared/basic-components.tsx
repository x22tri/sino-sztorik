import { ElementType, MouseEvent } from 'react'
import { useTheme } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import WestIcon from '@mui/icons-material/West'
import { EffectCreative } from 'swiper'
import { Swiper, SwiperProps } from 'swiper/react'
import { LightenOnHoverButton } from '../shared-components/LightenOnHoverButton'
import { scrollToTop, useKeydown, useSmallScreen } from './utility-functions'
import { useSwiperInstance } from './state'
import { If, Then, Else } from 'react-if'

export function MajorActionButton<B extends ElementType>(
  props: ButtonProps<B, { component?: B; text: string; secondaryText?: string }>
) {
  const { palette } = useTheme()

  return (
    <Button
      {...props}
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
        display: 'flex',
        flexDirection: 'column',
        ...props.sx,
      }}
    >
      <If condition={props.secondaryText}>
        <Then>
          <Typography lineHeight={1} variant='button'>
            {props.text}
          </Typography>
          <Typography fontSize='75%' lineHeight={1} variant='caption'>
            {props.secondaryText}
          </Typography>
        </Then>
        <Else>{props.text}</Else>
      </If>
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

export function LessonSwiper(props: SwiperProps) {
  const { swiperInstance, setSwiperInstance } = useSwiperInstance()

  useKeydown([
    { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
    { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
  ])

  return (
    <Swiper
      // autoHeight
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
