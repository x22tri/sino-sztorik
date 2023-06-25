import { faKey, faCube, faBell, IconDefinition, faPlus, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Stack, Divider, Tooltip, IconButton } from '@mui/material'
import { SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { getReminderContentType } from './getReminderContentType'

export function AddOccurrenceOptions({ occurrences, index }: { occurrences: SortedOccurrences; index: number }) {
  const canAddKeyword = !occurrences.some(({ type }) => ['keyword', 'keywordAndPrimitive'].includes(type))

  const canAddPrimitive = !occurrences.some(({ type }) => ['keyword', 'primitive', 'keywordAndPrimitive'].includes(type))

  const canAddReminder = getReminderContentType(occurrences, index) !== null

  return (
    <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={2}>
      {!canAddKeyword ? false : <AddOccurrence icon={faKey} tooltip='Kulcsszó hozzáadása' onClick={() => {}} />}

      {!canAddPrimitive ? false : <AddOccurrence icon={faCube} tooltip='Alapelem hozzáadása' onClick={() => {}} />}

      {!canAddReminder ? false : <AddOccurrence icon={faBell} tooltip='Emlékeztető hozzáadása' onClick={() => {}} />}
    </Stack>
  )
}

export function AddOccurrence({
  icon,
  isAction = false,
  tooltip,
  mode = 'add',
  onClick,
}: {
  icon: IconDefinition
  isAction?: boolean
  tooltip: string
  mode?: 'add' | 'edit'
  onClick: () => void
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        className='fa-layers'
        {...{ onClick }}
        sx={{ color: isAction ? undefined : 'text.disabled', justifyContent: 'center' }}
      >
        <FontAwesomeIcon className='fa-fw' {...{ icon }} transform='left-4' />

        <FontAwesomeIcon icon={mode === 'add' ? faPlus : faPen} transform='shrink-6 up-9 right-9' />
      </IconButton>
    </Tooltip>
  )
}
