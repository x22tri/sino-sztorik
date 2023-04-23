import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Character } from '../shared/interfaces'
import { When } from 'react-if'

export function ConstituentListNew({ constituents }: { constituents: Partial<Character>[] }) {
  const { spacing } = useTheme()
  return (
    <List disablePadding>
      {constituents.map(({ charChinese, keyword, primitiveMeaning }, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton sx={{ ':hover': { bgcolor: '#DDE8FF' } }}>
            <ListItemIcon>
              <Typography variant='chineseNormal' color='#3366CC'>
                {charChinese}
              </Typography>
            </ListItemIcon>
            <ListItemText
              sx={{ '.MuiListItemText-primary': { alignItems: 'baseline', display: 'flex', flexDirection: 'row', gap: 1.5 } }}
            >
              <When condition={keyword}>
                <Typography component='span' fontWeight='bold'>
                  {keyword}
                </Typography>
              </When>

              <When condition={keyword && primitiveMeaning}>
                <Divider orientation='vertical' flexItem />
              </When>

              <When condition={primitiveMeaning}>
                <Typography component='span' fontStyle='italic'>
                  <FontAwesomeIcon
                    icon={faCube}
                    color='#3366CC'
                    size='xs'
                    style={{ marginBottom: '2px', marginRight: spacing(0.75), verticalAlign: 'middle' }}
                  />
                  {primitiveMeaning}
                </Typography>
              </When>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
