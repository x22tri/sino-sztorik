import { faCube, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, InputAdornment, useTheme } from '@mui/material'
import { Subheading } from '../../../learn/headings/Subheading'
import { useState } from 'react'
import ToolbarButton from '../../../shared/components/ToolbarButton'
import { AdminTextField } from '../AdminTextField'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { DiffedCharacterEntry, DiffedCharacterEntryVariant, DiffInfoTier } from '../../../shared/logic/loadAdminChar'

export function CharacterSection() {
  const { palette } = useTheme()
  const [isProductivePinyin, toggleProductivePinyin] = useState(false)
  const { character, diffInfos } = useLoaderData() as { character: DiffedCharacterEntry; diffInfos: DiffInfoTier[] }
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTier = Number(searchParams.get('tier'))

  const variant = character.variants[activeTier - 1]

  function getDiffedChar(tierToStopAt: number) {}

  function getDiffedStatuses(tierToStopAt: number) {
    const x = character.variants.slice(0, tierToStopAt)

    return x
  }

  console.log(getDiffedStatuses(activeTier))

  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Subheading title='Karakter' />
      <AdminTextField label='Kulcsszó' name='keyword' sx={{ '.MuiInputBase-input': { fontWeight: 'bold' } }} />

      <AdminTextField
        color='secondary'
        // disabled
        defaultValue={variant.primitive}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <FontAwesomeIcon color={palette.secondary.main} icon={faCube} />
            </InputAdornment>
          ),
        }}
        label='Alapelemként'
        name='primitive'
        sx={{ '.MuiInputBase-input': { fontStyle: 'italic' } }}
      />

      <Box alignItems='center' display='flex' flexDirection='row' gap={2}>
        <AdminTextField
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <ToolbarButton
                  color={isProductivePinyin ? 'primary' : 'inherit'}
                  icon={faVolumeHigh}
                  onClick={() => toggleProductivePinyin(prev => !prev)}
                  size='small'
                  tooltip='Produktív fonetikai elem?'
                  sx={{ opacity: isProductivePinyin ? 1 : 0.3 }}
                ></ToolbarButton>
              </InputAdornment>
            ),
          }}
          label='Kiejtés'
          name='pinyin'
          sx={{ '.MuiInputBase-input': { textAlign: 'center', typography: 'pinyin' } }}
        />

        <AdminTextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label='Gyakoriság' name='frequency' />
      </Box>
    </Box>
  )
}
