import { Params, redirect } from 'react-router-dom'
import { CharFormSteps } from '../../admin/admin-char-edit/char-form/CharForm'

export function loadCharForm({ params }: { params: Params }): Response | null {
  if (
    !params.step ||
    ![CharFormSteps.CHARACTER, CharFormSteps.CONSTITUENTS, CharFormSteps.OTHER_USES].includes(params.step as CharFormSteps)
  ) {
    return redirect(`/admin/characters/${encodeURI(params.glyph!)}/form/1`)
  }

  return null
}
