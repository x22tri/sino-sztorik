import { Box, useTheme } from '@mui/material'
import { demoContent } from './demoContent'
import { Fragment, useEffect, useState } from 'react'
import { ChildOrParent } from './ChildOrParent'
import { DemoedChar } from './DemoedChar'
import Xarrow, { useXarrow } from 'react-xarrows'

export function ConstituentsDemo() {
  const [demoed, setDemoed] = useState(demoContent[1])
  const { palette } = useTheme()
  const updateXarrow = useXarrow()

  useEffect(() => {
    updateXarrow()
  }, [demoed])

  function onLinkClick(referencedChar: string) {
    setDemoed(demoContent.find(({ charChinese }) => charChinese === referencedChar)!)
  }

  return (
    <>
      <Box display='flex' justifyContent='space-around'>
        {demoed.parents?.map((char, index) => (
          <Fragment key={index}>
            <ChildOrParent id={`parent-${index}`} {...{ char, onLinkClick }} />
            <Xarrow start={`parent-${index}`} end='demoed' strokeWidth={3} color={palette.primary[300]} />
          </Fragment>
        ))}
      </Box>

      <Box id='demoed' height='max-content'>
        <DemoedChar char={demoed} {...{ onLinkClick }} />
      </Box>

      <Box display='flex' justifyContent='space-around'>
        {demoed.children?.map((char, index) => (
          <Fragment key={index}>
            <ChildOrParent id={`child-${index}`} {...{ char, onLinkClick }} />
            <Xarrow start='demoed' end={`child-${index}`} strokeWidth={3} color={palette.primary[300]} />
          </Fragment>
        ))}
      </Box>
    </>
  )
}
