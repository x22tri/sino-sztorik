import Box from '@mui/material/Box'
import { Badge, SxProps } from '@mui/material'
import { Else, If, Then } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LearnPopover } from '../../shared/components/LearnPopover'
import { useState, MouseEvent, TouchEvent, ReactNode } from 'react'
import { Character } from '../../shared/interfaces'
import { SpotlightConfigKey, spotlightConfig } from './SpotlightConfig'

export function SpotlightWrapper({
  children,
  contentStyles,
  currentChar,
  spotlightIf,
}: {
  children: ReactNode
  contentStyles: SxProps
  currentChar: Character
  spotlightIf: SpotlightConfigKey
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const { icon, popoverText } = spotlightConfig[spotlightIf]

  function openPopover(event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget)
  }

  function closePopover() {
    setAnchorEl(null)
  }

  return (
    <If condition={!!currentChar[spotlightIf]}>
      <Then>
        <Badge badgeContent={<FontAwesomeIcon size='sm' {...{ icon }} />} color='primary' sx={{ '.MuiBadge-badge': { p: 0 } }}>
          <Box
            onMouseEnter={openPopover}
            onMouseLeave={closePopover}
            sx={{
              px: 1,
              transition: ({ constants }) => constants.animationDuration,
              ':hover': { bgcolor: 'primary.100', cursor: 'help' },
              ...contentStyles,
            }}
          >
            {children}
          </Box>
        </Badge>

        <LearnPopover hover text={popoverText} {...{ anchorEl }} />
      </Then>

      <Else>
        <Box sx={{ ...contentStyles }}>{children}</Box>
      </Else>
    </If>
  )
}
