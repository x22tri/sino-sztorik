import { useTheme, Stack, lighten } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Character, ChipId, ChipType } from '../../shared/interfaces'
import { InfoChip } from './InfoChip'
import { chipConfig } from './chipConfig'
import { Frequency } from '../frequency/Frequency'
import { LearnPopover } from '../../shared/components/LearnPopover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function InfoChips({ char }: { char: Character }) {
  const { palette } = useTheme()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const [selectedChip, setSelectedChip] = useState<ChipType | null>(null)

  const chipsContent = getChips()

  function getChips() {
    return chipConfig.filter(({ id }) => id in char)
  }

  function selectChip(event: MouseEvent<HTMLButtonElement>, chipId: ChipId) {
    setAnchorEl(event.currentTarget)
    setSelectedChip(chipsContent.find(({ id }) => id === chipId)!)
  }

  function deselectChip() {
    setAnchorEl(null)
  }

  return (
    <>
      <Stack direction='row' gap={1.5}>
        {char.frequency ? <Frequency frequency={char.frequency} /> : null}

        {chipsContent.map(({ icon, id, label }) => (
          <InfoChip
            icon={<FontAwesomeIcon {...{ icon }} />}
            onMouseEnter={(event: MouseEvent<HTMLButtonElement>) => selectChip(event, id)}
            onMouseLeave={deselectChip}
            key={id}
            {...{ id, label }}
            sx={{ '&:hover': { backgroundColor: lighten(palette.text.disabled, 0.7), cursor: 'help' } }}
          />
        ))}
      </Stack>

      <LearnPopover hover {...{ anchorEl }} text={selectedChip?.explanation} />
    </>
  )
}
