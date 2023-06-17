import { TextField, TextFieldProps, lighten, useTheme } from '@mui/material'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'
import { X, mergePreviousTiers } from './AdminContent'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { DiffedCharacterEntry, DiffInfoTier } from '../../shared/logic/loadAdminChar'

/*

To-Do:
if new info: add colored BG to text field, add field name to newInfo, add value as defaultValue if present
if modified info: add colored BG to text field, add field name to modifiedInfo, add value as defaultValue if present
if previous info: disable text field and make BG white, add pen endAdornment that lets you edit it

*/

export function AdminTextField({ label, name, ...restProps }: TextFieldProps & { name: string }) {
  const { palette } = useTheme()
  const isModifiedInfo = name === 'frequency'
  const { character, diffInfos } = useLoaderData() as { character: DiffedCharacterEntry; diffInfos: DiffInfoTier[] }
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTier = Number(searchParams.get('tier'))

  const prevTiers = mergePreviousTiers(character, activeTier - 1)

  const methods = useFormContext()

  function hasChangedSinceLastTier(key: keyof X) {
    return prevTiers[key] === methods.getValues(key)
  }

  return (
    <TextFieldElement
      disabled={hasChangedSinceLastTier(name as keyof X)}
      fullWidth
      id={name}
      InputLabelProps={{ shrink: true }}
      size='small'
      variant='filled'
      {...restProps}
      {...{ label, name }}
      sx={{
        '.MuiFilledInput-root': {
          bgcolor: isModifiedInfo ? lighten(palette.warning.main, 0.8) : undefined,
          ':hover': { bgcolor: isModifiedInfo ? lighten(palette.warning.main, 0.7) : undefined },
        },
        ...restProps.sx,
      }}
      // validation={}
      // onBlur={e => console.log(e)}
    />
  )
}
