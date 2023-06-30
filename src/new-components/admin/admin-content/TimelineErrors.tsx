import { useState, useEffect } from 'react'
import { SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { isFullOccurrence, isWithheldPrimitiveOccurrence, isWithheldKeywordOccurrence } from '../utils/occurrence-utils'
import { IconDefinition, faBookOpen, faCircle, faCube, faKey, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Tooltip, Typography, useTheme } from '@mui/material'

export enum TimelineError {
  MissingStory = 'MissingStory',
  KeywordNotIntroduced = 'KeywordNotIntroduced',
  PrimitiveNotIntroduced = 'PrimitiveNotIntroduced',
  CourseLocationNotSet = 'CourseLocationNotSet',
}

const keyIconDictionary: Record<TimelineError, { icon: IconDefinition; tooltip: string }> = {
  MissingStory: { icon: faBookOpen, tooltip: 'Nincs történet legalább egy előfordulásnál' },
  KeywordNotIntroduced: { icon: faKey, tooltip: 'A kulcsszó nincs bevezetve' },
  PrimitiveNotIntroduced: { icon: faCube, tooltip: 'Az alapelem nincs bevezetve' },
  CourseLocationNotSet: { icon: faLocationDot, tooltip: 'Legalább egy előfordulás nincs elhelyezve a leckében' },
}

function TimelineErrorIcon({ timelineError }: { timelineError: TimelineError }) {
  const { palette } = useTheme()

  const { icon, tooltip } = keyIconDictionary[timelineError]

  return (
    <Tooltip title={tooltip}>
      <span className='fa-fw fa-layers'>
        <FontAwesomeIcon className='fa-fw' icon={faCircle} transform='grow-10' style={{ color: palette.error.main }} />

        <FontAwesomeIcon className='fa-fw' style={{ color: palette.background.paper }} {...{ icon }} />
      </span>
    </Tooltip>
  )
}

export function TimelineErrors({ character, occurrences }: { character: SortedCharacterEntry; occurrences: SortedOccurrences }) {
  const [timelineErrors, setTimelineErrors] = useState<TimelineError[]>([])

  useEffect(() => {
    const errors: TimelineError[] = []

    if (occurrences.some(occurrence => 'story' in occurrence && occurrence.story.length === 0)) {
      errors.push(TimelineError.MissingStory)
    }

    if (
      'keyword' in character &&
      !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldPrimitiveOccurrence(occurrence))
    ) {
      errors.push(TimelineError.KeywordNotIntroduced)
    }

    if (
      'primitive' in character &&
      !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldKeywordOccurrence(occurrence))
    ) {
      errors.push(TimelineError.PrimitiveNotIntroduced)
    }

    if (occurrences.some(occurrence => 'index' in occurrence && occurrence.index === 0)) {
      errors.push(TimelineError.CourseLocationNotSet)
    }

    setTimelineErrors(errors)
  }, [character, occurrences])

  return !timelineErrors.length ? null : (
    <Box alignItems='center' display='flex' gap={1.5}>
      <Typography variant='inherit' color='error.main'>
        Problémák:
      </Typography>
      {timelineErrors.map((timelineError, index) => (
        <TimelineErrorIcon key={index} {...{ timelineError }} />
      ))}
    </Box>
  )
}
