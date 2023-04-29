import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { useRef, useState } from 'react'
import { Character } from '../../shared/interfaces'
import { Else, If, Then } from 'react-if'
import { useLearn } from '../logic/useLearn'
import { useSwiperInstance } from '../../shared/state'
import { CharPickerTitle } from './CharPickerTitle'

export function CharPickerContent() {
  const listRef = useRef<HTMLUListElement>(null)
  const [content, setContent] = useState<'characters' | 'preface'>('characters')
  const { swiperInstance } = useSwiperInstance()
  const { constants, palette, spacing, typography } = useTheme()
  const { lesson, select, selected, toggle } = useLearn()
  const lessonNumber = 99
  const lessonTitle = 'Lecke címe'
  const preface = 'Teszt teszt teszt'

  function selectChar(index: number) {
    swiperInstance?.slideTo(index)
    select(index)
    toggle()
  }

  return (
    <List
      ref={listRef}
      subheader={
        <CharPickerTitle
          {...{
            content,
            lessonNumber,
            lessonTitle,
            setContent,
          }}
        />
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
          {lesson.map(({ charChinese, keyword }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => selectChar(index)}
                selected={selected === index}
                sx={{
                  borderRadius: 6,
                  color: 'text.secondary',
                  height: spacing(6),
                  m: 1,
                  transition: constants.animationDuration,
                  '&.Mui-selected': {
                    color: 'text.primary',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'text.disabled',
                    justifyContent: 'end',
                    mr: 1,
                    mb: spacing(0.75),
                    minWidth: spacing(3),
                    typography: 'chineseNormal',
                    fontWeight: 500,
                    fontSize: '100%',
                  }}
                >
                  {charChinese}
                </ListItemIcon>

                <ListItemText
                  primary={keyword}
                  sx={{
                    '.MuiListItemText-primary': { ...typography.titleSubtitle.title, fontSize: '90%' },
                  }}
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
