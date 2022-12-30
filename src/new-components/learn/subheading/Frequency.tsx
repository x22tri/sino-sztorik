import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { LearnActionButton } from '../../shared/basic-components'

export default function Frequency({ frequency }: { frequency?: number }) {
  return (
    <LearnActionButton
      color='neutral'
      icon={faChartColumn}
      label='Gyakoriság'
    />
  )
}
