import { useTheme, Stack, Divider, Popover, Typography } from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import { Character, ChipId, ChipIds, ChipType } from '../../shared/interfaces'
import { useStoryHorizontalPadding } from '../LearnCharCardDetails'
import { getFrequencyText } from '../getFrequencyText'
import InfoChip from './InfoChip'
import { INFO_CHIP_UNKNOWN_FREQUENCY_EXPLANATION } from '../../shared/strings'
import { chipConfig } from './chipConfig'

export default function InfoChips({ char }: { char: Character }) {
  const { palette } = useTheme()

  const storyHorizontalPadding = useStoryHorizontalPadding()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const [chipsContent, setChipsContent] = useState<ChipType[]>()

  const [selectedChip, setSelectedChip] = useState<ChipType | null>(null)

  const [popoverExplanation, setPopoverExplanation] = useState('')

  useEffect(() => {
    setChipsContent(getChips())
  }, [char])

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
    const foundChip = chipsContent!.find(({ id }) => id === chipId)!

    setSelectedChip(foundChip)
    setPopoverExplanation(foundChip.explanation)
  }

  function deselectChip() {
    setAnchorEl(null)
    setSelectedChip(null)
    // Popover explanation cannot be set to null here so as to not break the popover exit animation.
  }

  return !chipsContent ? null : (
    <>
      <Stack
        direction='row-reverse'
        divider={
          <Divider
            orientation='vertical'
            flexItem
            sx={{ borderRightWidth: '2px' }}
          />
        }
        marginY={5}
        gap={1}
        paddingX={storyHorizontalPadding}
      >
        {chipsContent.map(({ icon, id, label, labelAlwaysVisible }) => (
          <InfoChip
            key={id}
            {...{
              icon,
              id,
              label,
              labelAlwaysVisible,
              selectChip,
              selectedChip,
            }}
          />
        ))}
      </Stack>

      <Popover
        {...{ anchorEl }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={deselectChip}
        open={Boolean(anchorEl)}
        sx={{
          mt: 0.5,
          '.MuiPopover-paper': {
            boxShadow: 'none',
            border: `2px solid ${palette.grey[200]}`,
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography variant='subtitle2' padding={1}>
          {popoverExplanation}
        </Typography>
      </Popover>
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
