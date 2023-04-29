import { Box, useTheme } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { TitleSubtitle } from '../learn-appbar/TitleSubtitle'
import { LESSON_NUMBER_SUFFIX_APPBAR } from '../../shared/strings'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { Else, If, Then } from 'react-if'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'

export function CharPickerTitle({
  content,
  lessonNumber,
  lessonTitle,
  setContent,
}: {
  content: 'characters' | 'preface'
  lessonNumber: number
  lessonTitle: string
  setContent: Dispatch<SetStateAction<'characters' | 'preface'>>
}) {
  const { palette, spacing } = useTheme()
  return (
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
  )
}
