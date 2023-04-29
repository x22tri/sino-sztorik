import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useRef } from 'react'
import { Character } from '../../shared/interfaces'

export function CharPickerContent({ lesson }: { lesson: Character[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const { constants, palette, spacing, typography } = useTheme()

  return (
    <List
      ref={listRef}
      subheader='99. lecke'
      sx={{
        // backgroundColor: palette.background.paper,
        bottom: 0,
        // borderRight: `1px solid ${palette.grey[200]}`,
        left: 0,
        gridArea: 'drawer',
        overflow: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        width: constants.drawerWidth,
      }}
    >
      {lesson.map((char, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <ListItemIcon>{char.charChinese}</ListItemIcon>

            <ListItemText
              primary={char.keyword}
              sx={{ '.MuiListItemText-primary': { ...typography.titleSubtitle.title, fontSize: '90%' } }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
