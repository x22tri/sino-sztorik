import { Stack, StepButton, useTheme } from '@mui/material'
import {
  IconDefinition,
  faBookOpen,
  faChartColumn,
  faCube,
  faCubesStacked,
  faKey,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Case, Switch, When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DiffedCharacterEntryVariant } from '../../../shared/logic/loadAdminChar'
import { FeaturedInfoInLessonChip } from './FeaturedInfoInLessonChip'
import { InfoInLessonChip } from './InfoInLessonChip'

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
  const keyIconDictionary: Partial<Record<keyof DiffedCharacterEntryVariant, IconDefinition>> = {
    keyword: faKey,
    primitive: faCube,
    story: faBookOpen,
    constituents: faCubesStacked,
    frequency: faChartColumn,
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
        zIndex: 2,
        ':hover': { borderBottom: isActive ? undefined : `3px solid ${palette.primary.main}` },
      }}
    >
      <When condition={variant.newInfo.length > 0}>
        <Stack alignItems='stretch' direction='row' gap={1}>
          <FontAwesomeIcon icon={faPlus} size='sm' style={{ alignSelf: 'center' }} />

          {variant.newInfo.map(newInfoKey => (
            <Switch key={newInfoKey}>
              <Case condition={newInfoKey === 'keyword'}>
                <FeaturedInfoInLessonChip
                  bgcolor={palette.primary[100]!}
                  color={palette.primary.main}
                  icon={faKey}
                  label={variant.keyword!}
                  tooltip='Kulcsszó'
                />
              </Case>
              <Case condition={newInfoKey === 'primitive'}>
                <FeaturedInfoInLessonChip
                  bgcolor={palette.secondary[100]!}
                  color={palette.secondary.main}
                  icon={faCube}
                  label={variant.primitive!}
                  tooltip='Alapelemként'
                />
              </Case>
              <Case condition={newInfoKey === 'story'}>
                <InfoInLessonChip icon={faBookOpen} tooltip='Történet' />
              </Case>
              <Case condition={newInfoKey === 'constituents'}>
                <InfoInLessonChip icon={faCubesStacked} tooltip='Összetétel' />
              </Case>

              <Case condition={newInfoKey === 'frequency'}>
                <InfoInLessonChip icon={faChartColumn} tooltip='Gyakoriság' />
              </Case>
            </Switch>

            // <When condition={newInfoKey in keyIconDictionary} key={newInfoKey}>
            //   <Chip icon={<FontAwesomeIcon icon={keyIconDictionary[newInfoKey]!} size='sm' />} label={newInfoKey} />
            // </When>
          ))}
        </Stack>
      </When>
    </StepButton>
  )
}
