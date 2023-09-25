import { faBell, faPencil, faPlus, faX, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { Box, useTheme, Tooltip, SxProps, Chip, Stack, Button, Typography, Link } from '@mui/material'
import { forwardRef, ForwardedRef } from 'react'
import { When } from 'react-if'
import { OccurrenceType, SortedOccurrence, OccurrencePresentation } from '../../../../shared/MOCK_DATABASE_ENTRIES'
import { CharFormData, CharTimelineData } from '../../../../shared/route-loaders/loadCharEdit'
import { isPresent } from '../../utils/char-form-utils'
import { isReminder, isUnset } from '../../utils/occurrence-utils'
import { Actions } from '../Actions'
import { OccurrenceContent } from '../OccurrenceContent'
import { getReminderContentType } from '../getReminderContentType'
import { Link as RouterLink } from 'react-router-dom'
import { AddOccurrenceOptions } from '../AddOccurrenceOptions'

export function Occurrence({
  addEntry,
  calculatedIndex,
  charFormData,
  index,
  deleteEntry,
  occurrence,
  timelineData,
}: {
  addEntry: (atIndex: number, type: OccurrenceType) => void
  calculatedIndex: number
  charFormData: CharFormData
  index: number
  deleteEntry: (source: number) => void
  occurrence: SortedOccurrence
  timelineData: CharTimelineData
}) {
  const { palette, spacing } = useTheme()
  const reminder = isReminder(occurrence)

  const currentOccurrence = timelineData[index]

  const contentType: OccurrencePresentation =
    'withhold' in currentOccurrence
      ? currentOccurrence.withhold === 'keyword'
        ? 'primitive'
        : currentOccurrence.withhold === 'primitive'
        ? 'keyword'
        : currentOccurrence.withhold === 'constituents'
        ? 'keywordLite'
        : 'unset' // Should not happen
      : reminder
      ? getReminderContentType(charFormData, timelineData, index)
      : isUnset(currentOccurrence)
      ? 'unset'
      : !isPresent(charFormData, 'keyword')
      ? 'primitive'
      : !isPresent(charFormData, 'primitive')
      ? 'keyword'
      : 'keywordAndPrimitive'

  const sx = useStepContentStyles(reminder, contentType)

  return (
    // <Box
    //   borderRadius={({ spacing }) => spacing(6)}
    //   display='grid'
    //   minHeight={({ spacing }) => spacing(10)}
    //   pr={3}
    //   pl={2}
    //   sx={{ grid: `"location content actions" auto / 1fr 7fr 1fr`, ...sx }}
    // >
    //   <When condition={!isUnset(occurrence)}>
    //     <CourseLocation
    //       tier={occurrence.tier}
    //       lessonNumber={charFormData.lessonNumber}
    //       savedIndex={'index' in occurrence ? occurrence.index : undefined}
    //       {...{ calculatedIndex }}
    //     />
    //   </When>

    //   <Box alignItems='center' display='flex' margin='auto' gridArea='content'>
    //     <When condition={reminder}>
    //       <ReminderIcon />
    //     </When>

    //     <OccurrenceContent type={contentType} {...{ addEntry, charFormData, index, timelineData }} />
    //   </Box>

    //   <Actions {...{ occurrence, timelineData, deleteEntry, index }} />
    // </Box>
    <Stack
      bgcolor={contentType === 'unset' ? 'grey.50' : 'background.default'}
      borderRadius={spacing(2)}
      gap={1}
      justifyContent='center'
      minHeight='200px'
      sx={{
        outline: contentType === 'unset' ? `2px dashed ${palette.text.disabled}` : 'none',
        outlineOffset: '-6px',
      }}
    >
      {contentType === 'unset' ? (
        <Stack alignItems='center' gap={2}>
          <Typography color='text.secondary'>{`${index === 0 ? 'Az' : 'A'} ${index + 1}. körben nem jelenik meg`}</Typography>

          <AddOccurrenceOptions {...{ addEntry, charFormData, timelineData, index }} />
        </Stack>
      ) : (
        <>
          <Box alignItems='center' display='flex' justifyContent='space-between'>
            <BlueprintChip />

            <Button
              color='error'
              endIcon={<FontAwesomeIcon icon={faXmark} />}
              onClick={() => deleteEntry(index)}
              sx={{ '.MuiButton-endIcon': { marginLeft: spacing(0.75), marginBottom: '-3px' } }}
            >
              Változat törlése
            </Button>
          </Box>

          <Box alignItems='center' display='flex'>
            <When condition={reminder}>
              <ReminderIcon />
            </When>

            <OccurrenceContent type={contentType} {...{ addEntry, charFormData, index, timelineData }} />
          </Box>

          {'index' in occurrence && (
            <CourseLocation tier={occurrence.tier} lessonNumber={charFormData.lessonNumber} index={occurrence.index} />
          )}

          <Stack
            alignItems='center'
            direction={{ xs: 'column', md: 'row' }}
            gap={1.5}
            justifyContent={{ xs: 'center', md: 'space-between' }}
            mt={3}
          >
            <Box color={!('story' in occurrence) ? 'error.main' : 'text.primary'}>
              {'story' in occurrence ? 'Történet' : 'Nincs megadva történet'}
            </Box>

            <Button
              startIcon={<FontAwesomeIcon icon={'story' in occurrence ? faPencil : faPlus} transform='shrink-4' />}
              variant={'story' in occurrence ? 'text' : 'contained'}
              sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
            >
              {'story' in occurrence ? 'Történet szerkesztése' : 'Történet hozzáadása'}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}

function CourseLocation({ tier, lessonNumber, index }: { tier: number; lessonNumber: number; index: number }) {
  const { spacing } = useTheme()

  return (
    <Link
      component={RouterLink}
      to={`/admin/lessons/${lessonNumber}`}
      underline='none'
      sx={{ borderRadius: spacing(0.5), width: 'max-content' }}
    >
      {tier}. kör / {lessonNumber}. lecke / {index}. karakter
    </Link>
  )
}

function BlueprintChip() {
  return <Chip label='test' />
}

function ReminderIcon() {
  const { palette } = useTheme()

  return (
    <Tooltip title='Emlékeztető'>
      <IconForwardRef color={palette.warning.main} icon={faBell} transform='shrink-4' style={{ marginRight: '4px' }} />
    </Tooltip>
  )
}

const IconForwardRef = forwardRef((props: FontAwesomeIconProps, ref: ForwardedRef<HTMLOrSVGElement>) => {
  return <FontAwesomeIcon forwardedRef={ref} {...props}></FontAwesomeIcon>
})

function useStepContentStyles(isReminder: boolean, type: OccurrencePresentation | null): SxProps {
  const { palette } = useTheme()

  if (isReminder) {
    switch (type) {
      case 'keyword':
        return { background: palette.background.paper, border: `3px solid ${palette.primary.main}` }
      case 'keywordLite':
        return { background: palette.background.paper, border: `3px solid ${palette.primary[100]}` }
      case 'primitive':
        return { background: palette.background.paper, border: `3px solid ${palette.secondary.main}` }
      case 'keywordAndPrimitive':
        return {
          background: palette.background.paper,
          border: `3px solid`,
          borderColor: `${palette.primary.main} ${palette.secondary.main} ${palette.secondary.main} ${palette.primary.main}`,
        }
      default:
        return {}
    }
  } else {
    switch (type) {
      case 'keyword':
        return { background: palette.primary[200]!, color: palette.primary.main }
      case 'keywordLite':
        return { background: palette.primary[50]!, color: palette.primary.main }
      case 'primitive':
        return { background: palette.secondary[200]!, color: palette.secondary.main }
      case 'keywordAndPrimitive':
        return { background: `linear-gradient(150deg, ${palette.primary[200]} 25%, ${palette.secondary[200]} 75%)` }
      case 'unset':
        return {
          background: palette.grey[50],
          color: palette.text.disabled,
          outline: `2px dashed ${palette.text.disabled}`,
          outlineOffset: '-6px',
        }
      default:
        return {}
    }
  }
}
