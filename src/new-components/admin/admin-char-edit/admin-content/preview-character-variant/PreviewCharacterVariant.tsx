import { StepButton } from '@mui/material'
import { CharacterEntryVariant } from '../../../../shared/MOCK_DATABASE_ENTRIES'

export function PreviewCharacterVariant({
  isActive,
  onClick,
  variant,
}: {
  isActive: boolean
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
      {/* <When condition={diffInfo.newInfo.length > 0}>
        <InfoIcons headingIcon={faPlus} headingTitle='Hozzáadva:' infoArray={diffInfo.newInfo} {...{ variant }} />
      </When>

      <When condition={diffInfo.modifiedInfo.length > 0}>
        <InfoIcons headingIcon={faPen} headingTitle='Módosítva:' infoArray={diffInfo.modifiedInfo} {...{ variant }} />
      </When>

      <When condition={diffInfo.newInfo.length === 0 && diffInfo.modifiedInfo.length === 0}>
        <InfoIconsHeading icon={faCopy} label='Nincs változtatás' />
      </When> */}
    </StepButton>
  )
}
