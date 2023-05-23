import { Box, ListItem, ListItemButton, ListItemIcon, useTheme } from '@mui/material'
import { Else, If, Then } from 'react-if'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'
import { useStore } from '../../shared/logic/useStore'
import { useLoaderData } from 'react-router-dom'
import { AssembledLesson } from '../../shared/interfaces'

export function CharPickerContent({ contentType }: { contentType: 'characters' | 'preface' }) {
  const lesson = useLoaderData() as AssembledLesson
  const { constants, palette, spacing } = useTheme()
  const { selectCharIndex, selectedCharIndex } = useStore('learn')
  const { toggleDrawer } = useStore('mobileDrawer')
  const { swiperInstance } = useStore('swiper')

  function selectChar(index: number) {
    swiperInstance?.slideTo(index)
    selectCharIndex(index)
    toggleDrawer()
  }

  return (
    <If condition={contentType === 'characters'}>
      <Then>
        {lesson.characters.map(({ charChinese, keyword, primitiveMeaning }, index) => (
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
                '&.Mui-selected': { color: 'text.primary', bgcolor: palette.grey[200] },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'text.disabled',
                  justifyContent: 'end',
                  mr: 1,
                  minWidth: spacing(3),
                  typography: 'chineseText',
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
        <Box padding={2} typography='body2' sx={{ color: 'text.secondary' }}>
          {lesson.preface}
        </Box>
      </Else>
    </If>
  )
}
