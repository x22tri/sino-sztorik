// import { InputAdornment, TextField, TextFieldProps, lighten, useTheme } from '@mui/material'
// import { Controller, useFormContext } from 'react-hook-form-mui'
// import { useStore } from '../../shared/logic/useStore'
// import { faPen } from '@fortawesome/free-solid-svg-icons'
// import ToolbarButton from '../../shared/components/ToolbarButton'
// import { useEffect, useRef, useState } from 'react'
// import { When } from 'react-if'
import { TextFieldProps } from '@mui/material'
import { CharacterEntryV2 } from '../../shared/MOCK_DATABASE_ENTRIES'

// export function AdminTextField({ label, name, ...restProps }: TextFieldProps & { name: keyof CharacterEntryV2 }) {
//   const inputRef = useRef<HTMLInputElement>(null)
//   const [editedField, setEditedField] = useState<keyof CharacterEntryV2 | null>(null)
//   const { palette } = useTheme()
//   const { prevTiers } = useStore('adminChar')
//   const { getValues } = useFormContext()

//   const isFieldNew = !prevTiers?.[name] && getValues(name) && (prevTiers?.[name] ?? '') !== getValues(name)
//   const isFieldChanged = !!prevTiers?.[name] && (prevTiers?.[name] ?? '') !== getValues(name)
//   const isFieldDisabled = !isFieldNew && !isFieldChanged && !!prevTiers?.[name] && editedField !== name

//   const bgcolor = isFieldNew
//     ? lighten(palette.success.main, 0.8)
//     : isFieldChanged
//     ? lighten(palette.warning.main, 0.8)
//     : undefined

//   const hoverBgColor = isFieldNew
//     ? lighten(palette.success.main, 0.7)
//     : isFieldChanged
//     ? lighten(palette.warning.main, 0.7)
//     : undefined

//   useEffect(() => {
//     if (editedField && !isFieldDisabled) {
//       inputRef?.current?.focus()
//     }
//   }, [editedField, isFieldDisabled])

//   return (
//     <Controller
//       {...{ name }}
//       render={({ field: { value, onChange } }) => (
//         <TextField
//           disabled={isFieldDisabled}
//           fullWidth
//           id={name}
//           InputProps={{
//             endAdornment: (
//               <When condition={isFieldDisabled}>
//                 <InputAdornment position='end'>
//                   <ToolbarButton
//                     icon={faPen}
//                     onClick={() => setEditedField(name)}
//                     size='small'
//                     tooltip='Szerkesztés'
//                   ></ToolbarButton>
//                 </InputAdornment>
//               </When>
//             ),
//           }}
//           InputLabelProps={{ shrink: true }}
//           onBlur={() => setEditedField(null)}
//           onChange={event => onChange(name === 'frequency' && event.target.value ? +event.target.value : event.target.value)}
//           onClick={() => setEditedField(name)}
//           inputRef={inputRef}
//           size='small'
//           variant='filled'
//           {...restProps}
//           {...{ label, name, value }}
//           sx={{
//             flexShrink: 1,
//             '.MuiFilledInput-root': { bgcolor, ':hover': { bgcolor: hoverBgColor } },
//             '.Mui-disabled': { bgcolor: 'inherit', color: 'inherit' },
//             ...restProps.sx,
//           }}
//         />
//       )}
//     />
//   )
// }

export function AdminTextField({ label, name, ...restProps }: TextFieldProps & { name: keyof CharacterEntryV2 }) {
  return <></>
}
