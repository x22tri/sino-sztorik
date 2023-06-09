import { Box, useTheme } from '@mui/material'
import { SideNav } from './SideNav'
import { Swiper, SwiperProps } from 'swiper/react'
import { useStore } from '../logic/useStore'
import { UseKeydownAction } from '../interfaces'
import { useKeydown } from '../hooks/useKeydown'
import { scrollToTop } from '../utility-functions'
import { ReactNode } from 'react'

export function SwiperGrid({
  children,
  sideNav,
  swiperProps,
}: {
  children: ReactNode
  sideNav: { content: JSX.Element; selected: number; title: JSX.Element }
  swiperProps: SwiperProps
}) {
  const { setSwiperInstance, swiperInstance } = useStore('swiper')

  useKeydown([
    { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
    { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
  ])

  return (
    <Box
      display='grid'
      position='relative'
      margin='auto'
      sx={{
        maxWidth: ({ constants }) => constants.maxContentWidth,
        gridTemplate: ({ constants }) => ({ xs: `"main" / auto`, md: `"drawer main" / ${constants.drawerWidth}px auto` }),
      }}
    >
      <SideNav content={sideNav.content} title={sideNav.title} selected={sideNav.selected} />

      <Swiper
        autoHeight
        effect='slide'
        onSlideChangeTransitionEnd={scrollToTop}
        onSwiper={swiper => setSwiperInstance(swiper)}
        simulateTouch={false}
        spaceBetween={0}
        {...swiperProps}
      >
        {children}
      </Swiper>
    </Box>
  )
}
