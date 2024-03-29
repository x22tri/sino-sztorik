import { Box, ListItem, ListItemButton, ListItemIcon, useTheme } from '@mui/material'
import { Else, If, Then } from 'react-if'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'
import { useLoaderData } from 'react-router-dom'
import { LoadLearn } from '../../shared/route-loaders/loadLearn'
import { useDrawer } from '../../shared/hooks/useDrawer'
import { Dispatch, SetStateAction } from 'react'

export function CharPickerContent({
  contentType,
  selectCharIndex,
  selectedCharIndex,
}: {
  contentType: 'characters' | 'preface'
  selectCharIndex: Dispatch<SetStateAction<number>>
  selectedCharIndex: number
}) {
  const { lesson } = useLoaderData() as LoadLearn
  const { constants, palette, spacing } = useTheme()
  const { toggleDrawer } = useDrawer()

  function selectChar(index: number) {
    selectCharIndex(index)
    toggleDrawer()
  }

  return (
    <If condition={contentType === 'characters'}>
      <Then>
        {lesson.characters.map(({ glyph, keyword, primitive }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => selectChar(index)}
              selected={selectedCharIndex === index}
              sx={{
                borderRadius: 6,
                color: 'text.secondary',
                mx: 1,
                my: 0.25,
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
                {glyph}
              </ListItemIcon>

              <KeywordPrimitiveRow small {...{ keyword, primitive }} />
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
