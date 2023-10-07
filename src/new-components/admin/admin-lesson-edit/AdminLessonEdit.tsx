import { AdminAppbar } from '../shared/AdminAppbar'
import { useParams, useRouteLoaderData } from 'react-router-dom'
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { AdminBreadcrumbs } from '../../shared/components/AdminBreadcrumbs'
import { LoadLessonEdit } from '../../shared/route-loaders/loadLessonEdit'
import { PreviousStep } from '../shared/PreviousStep'
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons'
import { OverviewLink } from '../shared/overview-link/OverviewLink'
import { Fragment } from 'react'

export function AdminLessonEdit() {
  const { constants, palette, spacing } = useTheme()
  const params = useParams()

  const { lessonFormData, lessonTimelineData } = useRouteLoaderData('lessonEdit') as LoadLessonEdit

  const lessonNumber = Number(params.lessonNumber)

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Lecke szerkesztése (${lessonNumber}. lecke)`}
        hierarchy={[
          { href: '/admin', text: 'Kezelőközpont' },
          { href: '/admin/lessons', text: 'Leckék' },
        ]}
      />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <PreviousStep link='..' text='Leckék' />

          <Typography variant='h4' mt={2}>
            Áttekintés
          </Typography>

          <Stack alignItems='center' direction='row' gap={2} mt={4}>
            <Typography variant='h5' fontWeight='bold'>
              Lecke
            </Typography>

            <OverviewLink icon={faPen} link='base-info' text='Átnevezés' />
          </Stack>

          <Typography variant='h3' fontWeight='bold' mb={1} mt={3}>
            {lessonFormData.title}
          </Typography>

          <Typography color='text.secondary' mb={4}>
            {lessonNumber}. lecke
          </Typography>

          <Stack direction='row' ml={-0.5}>
            <OverviewLink text={`Összes karakter (${lessonFormData.characters.length})`} link='characters' />
          </Stack>

          <Typography variant='h5' fontWeight='bold' mt={6}>
            Előfordulások
          </Typography>

          <Stack divider={<Divider sx={{ mb: 2 }} />} mt={2}>
            {[1, 2, 3, 4].map(tier => {
              const occurrence = lessonTimelineData[tier - 1]

              return (
                <Fragment key={tier}>
                  <Typography variant='h6' fontWeight='bold' mb={1}>
                    {tier}. kör
                  </Typography>

                  {occurrence.charactersInTier?.length ? (
                    <>
                      <Box display='flex' flexWrap='wrap' gap={2} sx={{ borderRadius: spacing(3) }}>
                        {occurrence.charactersInTier.map(({ glyph }) => (
                          <Typography
                            key={glyph}
                            component='span'
                            variant='chineseText'
                            sx={{ borderRadius: 2, bgcolor: 'grey.100', p: 1 }}
                          >
                            {glyph}
                          </Typography>
                        ))}
                      </Box>

                      <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} mt={2} mb={1}>
                        <OverviewLink disabled icon={faEye} link={`placeholder`} text='Előnézet' />
                      </Stack>
                    </>
                  ) : (
                    <Typography color='text.disabled' mb={2} variant='body2'>
                      Nem szerepel
                    </Typography>
                  )}

                  {/* {occurrence.charactersInTier?.length} karakter */}
                  {/* {presentation === 'unset' ? (
                    <>
                      <Typography color='text.disabled' variant='body2'>
                        Nem szerepel
                      </Typography>

                      <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} mt={2} mb={1}>
                        <AddOccurrenceOptions {...{ charFormData, tier, timelineData }} />
                      </Stack>
                    </>
                  ) : (
                    <>
                      <BlueprintChip type={presentation} />

                      <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} mt={2} mb={1}>
                        {presentation === 'reminder' ? null : (
                          <OverviewLink
                            icon={faPen}
                            link={`story/${tier}`}
                            state={{ mode: 'edit', title: 'Előfordulás módosítása' }}
                            text='Módosítás'
                          />
                        )}

                        <OverviewLink disabled icon={faEye} link={`placeholder`} text='Előnézet' />
                      </Stack>
                    </>
                  )} */}
                </Fragment>
              )
            })}
          </Stack>
        </Box>
      </Box>
    </>
  )
}
