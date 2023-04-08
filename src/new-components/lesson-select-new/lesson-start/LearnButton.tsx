import { MajorActionButton } from '../../shared/basic-components'
import { LEARN_BUTTON } from '../../shared/strings'

export function LearnButton({ secondaryText }: { secondaryText?: string }) {
  return (
    <MajorActionButton
      text={LEARN_BUTTON}
      sx={{ alignSelf: 'center', maxHeight: '42px', width: '100%' }}
      {...{ secondaryText }}
    />
  )
}
