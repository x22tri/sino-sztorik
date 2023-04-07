import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  useTheme,
} from '@mui/material'
import { TierStatusCircle } from '../../lesson-select/tier-status-circle/TierStatusCircle'
import { LESSONS } from '../../shared/MOCK_LESSONS'
import { useSmallScreen } from '../../shared/utility-functions'
import { Else, If, Then } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { LESSONS_SUBHEADING } from '../../shared/strings'

export default function LessonPicker({
  mobileOpen,
  toggleDrawer,
}: {
  mobileOpen: boolean
  toggleDrawer: () => void
}) {
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()

  return (
    <If condition={isSmallScreen}>
      <Then>
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={mobileOpen}
          onClose={toggleDrawer}
          variant='temporary'
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: constants.drawerWidth,
            },
          }}
        >
          <SelectionDrawerContent />
        </Drawer>
      </Then>
      <Else>
        <Box
          bottom={0}
          top={0}
          left={0}
          right={0}
          flexShrink={1}
          position='absolute'
          // maxHeight='100vh'
          // height='100%'
          // borderRight={`1px solid ${palette.grey[300]}`}
          overflow='auto'
          width={constants.drawerWidth}
          sx={{ backgroundColor: palette.background.paper }}
        >
          <SelectionDrawerContent />
        </Box>
      </Else>
    </If>
  )
}

function SelectionDrawerContent() {
  const { constants, palette, typography } = useTheme()
  const lessons = LESSONS

  return (
    <Box>
      <List
        subheader={
          <ListSubheader
            component='div'
            disableSticky
            sx={{
              alignItems: 'center',
              boxSizing: 'content-box',
              display: 'flex',
              height: constants.toolbarHeight,
              gap: 1,
              ml: 1.5,
            }}
          >
            <FontAwesomeIcon icon={faGraduationCap} size='lg' />
            {LESSONS_SUBHEADING}
          </ListSubheader>
        }
      >
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
  )
}
