import { Box, Typography, useTheme, Stack, Divider, Link, Button } from '@mui/material'
import { Link as RouterLink, useRouteLoaderData } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../shared/components/AdminBreadcrumbs'
import { AdminAppbar } from '../shared/AdminAppbar'
import { PreviousStep } from '../shared/PreviousStep'
import { When } from 'react-if'
import { LoadCharEdit } from '../../shared/route-loaders/loadCharEdit'
import { faCube, faEye, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'
import { getOccurrencePresentation, noOrphanedRemindersIfTierWasDeleted } from './utils/char-form-utils'
import { BlueprintChip } from './blueprint-chip/BlueprintChip'
import { OverviewLink } from '../shared/overview-link/OverviewLink'
import { AddOccurrenceOptions } from './add-occurrence-options/AddOccurrenceOptions'

export function CharEdit() {
  const { constants, palette, spacing } = useTheme()

  const { calculatedIndexes, charFormData, timelineData, lessonName } = useRouteLoaderData('charEdit') as LoadCharEdit

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Áttekintés (${charFormData.glyph})`}
        hierarchy={[
          { href: '../..', text: 'Kezelőközpont' },
          { href: '..', text: 'Karakterek' },
        ]}
      />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <PreviousStep link='..' text='Karakterek' />

          <Typography variant='h4' mt={2}>
            Áttekintés
          </Typography>

          <Box alignItems='center' display='flex' justifyContent='space-between' mt={4}>
            <Stack alignItems='center' direction='row' gap={2}>
              <Typography variant='h5' fontWeight='bold'>
                Karakter
              </Typography>

              <OverviewLink icon={faPen} link='base-info' text='Alapadatok módosítása' state={{ mode: 'edit' }} />
            </Stack>

            <Button color='error'>Karakter törlése</Button>
          </Box>

          <Stack alignItems='end' direction='row' gap={5} mt={4}>
            <Stack alignItems='center' alignSelf='flex-start'>
              <When condition={charFormData.pinyin}>
                <Typography m='auto' variant='pinyin'>
                  {charFormData.pinyin}
                </Typography>
              </When>

              <Typography variant='chineseText' fontSize={100} mt={-2}>
                {charFormData.glyph}
              </Typography>
            </Stack>

            <Stack>
              <When condition={charFormData.keyword}>
                <Box typography='h3' fontWeight='bold'>
                  {charFormData.keyword}
                </Box>
              </When>

              {charFormData.primitive && (
                <Typography fontSize='1.8rem' fontStyle='italic'>
                  <FontAwesomeIcon
                    icon={faCube}
                    color={palette.secondary.main}
                    size='xs'
                    style={{ marginBottom: '2px', marginRight: spacing(1), verticalAlign: 'middle' }}
                  />
                  {charFormData.primitive}
                </Typography>
              )}
            </Stack>
          </Stack>

          <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={0.5} mt={6} ml={-0.5}>
            <OverviewLink link='constituents' text={`${charFormData.constituents?.length} összetevő`} />

            <OverviewLink link='other-uses' text={`${charFormData.otherUses?.length} egyéb jelentés`} />

            <OverviewLink disabled link={`placeholder`} text={`0 kifejezés`} />

            <OverviewLink disabled link={`placeholder`} text={`0 hasonló karakter`} />
          </Stack>

          <Typography variant='h5' fontWeight='bold' mt={6} mb={1}>
            Lecke
          </Typography>

          <Link component={RouterLink} to={`/admin/lessons/${charFormData.lessonNumber}`}>
            {lessonName} ({charFormData.lessonNumber}. lecke)
          </Link>

          <Typography variant='h5' fontWeight='bold' mt={6}>
            Előfordulások
          </Typography>

          <Stack divider={<Divider sx={{ mb: 2 }} />} mt={2}>
            {[1, 2, 3, 4].map(tier => {
              const occurrence = timelineData[tier - 1]
              const presentation = getOccurrencePresentation(charFormData, occurrence)
              const canBeDeleted = noOrphanedRemindersIfTierWasDeleted(timelineData, tier - 1)

              return (
                <Fragment key={tier}>
                  <Typography variant='h6' fontWeight='bold' mb={1}>
                    {tier}. kör
                  </Typography>

                  {presentation === 'unset' ? (
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

                      <Box alignItems='center' display='flex' justifyContent='space-between' mt={2} mb={1}>
                        <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1}>
                          {presentation === 'reminder' ? null : (
                            <OverviewLink
                              icon={faPen}
                              link={`story/${tier}`}
                              state={{ mode: 'edit', title: 'Történet szerkesztése' }}
                              text='Történet szerkesztése'
                            />
                          )}

                          <OverviewLink disabled icon={faEye} link={`placeholder`} text='Előnézet' />
                        </Stack>
                        {!canBeDeleted ? null : <Button color='error'>Törlés</Button>}
                      </Box>
                    </>
                  )}
                </Fragment>
              )
            })}
          </Stack>
        </Box>
      </Box>
    </>
  )
}
