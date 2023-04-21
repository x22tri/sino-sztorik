import { Box, Divider, Link, Stack } from '@mui/material'
import { ChineseCharLink } from './chinese-char-link/ChineseCharLink'

export function ConstituentListNew({ constituents }: { constituents: string[] }) {
  return (
    <Stack
      direction='row'
      display='flex'
      divider={<Divider orientation='vertical' flexItem />}
      justifyContent='center'
      spacing={2}
    >
      {constituents.map((char, index) => (
        <ChineseCharLink key={index} {...{ char }} />
      ))}
    </Stack>
  )
}
