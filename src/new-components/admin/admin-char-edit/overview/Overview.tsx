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

            <OverviewLink icon={faPen} link={`/admin/characters/${charFormData.glyph}/base-info`} text='Alapadatok módosítása' />
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

          <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={0.5} mt={6} ml={-0.5}>
            <OverviewLink
              link={`/admin/characters/${charFormData.glyph}/constituents`}
              text={`${charFormData.constituents?.length} összetevő`}
            />

            <OverviewLink
              link={`/admin/characters/${charFormData.glyph}/other-uses`}
              text={`${charFormData.otherUses?.length} egyéb jelentés`}
            />

            <OverviewLink disabled link={`/admin/characters/${charFormData.glyph}/form/2`} text={`0 kifejezés`} />

            <OverviewLink disabled link={`/admin/characters/${charFormData.glyph}/form/2`} text={`0 hasonló karakter`} />
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
                      <OverviewLink icon={faPen} link={`/admin/characters/${charFormData.glyph}/form/2`} text='Módosítás' />

                      <OverviewLink icon={faEye} link={`/admin/characters/${charFormData.glyph}/form/2`} text='Előnézet' />

                      <OverviewLink
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
                      <OverviewLink
                        icon={faStar}
                        link={`/admin/characters/${charFormData.glyph}/form/2`}
                        text='Teljes karakter hozzáadása'
                      />

                      <OverviewLink
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

function OverviewLink({
  disabled = false,
  icon,
  link,
  text,
}: {
  disabled?: boolean
  icon?: IconDefinition
  link: string
  text: string
}) {
  const { spacing } = useTheme()

  return (
    <Button
      component={RouterLink}
      to={link}
      size='small'
      startIcon={icon ? <FontAwesomeIcon transform='shrink-4' {...{ icon }} /> : undefined}
      sx={{
        color: disabled ? 'action.disabled' : 'primary.main',
        pointerEvents: disabled ? 'none' : 'initial',
        '.MuiButton-startIcon': { marginRight: spacing(0.75) },
      }}
    >
      {text}
    </Button>
  )
}

function CourseLocationPresent({ tier, lessonNumber, index }: { tier: number; lessonNumber: number; index: number }) {
  return (
    <>
      <Chip label='test' sx={{ mb: 1, width: 'max-content' }} />

      <Typography>
        {tier}. kör / {lessonNumber}. lecke / {index}. hely
      </Typography>
    </>
  )
}

function CourseLocationMissing({ tier, lessonNumber }: { tier: number; lessonNumber: number }) {
  return (
    <>
      <Typography color='text.disabled' mb={1}>
        Nem szerepel
      </Typography>

      <Typography>
        {tier}. kör / {lessonNumber}. lecke
      </Typography>
    </>
  )
}
