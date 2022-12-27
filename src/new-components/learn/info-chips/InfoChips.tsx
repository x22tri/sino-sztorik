import {
  faCubesStacked,
  faBell,
  faVolumeDown,
  faClockRotateLeft,
  faChartColumn,
} from '@fortawesome/free-solid-svg-icons'
import { useTheme, Stack, Divider, Popover, Typography } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Character, ChipId, ChipIds, ChipType } from '../../shared/interfaces'
import { useStoryHorizontalPadding } from '../LearnCharCardDetails'
import { getFrequencyText } from '../getFrequencyText'
import InfoChip from './InfoChip'
import {
  INFO_CHIP_NEW_PRIMITIVE_LABEL,
  INFO_CHIP_PREQUEL_LABEL,
  INFO_CHIP_PRODUCTIVE_PINYIN_LABEL,
  INFO_CHIP_REMINDER_LABEL,
} from '../../shared/strings'

export default function InfoChips({ char }: { char: Character }) {
  const { palette } = useTheme()

  const { FREQUENCY, NEW_PRIMITIVE, PREQUEL, PRODUCTIVE_PINYIN, REMINDER } =
    ChipIds

  // The order of the chips matters.
  const chips: ChipType[] = [
    {
      id: NEW_PRIMITIVE,
      icon: faCubesStacked,
      label: INFO_CHIP_NEW_PRIMITIVE_LABEL,
      explanation: '',
    },
    {
      id: REMINDER,
      icon: faBell,
      label: INFO_CHIP_REMINDER_LABEL,
      explanation: '',
    },
    {
      id: PRODUCTIVE_PINYIN,
      icon: faVolumeDown,
      label: INFO_CHIP_PRODUCTIVE_PINYIN_LABEL,
      explanation: '',
    },
    {
      id: PREQUEL,
      icon: faClockRotateLeft,
      label: `${INFO_CHIP_PREQUEL_LABEL} []`,
      explanation: '',
    },
    {
      id: FREQUENCY,
      icon: faChartColumn,
      label: getFrequencyText(char.frequency),
      labelAlwaysVisible: true,
      explanation: `Ez a ${char.frequency}. 
      leggyakoribb írásjel a kínaiban, ezáltal 
      ${getFrequencyText(char.frequency).toLowerCase()} 
      karakternek számít.`,
    },
  ]

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [selectedChip, setSelectedChip] = useState<ChipType | null>(null)
  const [popoverExplanation, setPopoverExplanation] = useState('')

  function getChips() {
    // return chips.filter(({ id }) => id in char)
    return chips
  }

  function selectChip(event: MouseEvent<HTMLButtonElement>, chipId: ChipId) {
    setAnchorEl(event.currentTarget)
    const foundChip = chips.find(({ id }) => id === chipId)!

    setSelectedChip(foundChip)
    setPopoverExplanation(foundChip.explanation)
  }

  function deselectChip() {
    setAnchorEl(null)
    setSelectedChip(null)
    // Popover explanation cannot be set to null here so as to not break the popover exit animation.
  }

  return (
    <>
      <Stack
        direction='row'
        gap={1}
        divider={
          <Divider
            orientation='vertical'
            flexItem
            sx={{ borderRightWidth: '2px' }}
          />
        }
        marginY={5}
        paddingX={useStoryHorizontalPadding()}
        justifyContent='flex-end'
        // sx={{
        //   my: 5,
        //   px: useStoryHorizontalPadding(),
        //   justifyContent: 'flex-end',
        // }}
      >
        {getChips().map(({ icon, id, label, labelAlwaysVisible }) => (
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
        onClose={deselectChip}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...{ anchorEl }}
        sx={{
          mt: 0.5,
          '.MuiPopover-paper': {
            boxShadow: 'none',
            border: `2px solid ${palette.grey[200]}`,
          },
        }}
      >
        <Typography variant='subtitle2' sx={{ p: 1 }}>
          {popoverExplanation}
        </Typography>
      </Popover>
    </>
  )
}
