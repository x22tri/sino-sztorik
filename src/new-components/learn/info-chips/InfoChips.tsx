import { useTheme, Stack, Divider, useMediaQuery } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Character, ChipId, ChipIds, ChipType } from '../../shared/interfaces'
import { getFrequencyText } from '../getFrequencyText'
import InfoChip from './InfoChip'
import { INFO_CHIP_UNKNOWN_FREQUENCY_EXPLANATION } from '../../shared/strings'
import { chipConfig } from './chipConfig'
import { LearnPopover } from '../../shared/basic-components'

export default function InfoChips({ char }: { char: Character }) {
  const { breakpoints } = useTheme()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const [selectedChip, setSelectedChip] = useState<ChipType | null>(null)

  const chipsContent = getChips()

  function getChips() {
    return chipConfig
      .filter(({ id }) => id in char)
      .map(chip => {
        if (chip.id === ChipIds.FREQUENCY) {
          return {
            ...chip,
            ...replaceFrequencyPlaceholders(chip.explanation, char.frequency),
          }
        }

        return chip
      })
  }

  function selectChip(event: MouseEvent<HTMLButtonElement>, chipId: ChipId) {
    setAnchorEl(event.currentTarget)
    setSelectedChip(chipsContent.find(({ id }) => id === chipId)!)
  }

  function deselectChip() {
    setAnchorEl(null)
    setSelectedChip(null)
  }

  return (
    <>
      <Stack
        direction='row'
        divider={
          <Divider
            orientation='vertical'
            flexItem
            sx={{ borderRightWidth: '2px' }}
          />
        }
        gap={1}
        marginLeft={useMediaQuery(breakpoints.down('md')) ? 0 : 1}
        marginY={1}
      >
        {chipsContent.map(({ icon, id, label }) => (
          <InfoChip
            key={id}
            isSelected={selectedChip?.id === id}
            {...{
              icon,
              id,
              label,
              selectChip,
            }}
          />
        ))}
      </Stack>

      <LearnPopover
        {...{ anchorEl }}
        onClose={deselectChip}
        text={selectedChip?.explanation}
      />
    </>
  )
}

function replacePlaceholders(text: string, map: { [key: string]: string }) {
  for (const key in map) {
    text = text.replace(new RegExp('\\{' + key + '\\}', 'gm'), map[key])
  }

  return text
}

function replaceFrequencyPlaceholders(
  text: string,
  frequency: number | undefined
) {
  const frequencyText = getFrequencyText(frequency)

  if (frequency === undefined) {
    return {
      label: frequencyText,
      explanation: INFO_CHIP_UNKNOWN_FREQUENCY_EXPLANATION,
    }
  }

  const frequencyTextMap = {
    frequency: frequency.toString(),
    frequencyTextLowerCase: frequencyText.toLowerCase(),
  }

  return {
    label: frequencyText,
    explanation: replacePlaceholders(text, frequencyTextMap),
  }
}
