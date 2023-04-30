import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Toolbar } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { useLessonSelect } from '../logic/useLessonSelect'
import LogoTitle from '../../shared/components/LogoTitle'
import ProfileMenu from './TopNav'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { LESSON_SELECT_TITLE } from '../../shared/strings'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

export function LessonSelectAppbar({
  setToolbarHeight,
  toolbarHeight,
}: {
  setToolbarHeight: Dispatch<SetStateAction<number>>
  toolbarHeight: number
}) {
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLDivElement | null>(null)
  const { toggle } = useLessonSelect()
  const resizeObserver = new ResizeObserver(handleToolbarResized)

  useEffect(() => {
    if (ref?.current) {
      resizeObserver.observe(ref?.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  })

  function handleToolbarResized() {
    if (ref?.current && ref?.current.offsetHeight !== toolbarHeight) {
      setToolbarHeight(ref?.current.offsetHeight)
    }
  }

  return (
    <AppBar color='inherit' elevation={0} position='relative' sx={{ gridArea: 'nav' }}>
      <Toolbar disableGutters {...{ ref }} sx={{ justifyContent: 'space-between', px: 2 }}>
        <When condition={isSmallScreen}>
          <ToolbarButton icon={faGraduationCap} onClick={toggle} tooltip={LESSON_SELECT_TITLE} />
        </When>

        <LogoTitle />

        <ProfileMenu />
      </Toolbar>
    </AppBar>
  )
}
