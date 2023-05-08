import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup, Button, MenuItem, Typography, Menu } from '@mui/material'
import { useState, useRef } from 'react'
import {
  LEARN_BUTTON,
  LEARN_BUTTON_EXPLANATION,
  LOADING_PLACEHOLDER,
  REVIEW_BUTTON,
  REVIEW_BUTTON_EXPLANATION,
} from '../../shared/strings'
import { LessonStatuses, TierStatuses } from '../../shared/interfaces'
import { When } from 'react-if'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../shared/logic/useStore'
import { LEARN_PATH, REVIEW_PATH } from '../../shared/paths'

const { UPCOMING, COMPLETED } = LessonStatuses

const options = [
  { button: LEARN_BUTTON, explanation: LEARN_BUTTON_EXPLANATION },
  { button: REVIEW_BUTTON, explanation: REVIEW_BUTTON_EXPLANATION },
]

export function LearnReviewButton({ lessonNumber, tierStatuses }: { lessonNumber: number; tierStatuses: TierStatuses }) {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selectedModeIndex, setSelectedModeIndex] = useState(0)
  const { selectedLessonIndex } = useStore('lessonSelect')

  const availableOptions = options.filter(
    ({ button }) =>
      (button === LEARN_BUTTON && tierStatuses.includes(UPCOMING)) ||
      (button === REVIEW_BUTTON && tierStatuses.includes(COMPLETED))
  )

  const selectedButton = availableOptions[selectedModeIndex]?.button

  function clickMenuItem(index: number) {
    setSelectedModeIndex(index)
    setOpen(false)
  }

  function clickModeSwitcher() {
    setOpen(prevOpen => !prevOpen)
  }

  function closeMenu({ target }: Event) {
    if (anchorRef.current?.contains(target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function startLesson(selectedButton: string) {
    if (selectedButton === LEARN_BUTTON) {
      navigate(LEARN_PATH)
    } else {
      navigate(`${REVIEW_PATH}/${lessonNumber}`)
    }
  }

  useOnChange(selectedLessonIndex, () => setSelectedModeIndex(0))

  return (
    <>
      <ButtonGroup
        color={selectedButton === LEARN_BUTTON ? 'secondary' : 'neutral'}
        disableElevation
        variant='contained'
        sx={{ borderRadius: 6, justifySelf: 'center', width: 1 }}
      >
        <Button onClick={() => startLesson(selectedButton)} sx={{ borderRadius: 6, width: 1 }}>
          {selectedButton ?? LOADING_PLACEHOLDER} {/* Placeholder needed so button doesn't disappear. */}
        </Button>

        <When condition={availableOptions.length > 1}>
          <Button onClick={clickModeSwitcher} ref={anchorRef} sx={{ borderRadius: 6 }}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </When>
      </ButtonGroup>

      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        keepMounted
        onClose={closeMenu}
        {...{ open }}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {availableOptions.map(({ button, explanation }, index) => (
          <MenuItem
            key={button}
            onClick={() => clickMenuItem(index)}
            selected={index === selectedModeIndex}
            sx={{ display: 'block' }}
          >
            <Typography noWrap lineHeight={1} variant='body2'>
              {button}
            </Typography>

            <Typography color='text.secondary' noWrap variant='caption'>
              {explanation}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
