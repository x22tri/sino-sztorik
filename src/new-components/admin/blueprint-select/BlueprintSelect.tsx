import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ReactNode, useState } from 'react'
import { Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export enum Blueprint {
  KeywordOnly = 'KeywordOnly',
  PrimitiveOnly = 'PrimitiveOnly',
  KeywordAndPrimitive = 'KeywordAndPrimitive',
  DelayedKeyword = 'DelayedKeyword',
  DelayedPrimitive = 'DelayedPrimitive',
  KeywordWithDelayedExposition = 'KeywordWithDelayedExposition',
}

const iconWidth = '12px'
const iconWidthSmall = '8px'

export function BlueprintSelect() {
  const { palette } = useTheme()
  const [blueprint, setBlueprint] = useState(Blueprint.KeywordOnly)

  const handleChange = (event: SelectChangeEvent) => {
    setBlueprint(event.target.value as Blueprint)
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
            style={{ clip: 'rect(0px, 14px, 8px, 0px)', color: palette.primary.main, width: iconWidth }}
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
            style={{ color: palette.primary.light, marginLeft: '-3px', marginRight: '1px', width: iconWidthSmall }}
          />
          <FontAwesomeIcon icon={faCircle} style={{ color: palette.primary.main, width: iconWidthSmall }} />
        </span>
      ),
    },
  }

  return (
    <FormControl variant='filled' sx={{ mb: 6, minWidth: 120 }}>
      <InputLabel shrink>Séma</InputLabel>
      <Select displayEmpty value={blueprint} onChange={handleChange}>
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
  )
}
