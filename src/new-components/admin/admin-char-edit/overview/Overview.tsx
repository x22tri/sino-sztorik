import { Box, Typography, useTheme, Stack, Divider, Link, Chip, Button, lighten } from '@mui/material'
import { Link as RouterLink, useParams, useRouteLoaderData } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../../shared/components/AdminBreadcrumbs'
import { AdminAppbar } from '../../shared/AdminAppbar'
import { PreviousStep } from '../../shared/PreviousStep'
import { When } from 'react-if'
import { CharFormData, CharTimelineData, LoadCharEdit } from '../../../shared/route-loaders/loadCharEdit'
import {
  IconDefinition,
  faBell,
  faBookOpen,
  faCube,
  faEye,
  faKey,
  faPen,
  faRunning,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isReminder, isSet, isUnset } from '../utils/occurrence-utils'
import { Fragment } from 'react'
import { LESSONS } from '../../../shared/MOCK_LESSONS'
import { OccurrencePresentation, OccurrenceType, OccurrenceV3, SortedOccurrence } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { getOccurrencePresentation, getReminderContentType, isPresent } from '../utils/char-form-utils'

export function Overview() {
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
          <PreviousStep link={`..`} text='Karakterek' />
          <Typography variant='h4' mt={2}>
            Áttekintés
          </Typography>
          <Stack alignItems='center' direction='row' gap={2} mt={4}>
            <Typography variant='h5' fontWeight='bold'>
              Karakter
            </Typography>

            <OverviewLink icon={faPen} link='base-info' text='Alapadatok módosítása' />
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
            <OverviewLink link='constituents' text={`${charFormData.constituents?.length} összetevő`} />

            <OverviewLink link='other-uses' text={`${charFormData.otherUses?.length} egyéb jelentés`} />

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
              const presentation = getOccurrencePresentation(charFormData, occurrence)

              return (
                <Fragment key={tier}>
                  <Typography variant='h6' fontWeight='bold' mb={1}>
                    {tier}. kör
                  </Typography>

                  {presentation === 'unset' ? (
                    <>
                      <Typography color='text.disabled'>Nem szerepel</Typography>

                      <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} my={1}>
                        <OverviewLink
                          icon={faStar}
                          link={`story/${tier}`}
                          state={{ mode: 'add', title: 'Teljes karakter bevezetése', type: 'full' }}
                          text='Teljes karakter bevezetése'
                        />

                        <OverviewLink
                          icon={faBell}
                          link={`story/${tier}`}
                          state={{ mode: 'add', title: 'Emlékeztető hozzáadása', type: 'reminder' }}
                          text='Emlékeztető hozzáadása'
                        />
                      </Stack>
                    </>
                  ) : (
                    <>
                      <BlueprintChip type={presentation} />

                      <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={1} my={1}>
                        {presentation === 'reminder' ? null : (
                          <OverviewLink
                            icon={faPen}
                            link={`story/${tier}`}
                            state={{ mode: 'edit', title: 'Előfordulás módosítása' }}
                            text='Módosítás'
                          />
                        )}

                        <OverviewLink
                          disabled
                          icon={faEye}
                          link={`/admin/characters/${charFormData.glyph}/form/2`}
                          text='Előnézet'
                        />
                      </Stack>
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

export type StoryLinkState = { mode: 'edit'; title: string } | { mode: 'add'; title: string; type: OccurrenceType }

function OverviewLink({
  disabled = false,
  icon,
  link,
  state,
  text,
}: {
  disabled?: boolean
  icon?: IconDefinition
  link: string
  state?: StoryLinkState
  text: string
}) {
  const { spacing } = useTheme()

  return (
    <Button
      component={RouterLink}
      to={link}
      size='small'
      startIcon={icon ? <FontAwesomeIcon transform='shrink-4' {...{ icon }} /> : undefined}
      {...{ state }}
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

export function BlueprintChip({ isReminder, type }: { isReminder?: boolean; type: Exclude<OccurrencePresentation, 'unset'> }) {
  const { palette } = useTheme()

  const typeMap: Record<
    Exclude<OccurrencePresentation, 'unset'>,
    { background: string; color: string; icon: IconDefinition; label: string }
  > = {
    keyword: { background: palette.primary[200]!, color: palette.primary.main, icon: faKey, label: 'Kulcsszó' },
    keywordAndPrimitive: {
      background: `linear-gradient(150deg, ${palette.primary[200]} 25%, ${palette.secondary[200]} 75%)`,
      color: palette.primary.main,
      icon: faStar,
      label: 'Kulcsszó és alapelem',
    },
    keywordLite: {
      background: palette.primary[50]!,
      color: palette.primary[300]!,
      icon: faRunning,
      label: 'Kulcsszó felületes bevezetése',
    },
    primitive: { background: palette.secondary[200]!, color: palette.secondary.main, icon: faCube, label: 'Alapelem' },
    reminder: { background: lighten(palette.warning.main, 0.5), color: palette.warning.dark, icon: faBell, label: 'Emlékeztető' },
  }

  const { background, color, icon, label } = typeMap[isReminder ? 'reminder' : type]

  return (
    <Chip icon={<FontAwesomeIcon {...{ color, icon }} />} {...{ label }} sx={{ background, pl: 0.5, width: 'max-content' }} />
  )
}
