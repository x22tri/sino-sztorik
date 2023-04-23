import Box from '@mui/material/Box'
import { lighten, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LearnPopover } from '../../shared/components/LearnPopover'
import { MouseEvent, TouchEvent, useState } from 'react'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

export function KeywordExplanation({ explanation }: { explanation: string }) {
  const { constants, palette } = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null)

  function openPopover(event: MouseEvent<HTMLSpanElement> | TouchEvent<HTMLSpanElement>) {
    setAnchorEl(event.currentTarget)
  }

  function closePopover() {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        component='span'
        color='text.primary'
        marginLeft={0.5}
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
        position='absolute'
        sx={{
          transition: `${constants.animationDuration}ms`,
          '&:hover': { color: lighten(palette.text.primary, 0.3), cursor: 'pointer' },
        }}
      >
        <FontAwesomeIcon size='xs' transform='shrink-5' icon={faQuestionCircle} />
      </Box>

      <LearnPopover hover text={explanation} {...{ anchorEl }} />
    </>
  )
}
