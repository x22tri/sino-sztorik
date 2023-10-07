import { Box, Typography, useTheme, Stack, Divider, Link, Chip, Button, lighten } from '@mui/material'
import { Link as RouterLink, useParams, useRouteLoaderData } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../shared/components/AdminBreadcrumbs'
import { AdminAppbar } from '../../shared/AdminAppbar'
import { PreviousStep } from '../../shared/PreviousStep'
import { When } from 'react-if'
import { CharFormData, CharTimelineData, LoadCharEdit } from '../../../shared/route-loaders/loadCharEdit'
import { IconDefinition, faBell, faBookOpen, faCube, faEye, faPen, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isReminder, isSet, isUnset } from '../utils/occurrence-utils'
import { Fragment } from 'react'
import { LESSONS } from '../../../shared/MOCK_LESSONS'
import { OccurrencePresentation, OccurrenceV3, SortedOccurrence } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { getReminderContentType, isPresent } from '../utils/char-form-utils'

export function Overview() {
  const { constants, palette, spacing } = useTheme()

  const { calculatedIndexes, charFormData, timelineData, lessonName } = useRouteLoaderData('charEdit') as LoadCharEdit

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
          <Stack alignItems='center' direction='row' gap={2} mt={6} mb={1}>
            <Typography variant='h5' fontWeight='bold'>
              Lecke
            </Typography>

            <OverviewLink
              disabled
              icon={faBookOpen}
              link={`/admin/characters/${charFormData.glyph}/form/2`}
              text='Leckeszerkesztő'
            />
          </Stack>
          {lessonName} ({charFormData.lessonNumber}. lecke)
          <Typography variant='h5' fontWeight='bold' mt={6}>
            Előfordulások
          </Typography>
          <Stack divider={<Divider sx={{ mb: 2 }} />} mt={2}>
            {[1, 2, 3, 4].map(tier => {
              const occurrence = timelineData[tier - 1]
              const type = getOccurrenceType(charFormData, occurrence)

              if (type !== 'unset') {
                return (
                  <Fragment key={tier}>
                    <CourseLocationPresent {...{ tier, type }} index={(occurrence as OccurrenceV3).index} />

                    <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} my={1}>
                      <OverviewLink icon={faPen} link={`/admin/characters/${charFormData.glyph}/form/2`} text='Módosítás' />

                      <OverviewLink
                        disabled
                        icon={faEye}
                        link={`/admin/characters/${charFormData.glyph}/form/2`}
                        text='Előnézet'
                      />
                    </Stack>
                  </Fragment>
                )
              } else
                return (
                  <Fragment key={tier}>
                    <CourseLocationMissing {...{ tier }} />

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

function CourseLocationPresent({
  tier,
  type,
  index,
}: {
  tier: number
  type: Exclude<OccurrencePresentation, 'unset'>
  index: number
}) {
  return (
    <>
      <Typography variant='h6' fontWeight='bold'>
        {tier}. kör
      </Typography>

      <Typography mb={1}>{index}. hely</Typography>

      <BlueprintChip {...{ type }} />
    </>
  )
}

function CourseLocationMissing({ tier }: { tier: number }) {
  return (
    <>
      <Typography variant='h6' fontWeight='bold'>
        {tier}. kör
      </Typography>

      <Typography color='text.disabled'>Nem szerepel</Typography>
    </>
  )
}

export function BlueprintChip({ isReminder, type }: { isReminder?: boolean; type: Exclude<OccurrencePresentation, 'unset'> }) {
  const { palette } = useTheme()

  const typeMap: Record<Exclude<OccurrencePresentation, 'unset'>, { background: string; label: string }> = {
    keyword: { background: palette.primary[200]!, label: 'Kulcsszó' },
    keywordAndPrimitive: {
      background: `linear-gradient(150deg, ${palette.primary[200]} 25%, ${palette.secondary[200]} 75%)`,
      label: 'Kulcsszó és alapelem',
    },
    keywordLite: { background: palette.primary[50]!, label: 'Kulcsszó felületes bevezetése' },
    primitive: { background: palette.secondary[200]!, label: 'Alapelem' },
    reminder: { background: lighten(palette.warning.main, 0.5), label: 'Emlékeztető' },
  }

  const { background, label } = typeMap[isReminder ? 'reminder' : type]

  return <Chip {...{ label }} sx={{ background, width: 'max-content' }} />
}

function getOccurrenceType(charFormData: CharFormData, occurrence: SortedOccurrence): OccurrencePresentation {
  return 'withhold' in occurrence
    ? occurrence.withhold === 'keyword'
      ? 'primitive'
      : occurrence.withhold === 'primitive'
      ? 'keyword'
      : occurrence.withhold === 'constituents'
      ? 'keywordLite'
      : 'unset' // Should not happen
    : isReminder(occurrence)
    ? 'reminder'
    : isUnset(occurrence)
    ? 'unset'
    : !isPresent(charFormData, 'keyword')
    ? 'primitive'
    : !isPresent(charFormData, 'primitive')
    ? 'keyword'
    : 'keywordAndPrimitive'
}
