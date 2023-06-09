import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup, Button, MenuItem, Typography, Menu, ButtonProps, ButtonGroupProps } from '@mui/material'
import { useState, useRef, RefObject } from 'react'
import { LEARN_BUTTON, LEARN_BUTTON_EXPLANATION, REVIEW_BUTTON, REVIEW_BUTTON_EXPLANATION } from '../../shared/strings'
import { LessonStatuses, TierStatuses } from '../../shared/interfaces'
import { Else, If, Then } from 'react-if'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useStore } from '../../shared/logic/useStore'
import { LEARN_PATH, REVIEW_PATH } from '../../shared/paths'
import { loadLessonSelect } from '../../shared/logic/loadLessonSelect'

type ButtonOption = { button: string; explanation: string }

const { COMPLETED } = LessonStatuses

const options: ButtonOption[] = [
  { button: LEARN_BUTTON, explanation: LEARN_BUTTON_EXPLANATION },
  { button: REVIEW_BUTTON, explanation: REVIEW_BUTTON_EXPLANATION },
]

export function LearnReviewButton({ lessonNumber, tierStatuses }: { lessonNumber: number; tierStatuses: TierStatuses }) {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selectedModeIndex, setSelectedModeIndex] = useState(0)
  const { selectedLessonIndex } = useStore('lessonSelect')
  const { upcomingIndex } = useLoaderData() as ReturnType<typeof loadLessonSelect>

  const availableOptions = options.filter(
    ({ button }) =>
      (button === LEARN_BUTTON && upcomingIndex === lessonNumber - 1) ||
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
    navigate(selectedButton === LEARN_BUTTON ? LEARN_PATH : `${REVIEW_PATH}/${lessonNumber}`)
  }

  useOnChange(selectedLessonIndex, () => setSelectedModeIndex(0))

  return (
    <>
      <ButtonOrButtonGroup
        buttonText={selectedButton}
        onClickMainButton={() => startLesson(selectedButton)}
        onClickModeSwitcher={clickModeSwitcher}
        stylingProps={{
          variant: selectedButton === LEARN_BUTTON ? 'contained' : 'outlined',
          sx: { m: 'auto', width: 1, maxWidth: '300px' },
        }}
        {...{ anchorRef, availableOptions }}
      />

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
            <Typography noWrap lineHeight={1}>
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

function ButtonOrButtonGroup({
  anchorRef,
  availableOptions,
  buttonText,
  stylingProps,
  onClickMainButton,
  onClickModeSwitcher,
}: {
  anchorRef: RefObject<HTMLButtonElement>
  availableOptions: ButtonOption[]
  buttonText: string
  stylingProps: ButtonProps | ButtonGroupProps
  onClickMainButton: () => void
  onClickModeSwitcher: () => void
}) {
  return (
    <If condition={availableOptions.length > 1}>
      <Then>
        <ButtonGroup {...(stylingProps as ButtonGroupProps)}>
          <Button onClick={onClickMainButton} sx={{ borderRadius: 6, width: 1 }}>
            {buttonText}
          </Button>

          <Button onClick={onClickModeSwitcher} ref={anchorRef} sx={{ borderRadius: 6 }}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </ButtonGroup>
      </Then>

      <Else>
        <Button {...(stylingProps as ButtonProps)} onClick={onClickMainButton}>
          {buttonText}
        </Button>
      </Else>
    </If>
  )
}
