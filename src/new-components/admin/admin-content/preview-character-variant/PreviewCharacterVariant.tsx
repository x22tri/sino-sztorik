import { StepButton } from '@mui/material'
import { faCopy, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { DiffInfoTier } from '../../../shared/logic/loadAdminChar'
import { InfoIcons } from './InfoIcons'
import { When } from 'react-if'
import { InfoIconsHeading } from './InfoIconsHeading'
import { CharacterEntryVariant } from '../../../shared/MOCK_DATABASE_ENTRIES'

export function PreviewCharacterVariant({
  isActive,
  diffInfo,
  onClick,
  variant,
}: {
  isActive: boolean
  diffInfo: DiffInfoTier
  onClick: () => void
  variant: CharacterEntryVariant
}) {
  return (
    <StepButton
      {...{ onClick }}
      sx={{
        borderRadius: ({ spacing }) => spacing(6),
        boxShadow: ({ constants }) => (isActive ? constants.boxShadow : undefined),
        my: 1,
        py: 0,
        transition: ({ constants }) => constants.animationDuration,
        '.MuiStepLabel-label': { display: 'flex', gap: 1.5 },
        ':hover': { boxShadow: ({ constants }) => constants.boxShadow },
      }}
    >
      <When condition={diffInfo.newInfo.length > 0}>
        <InfoIcons headingIcon={faPlus} headingTitle='Hozzáadva:' infoArray={diffInfo.newInfo} {...{ variant }} />
      </When>

      <When condition={diffInfo.modifiedInfo.length > 0}>
        <InfoIcons headingIcon={faPen} headingTitle='Módosítva:' infoArray={diffInfo.modifiedInfo} {...{ variant }} />
      </When>

      <When condition={diffInfo.newInfo.length === 0 && diffInfo.modifiedInfo.length === 0}>
        <InfoIconsHeading icon={faCopy} label='Nincs változtatás' />
      </When>
    </StepButton>
  )
}
