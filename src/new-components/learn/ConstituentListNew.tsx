import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { Constituent } from '../shared/interfaces'
import { KeywordPrimitiveRow } from '../shared/components/KeywordPrimitiveRow'
import { useStore } from '../shared/logic/useStore'

export function ConstituentListNew({ constituents }: { constituents: Constituent[] }) {
  const { startFlashback } = useStore('flashback')

  return (
    <List disablePadding>
      {constituents.map(({ charChinese, keyword, primitiveMeaning }, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton onClick={() => startFlashback(charChinese)} sx={{ borderRadius: 6, ':hover': { bgcolor: '#DDE8FF' } }}>
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
