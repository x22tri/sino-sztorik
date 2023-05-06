import { Box, ListItem, ListItemButton, ListItemIcon, useTheme } from '@mui/material'
import { Else, If, Then } from 'react-if'
import { useSwiperInstance } from '../../shared/state'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'
import { useStore } from '../../shared/logic/useStore'

export function CharPickerContent({ content }: { content: 'characters' | 'preface' }) {
  const { swiperInstance } = useSwiperInstance()
  const { constants, spacing } = useTheme()
  const { currentLesson, selectCharIndex, selectedCharIndex } = useStore('learn')
  const { toggleDrawer } = useStore('mobileDrawer')

  function selectChar(index: number) {
    swiperInstance?.slideTo(index)
    selectCharIndex(index)
    toggleDrawer()
  }

  return (
    <If condition={content === 'characters'}>
      <Then>
        {currentLesson?.characters.map(({ charChinese, keyword, primitiveMeaning }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => selectChar(index)}
              selected={selectedCharIndex === index}
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
        <Box padding={2}>{currentLesson?.preface}</Box>
      </Else>
    </If>
  )
}
