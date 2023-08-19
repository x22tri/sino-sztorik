import { Box, Stack, Typography } from '@mui/material'
import { CHARACTERS_IN_LESSON_LABEL, CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { Character, LessonStatuses, TierStatuses } from '../../shared/interfaces'
import { iconDictionary } from '../lesson-picker/TierStatusIcons'
import { Fragment } from 'react'

const charWidth = '42px'
const minNumberOfColumns = 4
const maxNumberOfColumns = 5

const { NOT_IN_TIER, LOCKED, UPCOMING, COMPLETED } = LessonStatuses

export function CharacterPreviews({ characters, tierStatuses }: { characters: Character[]; tierStatuses: TierStatuses }) {
  return (
    <Stack mt={2} p={1.5} gap={1}>
      <Typography variant='h6'>A lecke előfordulásai</Typography>

      <Stack
        alignItems='center'
        display='grid'
        gridTemplateColumns='max-content max-content auto'
        rowGap={1.5}
        typography='body2'
      >
        {tierStatuses.map((tier, index) => (
          <Fragment key={index}>
            <Box color='text.secondary' mr={1.5}>
              {index + 1}. kör
            </Box>

            {iconDictionary[tier]}

            <Box ml={0.75}>{tier}</Box>
          </Fragment>
        ))}
      </Stack>

      <Typography variant='h6' mt={3}>
        {CHARACTERS_IN_LESSON_LABEL} ({characters.length})
      </Typography>

      <Box display='flex' flexWrap='wrap' gap={3} sx={{ borderRadius: ({ spacing }) => spacing(3) }}>
        {characters.map(({ charChinese }) => (
          <Typography
            key={charChinese}
            component='span'
            variant='chineseText'
            sx={{ bgcolor: 'grey.50', borderRadius: 2, maxWidth: charWidth, p: 1 }}
          >
            {charChinese}
          </Typography>
        ))}
      </Box>
    </Stack>
  )
}
