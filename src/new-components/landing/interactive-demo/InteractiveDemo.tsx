import { Box } from '@mui/material'
import { demoContent } from './demoContent'
import { Fragment, useState } from 'react'
import { ChildOrParent } from './ChildOrParent'
import { DemoedChar } from './DemoedChar'

export function InteractiveDemo() {
  const [demoedCharChinese, setDemoedCharChinese] = useState('朋')
  const demoedChar = demoContent.find(({ charChinese }) => charChinese === demoedCharChinese)!

  return (
    <>
      <Box display='flex' justifyContent='space-around'>
        {demoedChar.parents?.map((char, index) => (
          <Fragment key={index}>
            <ChildOrParent {...{ char, setDemoedCharChinese }} />
          </Fragment>
        ))}
      </Box>

      <DemoedChar char={demoedChar} {...{ setDemoedCharChinese }} />

      <Box display='flex' justifyContent='space-around'>
        {demoedChar.children?.map((char, index) => (
          <ChildOrParent key={index} {...{ char, setDemoedCharChinese }} />
        ))}
      </Box>
    </>
  )
}
