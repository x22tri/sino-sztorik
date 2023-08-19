import { Box, useTheme } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { TitleSubtitle } from '../../shared/components/TitleSubtitle'
import { LEARN_LESSON_CHARACTERS_TOOLTIP, LEARN_LESSON_PREFACE_TOOLTIP, LESSON_NUMBER_SUFFIX_APPBAR } from '../../shared/strings'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { Else, If, Then } from 'react-if'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { useLoaderData } from 'react-router-dom'
import { AssembledLesson } from '../../shared/interfaces'
import { LoadLearn } from '../../shared/logic/loadLearn'

export function CharPickerTitle({
  contentType,
  setContentType,
}: {
  contentType: 'characters' | 'preface'
  setContentType: Dispatch<SetStateAction<'characters' | 'preface'>>
}) {
  const { lesson } = useLoaderData() as LoadLearn
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
      <TitleSubtitle title={lesson.lessonNumber + LESSON_NUMBER_SUFFIX_APPBAR} subtitle={lesson.title ?? ''} />

      <If condition={contentType === 'characters'}>
        <Then>
          <ToolbarButton icon={faNewspaper} onClick={() => setContentType('preface')} tooltip={LEARN_LESSON_PREFACE_TOOLTIP} />
        </Then>
        <Else>
          <ToolbarButton
            icon={faLanguage}
            onClick={() => setContentType('characters')}
            tooltip={LEARN_LESSON_CHARACTERS_TOOLTIP}
          />
        </Else>
      </If>
    </Box>
  )
}
