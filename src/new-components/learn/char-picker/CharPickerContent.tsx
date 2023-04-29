import { Box, List, ListItem, ListItemButton, ListItemIcon, useTheme } from '@mui/material'
import { useRef, useState } from 'react'
import { Else, If, Then } from 'react-if'
import { useLearn } from '../logic/useLearn'
import { useSwiperInstance } from '../../shared/state'
import { CharPickerTitle } from './CharPickerTitle'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'
import { useWindowSize } from '../../shared/hooks/useWindowSize'
import { useOnChange } from '../../shared/hooks/useOnChange'

const itemHeight = 64
const gap = 0

export function CharPickerContent() {
  const listRef = useRef<HTMLUListElement>(null)
  const [content, setContent] = useState<'characters' | 'preface'>('characters')
  const { swiperInstance } = useSwiperInstance()
  const { constants, palette, spacing } = useTheme()
  const { lesson, select, selected, toggle } = useLearn()
  const { height } = useWindowSize()

  const lessonNumber = 99
  const lessonTitle = 'Lecke címe'
  const preface = 'Teszt teszt teszt'

  function selectChar(index: number) {
    swiperInstance?.slideTo(index)
    select(index)
    toggle()
  }

  function scrollToChar(index: number): void {
    if (height === undefined) {
      return
    }

    listRef.current?.scrollTo({ top: (itemHeight + gap) * index + itemHeight / 2 - height / 2, behavior: 'smooth' })
  }

  useOnChange(selected, () => scrollToChar(selected!))

  return (
    <List
      ref={listRef}
      subheader={<CharPickerTitle {...{ content, lessonNumber, lessonTitle, setContent }} />}
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
          {lesson.map(({ charChinese, keyword, primitiveMeaning }, index) => (
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
                  '&.Mui-selected': { color: 'text.primary' },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'text.disabled',
                    justifyContent: 'end',
                    mr: 1,
                    minWidth: spacing(3),
                    typography: 'chineseNormal',
                    fontWeight: 500,
                    fontSize: '100%',
                  }}
                >
                  {charChinese}
                </ListItemIcon>

                <KeywordPrimitiveRow small {...{ keyword, primitiveMeaning }} />
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
