import { Params, redirect } from 'react-router-dom'

export function loadCharTimeline({ params }: { params: Params }): Response | null {
  if (!params.tier || !['1', '2', '3', '4'].includes(params.tier)) {
    return redirect(`/admin/characters/${encodeURI(params.glyph!)}/timeline/1`)
  }

  return null
}
