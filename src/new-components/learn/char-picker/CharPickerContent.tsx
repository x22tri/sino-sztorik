import { Box, ListItem, ListItemButton, ListItemIcon, useTheme } from '@mui/material'
import { Else, If, Then } from 'react-if'
import { useLearn } from '../logic/useLearn'
import { useSwiperInstance } from '../../shared/state'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'

export function CharPickerContent({ content, preface }: { content: 'characters' | 'preface'; preface: string }) {
  const { swiperInstance } = useSwiperInstance()
  const { constants, spacing } = useTheme()
  const { lesson, select, selected, toggle } = useLearn()

  function selectChar(index: number) {
    swiperInstance?.slideTo(index)
    select(index)
    toggle()
  }

  return (
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
  )
}
