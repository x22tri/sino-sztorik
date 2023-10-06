import { Box, Typography, useTheme, Stack, Divider, Link, Chip, Button } from '@mui/material'
import { Link as RouterLink, useParams, useRouteLoaderData } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../shared/components/AdminBreadcrumbs'
import { AdminAppbar } from '../../shared/AdminAppbar'
import { PreviousStep } from '../../shared/PreviousStep'
import { When } from 'react-if'
import { LoadCharEdit } from '../../../shared/route-loaders/loadCharEdit'
import { IconDefinition, faBell, faBookOpen, faCube, faEye, faPen, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isSet } from '../utils/occurrence-utils'
import { Fragment } from 'react'

export function Overview() {
  const { constants, palette, spacing } = useTheme()

  const { calculatedIndexes, charFormData, timelineData } = useRouteLoaderData('charEdit') as LoadCharEdit

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Áttekintés (${charFormData.glyph})`}
        hierarchy={[
          { href: '/admin', text: 'Kezelőközpont' },
          { href: '/admin/characters', text: 'Karakterek' },
        ]}
      />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <PreviousStep link={`/admin/characters`} text='Karakterek' />

          <Typography variant='h4' mt={2}>
            Áttekintés
          </Typography>

          <Stack alignItems='center' direction='row' gap={2} mt={4}>
            <Typography variant='h5' fontWeight='bold'>
              Karakter
            </Typography>

            <OverviewIconLink
              icon={faPen}
              link={`/admin/characters/${charFormData.glyph}/base-info`}
              text='Alapadatok módosítása'
            />
          </Stack>

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

          <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} mt={6}>
            <OverviewLink
              link={`/admin/characters/${charFormData.glyph}/form/2`}
              text={`${charFormData.constituents?.length} összetevő`}
            />

            <OverviewLink
              link={`/admin/characters/${charFormData.glyph}/form/2`}
              text={`${charFormData.otherUses?.length} egyéb jelentés`}
            />

            <OverviewLink link={`/admin/characters/${charFormData.glyph}/form/2`} text={`0 kifejezés`} />

            <OverviewLink link={`/admin/characters/${charFormData.glyph}/form/2`} text={`0 hasonló karakter`} />
          </Stack>

          <Typography variant='h5' fontWeight='bold' mt={8}>
            Előfordulások
          </Typography>

          <Stack divider={<Divider sx={{ mb: 2 }} />} mt={2}>
            {[1, 2, 3, 4].map(tier => {
              const occurrence = timelineData[tier - 1]

              if (isSet(occurrence)) {
                return (
                  <Fragment key={tier}>
                    <CourseLocationPresent {...{ tier }} lessonNumber={charFormData.lessonNumber} index={occurrence.index} />

                    <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} my={1}>
                      <OverviewIconLink icon={faPen} link={`/admin/characters/${charFormData.glyph}/form/2`} text='Módosítás' />

                      <OverviewIconLink icon={faEye} link={`/admin/characters/${charFormData.glyph}/form/2`} text='Előnézet' />

                      <OverviewIconLink
                        icon={faBookOpen}
                        link={`/admin/characters/${charFormData.glyph}/form/2`}
                        text='Lecke megtekintése'
                      />
                    </Stack>
                  </Fragment>
                )
              } else
                return (
                  <Fragment key={tier}>
                    <CourseLocationMissing {...{ tier }} lessonNumber={charFormData.lessonNumber} />

                    <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} my={1}>
                      <OverviewIconLink
                        icon={faStar}
                        link={`/admin/characters/${charFormData.glyph}/form/2`}
                        text='Teljes karakter hozzáadása'
                      />

                      <OverviewIconLink
                        icon={faBell}
                        link={`/admin/characters/${charFormData.glyph}/form/2`}
                        text='Emlékeztető hozzáadása'
                      />
                    </Stack>
                  </Fragment>
                )
            })}
          </Stack>
        </Box>
      </Box>
    </>
  )
}

function OverviewLink({ link, text }: { link: string; text: string }) {
  return (
    <Link component={RouterLink} to={link} typography='button'>
      {text}
    </Link>
  )
}

function OverviewIconLink({ icon, link, text }: { icon: IconDefinition; link: string; text: string }) {
  const { spacing } = useTheme()

  return (
    <Button
      component={RouterLink}
      to={link}
      size='small'
      startIcon={<FontAwesomeIcon transform='shrink-4' {...{ icon }} />}
      sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.75) } }}
    >
      {text}
    </Button>
  )
}

function CourseLocationPresent({ tier, lessonNumber, index }: { tier: number; lessonNumber: number; index: number }) {
  return (
    <Stack alignItems='center' direction='row' gap={2}>
      <Typography>
        {tier}. kör / {lessonNumber}. lecke / {index}. hely
      </Typography>

      <Chip label='test' size='small' />
    </Stack>
  )
}

function CourseLocationMissing({ tier, lessonNumber }: { tier: number; lessonNumber: number }) {
  return (
    <Typography>
      {tier}. kör / {lessonNumber}. lecke
      <Box component='span' color='text.disabled'>
        &nbsp;/ Nem szerepel
      </Box>
    </Typography>
  )
}
