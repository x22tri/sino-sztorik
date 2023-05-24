import { Box } from '@mui/material'
import { demoContent } from './demoContent'
import { useState } from 'react'
import { ChildOrParent } from './ChildOrParent'
import { DemoedChar } from './DemoedChar'

export function InteractiveDemo() {
  const [demoedCharChinese, setDemoedCharChinese] = useState('朋')
  const demoedChar = demoContent.find(({ charChinese }) => charChinese === demoedCharChinese)!

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Box display='flex' justifyContent='space-evenly'>
        {demoedChar.parents?.map((char, index) => (
          <ChildOrParent key={index} {...{ char, setDemoedCharChinese }} />
        ))}
      </Box>

      <DemoedChar char={demoedChar} {...{ setDemoedCharChinese }} />

      <Box display='flex' justifyContent='space-evenly'>
        {demoedChar.children?.map((char, index) => (
          <ChildOrParent key={index} {...{ char, setDemoedCharChinese }} />
        ))}
      </Box>
    </Box>
  )
}
