import { Typography } from '@mui/material'
import { FLASHBACK_MODE, FLASHBACK_MODE_EXPLANATION } from '../../shared/strings'
import { MouseEvent, TouchEvent, useState } from 'react'
import { LearnPopover } from '../../shared/components/LearnPopover'

export function FlashbackModeTitle() {
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null)

  function openPopover(event: MouseEvent<HTMLSpanElement> | TouchEvent<HTMLSpanElement>) {
    setAnchorEl(event.currentTarget)
  }

  function closePopover() {
    setAnchorEl(null)
  }

  return (
    <>
      <Typography
        alignSelf='center'
        color='text.disabled'
        justifySelf='center'
        variant='h6'
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
        sx={{ textDecoration: `2px dotted underline`, textUnderlineOffset: '2px', '&:hover': { cursor: 'pointer' } }}
      >
        {FLASHBACK_MODE}
      </Typography>

      <LearnPopover hover text={FLASHBACK_MODE_EXPLANATION} {...{ anchorEl }} />
    </>
  )
}
