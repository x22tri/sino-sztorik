import { Box, useTheme } from '@mui/material'
import { SideNav } from './SideNav'
import { SwiperWrapper, SwiperWrapperProps } from './SwiperWrapper'
import { Swiper, SwiperProps } from 'swiper/react'
import { useStore } from '../logic/useStore'
import { UseKeydownAction } from '../interfaces'
import { useKeydown } from '../hooks/useKeydown'
import { scrollToTop } from '../utility-functions'
import { ReactNode } from 'react'

export function SwiperGrid({
  children,
  keyboardControls,
  sideNav,
  swiperProps,
}: {
  children: ReactNode
  keyboardControls: UseKeydownAction[]
  sideNav: { content: JSX.Element; selected: number; title: JSX.Element }
  swiperProps: SwiperProps
}) {
  const { setSwiperInstance } = useStore('swiper')
  const { constants } = useTheme()

  useKeydown(keyboardControls)

  return (
    <Box
      display='grid'
      position='relative'
      margin='auto'
      maxWidth={constants.maxContentWidth}
      sx={{ gridTemplate: { xs: `"main" / auto`, md: `"drawer main" / ${constants.drawerWidth}px auto` } }}
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
