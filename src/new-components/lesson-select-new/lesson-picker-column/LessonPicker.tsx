import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from '@mui/material'
import { TierStatusCircle } from '../../lesson-select/tier-status-circle/TierStatusCircle'
import { LESSONS } from '../../shared/MOCK_LESSONS'
import { useSmallScreen } from '../../shared/utility-functions'

export default function LessonPicker({
  mobileOpen,
  toggleDrawer,
}: {
  mobileOpen: boolean
  toggleDrawer: () => void
}) {
  const { constants } = useTheme()
  const isSmallScreen = useSmallScreen()

  return (
    <>
      <Drawer
        ModalProps={{ keepMounted: true }}
        open={mobileOpen}
        onClose={toggleDrawer}
        variant='temporary'
        sx={{
          display: isSmallScreen ? 'block' : 'none',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: constants.drawerWidth,
          },
        }}
      >
        <SelectionDrawerContent />
      </Drawer>
      <Box
        display={isSmallScreen ? 'none' : 'block'}
        height='100vh'
        overflow='auto'
        width={constants.drawerWidth}
      >
        <SelectionDrawerContent />
      </Box>
    </>
  )
}

function SelectionDrawerContent() {
  const { palette, typography } = useTheme()
  const lessons = LESSONS

  return (
    <>
      <Toolbar />
      <Box>
        <List>
          {lessons.map(({ lessonNumber, tierStatuses }) => (
            <ListItem disablePadding disableGutters key={lessonNumber}>
              <ListItemButton
                sx={{
                  '.MuiListItemText-multiline': {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                }}
              >
                <ListItemIcon>
                  <TierStatusCircle {...{ lessonNumber, tierStatuses }} />
                </ListItemIcon>
                <ListItemText
                  primary='Lecke címe'
                  secondary='11 karakter'
                  sx={{
                    '.MuiListItemText-primary': {
                      ...typography.titleSubtitle.subtitle,
                      color: palette.text.secondary,
                    },
                    '.MuiListItemText-secondary': {
                      ...typography.titleSubtitle.title,
                      color: palette.text.disabled,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )
}
