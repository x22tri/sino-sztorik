import { Stack, useTheme } from '@mui/material'
import {
  IconDefinition,
  faBookOpen,
  faChartColumn,
  faCommentDots,
  faCube,
  faCubesStacked,
  faKey,
  faPen,
  faPlus,
  faVolumeLow,
} from '@fortawesome/free-solid-svg-icons'
import { DiffedCharacterEntryVariant, InfoIntroduction } from '../../../shared/logic/loadAdminChar'
import { FeaturedInfoInLessonChip } from './FeaturedInfoInLessonChip'
import { InfoInLessonChip } from './InfoInLessonChip'
import { InfoIconsHeading } from './InfoIconsHeading'
import { CharacterEntryVariant } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { Fragment } from 'react'

export function NewInfoIcons({ variant }: { variant: DiffedCharacterEntryVariant }) {
  return <InfoIcons headingIcon={faPlus} headingTitle='Hozzáadva:' infoArray='newInfo' {...{ variant }} />
}

export function ModifiedInfoIcons({ variant }: { variant: DiffedCharacterEntryVariant }) {
  return <InfoIcons headingIcon={faPen} headingTitle='Módosítva:' infoArray='modifiedInfo' {...{ variant }} />
}

function InfoIcons({
  headingIcon,
  headingTitle,
  infoArray,
  variant,
}: {
  headingIcon: IconDefinition
  headingTitle: string
  infoArray: keyof InfoIntroduction
  variant: DiffedCharacterEntryVariant
}) {
  const { palette } = useTheme()

  const keyIconDictionary: Partial<Record<keyof DiffedCharacterEntryVariant, JSX.Element>> = {
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
    constituents: <InfoInLessonChip icon={faCubesStacked} tooltip='Összetétel' />,
    story: <InfoInLessonChip icon={faBookOpen} tooltip='Történet' />,
    otherUses: <InfoInLessonChip icon={faCommentDots} tooltip='Egyéb jelentések' />,
  }

  return (
    <Stack alignItems='stretch' direction='row' display='inline-flex' gap={1}>
      <InfoIconsHeading icon={headingIcon} label={headingTitle} />

      {Object.entries(keyIconDictionary).map(([key, value]) =>
        variant[infoArray].includes(key as keyof CharacterEntryVariant) ? <Fragment {...{ key }}>{value}</Fragment> : false
      )}
    </Stack>
  )
}
