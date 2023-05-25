import { Box, useTheme } from '@mui/material'
import { demoContent } from './demoContent'
import { Fragment, useEffect, useState } from 'react'
import { ChildOrParent } from './ChildOrParent'
import { DemoedChar } from './DemoedChar'
import Xarrow, { useXarrow } from 'react-xarrows'
import { useStore } from '../../shared/logic/useStore'

export function InteractiveDemo() {
  const { demoedCharChinese } = useStore('interactiveDemo')
  const { palette } = useTheme()
  const updateXarrow = useXarrow()

  useEffect(() => {
    updateXarrow()
  }, [demoedCharChinese])

  return (
    <>
      <Box display='flex' justifyContent='space-around'>
        {demoedCharChinese.parents?.map((char, index) => (
          <Fragment key={index}>
            <ChildOrParent id={`parent-${index}`} {...{ char }} />
            <Xarrow start={`parent-${index}`} end='demoed' strokeWidth={3} color={palette.primary[300]} />
          </Fragment>
        ))}
      </Box>

      <Box id='demoed' height='max-content'>
        <DemoedChar char={demoedCharChinese} />
      </Box>

      <Box display='flex' justifyContent='space-around'>
        {demoedCharChinese.children?.map((char, index) => (
          <Fragment key={index}>
            <ChildOrParent id={`child-${index}`} {...{ char }} />
            <Xarrow start='demoed' end={`child-${index}`} strokeWidth={3} color={palette.primary[300]} />
          </Fragment>
        ))}
      </Box>
    </>
  )
}
