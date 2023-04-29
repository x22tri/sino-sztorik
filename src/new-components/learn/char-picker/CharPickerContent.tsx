import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { useRef, useState } from 'react'
import { Character } from '../../shared/interfaces'
import { TitleSubtitle } from '../learn-appbar/TitleSubtitle'
import { LESSON_NUMBER_SUFFIX_APPBAR } from '../../shared/strings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { Else, If, Then } from 'react-if'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'

export function CharPickerContent({ lesson }: { lesson: Character[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const [content, setContent] = useState<'characters' | 'preface'>('characters')
  const { constants, palette, spacing, typography } = useTheme()
  const lessonNumber = 99
  const lessonTitle = 'Lecke címe'
  const preface = 'Teszt teszt teszt'

  return (
    <List
      ref={listRef}
      subheader={
        <Box
          alignItems='center'
          display='flex'
          justifyContent='space-between'
          minHeight={`${spacing(8)}`}
          paddingX={`${spacing(2)}`}
          borderBottom={`1px solid ${palette.grey[200]}`}
        >
          <TitleSubtitle title={lessonNumber + LESSON_NUMBER_SUFFIX_APPBAR} subtitle={lessonTitle} />
          <If condition={content === 'characters'}>
            <Then>
              <ToolbarButton icon={faNewspaper} onClick={() => setContent('preface')} tooltip='Előszó' />
            </Then>
            <Else>
              <ToolbarButton icon={faLanguage} onClick={() => setContent('characters')} tooltip='Karakterek' />
            </Else>
          </If>
        </Box>
      }
      sx={{
        bottom: 0,
        borderRight: `1px solid ${palette.grey[200]}`,
        left: 0,
        gridArea: 'drawer',
        overflow: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        width: constants.drawerWidth,
      }}
    >
      <If condition={content === 'characters'}>
        <Then>
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
        </Then>
        <Else>
          <Box padding={2}>{preface}</Box>
        </Else>
      </If>
    </List>
  )
}
