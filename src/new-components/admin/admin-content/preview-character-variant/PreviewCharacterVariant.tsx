import { StepButton, useTheme } from '@mui/material'
import { faCheck, faCopy, faEquals, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { DiffedCharacterEntryVariant } from '../../../shared/logic/loadAdminChar'
import { ModifiedInfoIcons, NewInfoIcons } from './InfoIcons'
import { When } from 'react-if'
import { InfoIconsHeading } from './InfoIconsHeading'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export function PreviewCharacterVariant({
  isActive,
  onClick,
  variant,
}: {
  isActive: boolean
  onClick: () => void
  variant: DiffedCharacterEntryVariant
}) {
  return (
    <StepButton
      {...{ onClick }}
      sx={{
        borderRadius: ({ spacing }) => spacing(6),
        boxShadow: ({ constants }) => (isActive ? constants.boxShadow : undefined),
        my: 1,
        transition: ({ constants }) => constants.animationDuration,
        '.MuiStepLabel-label': { display: 'flex', gap: 1.5 },
        '.MuiStepLabel-iconContainer': { pr: 0.5 },
        ':hover': { boxShadow: ({ constants }) => constants.boxShadow },
      }}
    >
      <When condition={variant.newInfo.length > 0}>
        <NewInfoIcons {...{ variant }} />
      </When>

      <When condition={variant.modifiedInfo.length > 0}>
        <ModifiedInfoIcons {...{ variant }} />
      </When>

      <When condition={variant.newInfo.length === 0 && variant.modifiedInfo.length === 0}>
        <InfoIconsHeading icon={faCopy} label='Nincs változtatás' />
      </When>
    </StepButton>
  )
}
