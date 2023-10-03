import { useParams } from 'react-router-dom'
import { LessonOccurrence } from '../../../shared/route-loaders/loadLessonEdit'
import { CourseLocation } from '../course-location/CourseLocation'
import { Box, Drawer, Stack, SxProps, Typography, useTheme } from '@mui/material'
import { Actions } from '../actions/Actions'
import { Unless } from 'react-if'
import { useState } from 'react'
import { PrefaceDrawerContent } from '../preface-drawer-content/PrefaceDrawerContent'

export function Occurrence({ occurrence, tier }: { occurrence: LessonOccurrence; tier: number }) {
  const params = useParams()
  const { constants, palette, spacing } = useTheme()
  const [isPrefaceDrawerOpen, setPrefaceDrawerOpen] = useState(false)

  const occurrenceHasNoPreface = occurrence.variantInTier?.preface === ''

  const noOccurrenceInTier = !occurrence.variantInTier

  // const sx = useLessonOccurrenceStyles(isEmptyTier)

  function closePrefaceDrawer() {
    setPrefaceDrawerOpen(false)
  }

  return (
    <>
      <Stack
        bgcolor={noOccurrenceInTier ? 'grey.50' : 'background.default'}
        borderRadius={spacing(2)}
        gap={1}
        justifyContent='center'
        minHeight='200px'
        sx={{
          outline: noOccurrenceInTier ? `2px dashed ${palette.text.disabled}` : 'none',
          outlineOffset: '-6px',
        }}
      >
        {noOccurrenceInTier ? (
          <Typography alignSelf='center' color='text.secondary'>
            {`${tier === 1 ? 'Az' : 'A'} ${tier}. körben nem jelenik meg`}
          </Typography>
        ) : (
          <>
            {/* <Box alignItems='center' display='flex' justifyContent='space-between'>
              <BlueprintChip isReminder={reminder} type={contentType} />
              {canBeDeleted && (
                <Button
                  color='error'
                  endIcon={<FontAwesomeIcon icon={faXmark} />}
                  onClick={() => deleteEntry(index)}
                  sx={{ '.MuiButton-endIcon': { marginLeft: spacing(0.75), marginBottom: '-3px' } }}
                >
                  Változat törlése
                </Button>
              )}
            </Box> */}

            {/* <Box alignItems='center' display='flex' mt={1}>
              <OccurrenceContent type={contentType} {...{ addEntry, charFormData, index, timelineData }} />
            </Box>

            {'index' in occurrence && <CourseLocation lessonNumber={charFormData.lessonNumber} index={occurrence.index} />}

            {reminder ? (
              <Box color='text.disabled' mt={3}>
                Lásd a legutolsó történetet
              </Box>
            ) : (
              <Stack
                alignItems='center'
                direction={{ xs: 'column', md: 'row' }}
                gap={1.5}
                justifyContent={{ xs: 'center', md: 'space-between' }}
                mt={3}
              >
                <Box color={occurrenceHasNoStory ? 'error.main' : 'text.primary'}>
                  {occurrenceHasNoStory ? 'Nincs megadva történet!' : 'Történet'}
                </Box>

                <Button
                  onClick={openStoryDrawer}
                  startIcon={<FontAwesomeIcon icon={occurrenceHasNoStory ? faPlus : faPencil} transform='shrink-4' />}
                  variant={occurrenceHasNoStory ? 'contained' : 'text'}
                  sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
                >
                  {occurrenceHasNoStory ? 'Történet hozzáadása' : 'Történet szerkesztése'}
                </Button>
              </Stack>
            )} */}
          </>
        )}
      </Stack>

      <Drawer
        anchor='right'
        open={isPrefaceDrawerOpen}
        onClose={closePrefaceDrawer}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', minWidth: `${constants.drawerWidth}px`, width: 0.5 } }}
      >
        <PrefaceDrawerContent />
      </Drawer>
    </>
    // <Box
    //   borderRadius={spacing(6)}
    //   display='grid'
    //   minHeight={spacing(10)}
    //   pr={3}
    //   pl={2}
    //   sx={{
    //     grid: `"location content actions" auto / 1fr 7fr 1fr`,
    //     ...sx,
    //   }}
    // >
    //   <Unless condition={isEmptyTier}>
    //     <CourseLocation lessonNumber={Number(params.lessonNumber)} {...{ tier }} />
    //   </Unless>

    //   <Box
    //     alignItems='center'
    //     display='flex'
    //     margin='auto'
    //     gridArea='content'
    //     textAlign='center'
    //     typography={isEmptyTier ? 'body2' : 'body'}
    //   >
    //     {isEmptyTier
    //       ? 'A kör létrehozásához adj hozzá karaktereket a Karakterszerkesztőben'
    //       : `${occurrence.charactersInTier.length} karakter`}
    //   </Box>

    //   <Actions {...{ occurrence }} />
    // </Box>
  )
}

function useLessonOccurrenceStyles(isEmptyTier: boolean): SxProps {
  const { palette } = useTheme()

  return isEmptyTier
    ? {
        background: palette.grey[50],
        color: palette.text.disabled,
        outline: `2px dashed ${palette.text.disabled}`,
        outlineOffset: '-6px',
      }
    : { background: palette.primary[200], color: palette.primary.main }
}
