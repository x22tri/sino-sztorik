import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { ChineseCharLink } from './chinese-char-link/ChineseCharLink'
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
              primary={
                <Box display='flex' flexDirection='row' alignItems='baseline' gap={1.5}>
                  <When condition={keyword}>
                    <Typography fontWeight='bold'>{keyword}</Typography>
                  </When>

                  <When condition={keyword && primitiveMeaning}>
                    <Divider orientation='vertical' flexItem />
                  </When>

                  <When condition={primitiveMeaning}>
                    <Typography fontStyle='italic'>
                      <FontAwesomeIcon
                        icon={faCube}
                        color='#3366CC'
                        size='xs'
                        style={{ marginBottom: '2px', marginRight: spacing(0.75), verticalAlign: 'middle' }}
                      />
                      {primitiveMeaning}
                    </Typography>
                  </When>
                </Box>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
