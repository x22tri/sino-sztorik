import { Stack, StepButton, Tooltip, useTheme } from '@mui/material'
import {
  IconDefinition,
  faBookOpen,
  faChartColumn,
  faCube,
  faCubesStacked,
  faKey,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Case, Switch, When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DiffedCharacterEntryVariant } from '../../../shared/logic/loadAdminChar'
import { FeaturedInfoInLessonChip } from './FeaturedInfoInLessonChip'
import { InfoInLessonChip } from './InfoInLessonChip'
import { InfoHeadingIcon } from './InfoHeadingIcon'
import { CharacterEntryVariant } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { Fragment } from 'react'

export function PreviewCharacterVariant({
  isActive,
  onClick,
  variant,
}: {
  isActive: boolean
  onClick: () => void
  variant: DiffedCharacterEntryVariant
}) {
  console.log(variant)
  const { palette } = useTheme()

  // If tierVariant, fetch lesson preview
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
    story: <InfoInLessonChip icon={faBookOpen} tooltip='Történet' />,
    constituents: <InfoInLessonChip icon={faCubesStacked} tooltip='Összetétel' />,
    frequency: <InfoInLessonChip icon={faChartColumn} tooltip='Gyakoriság' />,
  }

  return (
    <StepButton
      {...{ onClick }}
      sx={{
        borderBottom: '3px solid transparent',
        my: 1,
        mx: 0,
        p: 0,
        transition: ({ constants }) => constants.animationDuration,
        '.MuiStepLabel-label': { display: 'flex', gap: 1.5 },
        ':hover': { borderBottom: isActive ? undefined : `3px solid ${palette.primary.main}` },
      }}
    >
      <When condition={variant.newInfo.length > 0}>
        <Stack alignItems='stretch' direction='row' display='inline-flex' gap={1}>
          <InfoHeadingIcon icon={faPlus} tooltip='Hozzáadva ebben a körben' />

          {Object.entries(keyIconDictionary).map(([key, value]) =>
            variant.newInfo.includes(key as keyof CharacterEntryVariant) ? <Fragment {...{ key }}>{value}</Fragment> : false
          )}
        </Stack>
      </When>

      <When condition={variant.modifiedInfo.length > 0}>
        <Stack alignItems='stretch' direction='row' display='inline-flex' gap={1}>
          <InfoHeadingIcon icon={faPen} tooltip='Módosítva ebben a körben' />

          {Object.entries(keyIconDictionary).map(([key, value]) =>
            variant.modifiedInfo.includes(key as keyof CharacterEntryVariant) ? <Fragment {...{ key }}>{value}</Fragment> : false
          )}
        </Stack>
      </When>
    </StepButton>
  )
}
