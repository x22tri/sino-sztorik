import { Stack, Divider } from '@mui/material'
import { chipConfig } from './chipConfig'
import InfoChip from './InfoChip'
import { Character, ChipIds } from '../../shared/interfaces'
import { replaceFrequencyPlaceholders } from './replaceFrequencyPlaceholders'

export default function InfoChips(char: Partial<Character>) {
  const chipsContent = getChips()

  function getChips() {
    return chipConfig
      .filter(({ id }) => id in char && char[id] !== undefined)
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
        marginLeft={-1}
      >
        {chipsContent.map(chip => (
          <InfoChip
            key={chip.id}
            {...{
              chip,
            }}
          />
        ))}
      </Stack>
    </>
  )
}
