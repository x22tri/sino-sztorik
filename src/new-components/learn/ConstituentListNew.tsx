import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { Character } from '../shared/interfaces'
import { KeywordPrimitiveRow } from '../shared/components/KeywordPrimitiveRow'

export function ConstituentListNew({ constituents }: { constituents: Partial<Character>[] }) {
  return (
    <List disablePadding>
      {constituents.map(({ charChinese, keyword, primitiveMeaning }, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton sx={{ borderRadius: 6, ':hover': { bgcolor: '#DDE8FF' } }}>
            <ListItemIcon>
              <Typography variant='chineseNormal' color='#3366CC'>
                {charChinese}
              </Typography>
            </ListItemIcon>

            <KeywordPrimitiveRow {...{ keyword, primitiveMeaning }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
