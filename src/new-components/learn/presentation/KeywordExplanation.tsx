import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { LearnPopover } from '../../shared/components/LearnPopover'
import { MouseEvent, TouchEvent, useState } from 'react'

export function KeywordExplanation({ explanation }: { explanation: string }) {
  const { palette } = useTheme()

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
        display='flex'
        component='span'
        position='absolute'
        right={0}
        top={0}
        color={palette.primary.light}
        sx={{
          transform: 'translate(85%)',
          '&:hover': {
            color: palette.primary.lightHovered,
            cursor: 'pointer',
          },
        }}
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
      >
        <FontAwesomeIcon size='xs' transform='shrink-7' icon={faQuestionCircle} />
      </Box>

      <LearnPopover hover text={explanation} {...{ anchorEl }} />
    </>
  )
}
