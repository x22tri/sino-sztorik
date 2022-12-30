import Divider from '@mui/material/Divider'
import { Stack } from '@mui/material'
import { StoryTypeSwitch } from './StoryTypeSwitch'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { LearnActionButton } from '../../shared/basic-components'

export function StorySubheadingEndContent() {
  return (
    <Stack
      direction='row'
      gap={1}
      divider={<Divider flexItem orientation='vertical' />}
    >
      <LearnActionButton
        color='neutral'
        icon={faClockRotateLeft}
        label='Előzmény: []'
      />
      <StoryTypeSwitch />
    </Stack>
  )
}
