import { useTheme, Stack, Divider, Popover, Typography } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Character, ChipId, ChipIds, ChipType } from '../../shared/interfaces'
import { useStoryHorizontalPadding } from '../useStoryHorizontalPadding'
import { getFrequencyText } from '../getFrequencyText'
import InfoChip from './InfoChip'
import { INFO_CHIP_UNKNOWN_FREQUENCY_EXPLANATION } from '../../shared/strings'
import { chipConfig } from './chipConfig'

export default function InfoChips({ char }: { char: Character }) {
  const { palette } = useTheme()

  const storyHorizontalPadding = useStoryHorizontalPadding()

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
        // marginY={1}
        gap={1}
        // sx={{ backgroundColor: palette.grey[100] }}
        paddingX={storyHorizontalPadding}
        // paddingX={1}
        marginY={1}
        // position='absolute'
        // right={0}
        // sx={{ float: 'right' }}
      >
        {chipsContent.map(({ icon, id, label, labelAlwaysVisible }) => (
          <InfoChip
            key={id}
            isSelected={selectedChip?.id === id}
            {...{
              icon,
              id,
              label,
              labelAlwaysVisible,
              selectChip,
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
        open={!!anchorEl}
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
          {selectedChip?.explanation}
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
