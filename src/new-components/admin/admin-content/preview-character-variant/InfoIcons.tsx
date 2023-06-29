import { Stack, useTheme } from '@mui/material'
import {
  IconDefinition,
  faBookOpen,
  faChartColumn,
  faCommentDots,
  faCube,
  faCubes,
  faKey,
  faVolumeLow,
} from '@fortawesome/free-solid-svg-icons'
import { FeaturedInfoInLessonChip } from './FeaturedInfoInLessonChip'
import { InfoInLessonChip } from './InfoInLessonChip'
import { InfoIconsHeading } from './InfoIconsHeading'
import { CharacterEntryVariant } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { Fragment } from 'react'

export function InfoIcons({
  headingIcon,
  headingTitle,
  infoArray,
  variant,
}: {
  headingIcon: IconDefinition
  headingTitle: string
  infoArray: (keyof CharacterEntryVariant)[]
  variant: CharacterEntryVariant
}) {
  const { palette } = useTheme()

  const keyIconDictionary: Partial<Record<keyof CharacterEntryVariant, JSX.Element>> = {
    keyword: (
      <FeaturedInfoInLessonChip
        bgcolor={palette.primary[100]!}
        color={palette.primary.main}
        icon={faKey}
        label={variant.keyword!}
        tooltip='Kulcsszó'
      />
    ),
    primitive: (
      <FeaturedInfoInLessonChip
        bgcolor={palette.secondary[100]!}
        color={palette.secondary.main}
        icon={faCube}
        label={variant.primitive!}
        tooltip='Alapelemként'
      />
    ),
    pinyin: <InfoInLessonChip icon={faVolumeLow} tooltip='Kiejtés' />,
    frequency: <InfoInLessonChip icon={faChartColumn} tooltip='Gyakoriság' />,
    constituents: <InfoInLessonChip icon={faCubes} tooltip='Összetétel' />,
    story: <InfoInLessonChip icon={faBookOpen} tooltip='Történet' />,
    otherUses: <InfoInLessonChip icon={faCommentDots} tooltip='Egyéb jelentések' />,
  }

  return (
    <Stack alignItems='stretch' direction='row' display='inline-flex' gap={1}>
      <InfoIconsHeading icon={headingIcon} label={headingTitle} />

      {Object.entries(keyIconDictionary).map(([key, value]) =>
        infoArray.includes(key as keyof CharacterEntryVariant) ? <Fragment {...{ key }}>{value}</Fragment> : false
      )}
    </Stack>
  )
}
