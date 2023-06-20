import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuList, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { Blueprint } from '../Blueprint'
import { Subheading } from '../../learn/headings/Subheading'

const iconWidth = '12px'
const iconWidthSmall = '8px'

export function BlueprintSelect({
  blueprint,
  setBlueprint,
}: {
  blueprint: Blueprint
  setBlueprint: Dispatch<SetStateAction<Blueprint>>
}) {
  const { palette } = useTheme()

  const handleChange = (value: Blueprint) => {
    setBlueprint(value)
  }

  const blueprintStrings: Record<Blueprint, { string: string; icon: ReactNode }> = {
    KeywordOnly: {
      string: 'Csak kulcsszó',
      icon: <FontAwesomeIcon icon={faCircle} style={{ color: palette.primary.main, width: iconWidth }} />,
    },
    PrimitiveOnly: {
      string: 'Csak alapelem',
      icon: <FontAwesomeIcon icon={faCircle} style={{ color: palette.secondary.main, width: iconWidth }} />,
    },
    KeywordAndPrimitive: {
      string: 'Kulcsszó + alapelem együtt',
      icon: (
        <span className='fa-layers fa-fw' style={{ width: iconWidth }}>
          <FontAwesomeIcon
            icon={faCircle}
            rotation={270}
            style={{ clip: 'rect(0px, 14px, 9px, 0px)', color: palette.primary.main, width: iconWidth }}
          />
          <FontAwesomeIcon
            icon={faCircle}
            rotation={90}
            style={{ clip: 'rect(0px, 14px, 8px, 0px)', color: palette.secondary.main, width: iconWidth }}
          />
        </span>
      ),
    },
    DelayedKeyword: {
      string: 'Alapelem, majd kulcsszó',
      icon: (
        <span className='fa-fw' style={{ width: iconWidth }}>
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: palette.secondary.main, marginLeft: '-3px', marginRight: '1px', width: iconWidthSmall }}
          />
          <FontAwesomeIcon icon={faCircle} style={{ color: palette.primary.main, width: iconWidthSmall }} />
        </span>
      ),
    },
    DelayedPrimitive: {
      string: 'Kulcsszó, majd alapelem',
      icon: (
        <span className='fa-fw' style={{ width: iconWidth }}>
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: palette.primary.main, marginLeft: '-3px', marginRight: '1px', width: iconWidthSmall }}
          />
          <FontAwesomeIcon icon={faCircle} style={{ color: palette.secondary.main, width: iconWidthSmall }} />
        </span>
      ),
    },
    KeywordWithDelayedExposition: {
      string: 'Kulcsszó belengetve, majd kifejtve',
      icon: (
        <span className='fa-fw' style={{ width: iconWidth }}>
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: palette.primary[200], marginLeft: '-3px', marginRight: '1px', width: iconWidthSmall }}
          />
          <FontAwesomeIcon icon={faCircle} style={{ color: palette.primary.main, width: iconWidthSmall }} />
        </span>
      ),
    },
  }

  return (
    <Box display='flex' flexDirection='column' width={{ xs: 1, md: 0.7 }}>
      <Subheading title='Sémák' />
      {/* <FormControl variant='filled'>

        <InputLabel shrink>Séma</InputLabel>

        <Select
          displayEmpty
          value={blueprint}
          onChange={handleChange}
          MenuProps={{ sx: { '.MuiPaper-root': { borderTopLeftRadius: 0, borderTopRightRadius: 0 } } }}
        >
          {Object.entries(blueprintStrings).map(([value, { icon, string }]) => (
            <MenuItem key={value} {...{ value }}>
              {icon}
              <Typography display='inline-flex' marginLeft={1}>
                {string}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant='body2'>Magyarázat</Typography> */}
      <List>
        {Object.entries(blueprintStrings).map(([value, { icon, string }]) => (
          <ListItemButton
            key={value}
            onClick={() => handleChange(value as Blueprint)}
            selected={blueprint === value}
            {...{ value }}
            sx={{ borderRadius: ({ spacing }) => spacing(6) }}
          >
            <ListItemIcon sx={{ display: 'inline-block' }}>{icon}</ListItemIcon>

            <ListItemText primary={string} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
