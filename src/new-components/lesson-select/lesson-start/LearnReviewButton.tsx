import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup, Button, MenuItem, Typography, Menu, ButtonProps, ButtonGroupProps } from '@mui/material'
import { useState, useRef, RefObject } from 'react'
import { LEARN_BUTTON } from '../../shared/strings'
import { Else, If, Then, Unless } from 'react-if'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { LEARN_PATH, REVIEW_PATH } from '../../shared/paths'
import { ButtonOption, LoadLessonSelect } from '../../shared/logic/loadLessonSelect'

export function LearnReviewButton() {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const params = useParams<{ lessonNumber: string }>()
  const lessonNumber = Number(params.lessonNumber)
  const [open, setOpen] = useState(false)
  const [selectedModeIndex, setSelectedModeIndex] = useState(0)
  const { learnReviewOptions } = useLoaderData() as LoadLessonSelect

  const selectedButton = learnReviewOptions[selectedModeIndex]?.button

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

  useOnChange(lessonNumber, () => setSelectedModeIndex(0))

  return (
    <Unless condition={!learnReviewOptions?.length}>
      {() => (
        <>
          <ButtonOrButtonGroup
            buttonText={selectedButton}
            onClickMainButton={() => startLesson(selectedButton)}
            onClickModeSwitcher={clickModeSwitcher}
            stylingProps={{
              variant: selectedButton === LEARN_BUTTON ? 'contained' : 'outlined',
              sx: { m: 'auto', width: 1, maxWidth: '300px' },
            }}
            {...{ anchorRef, learnReviewOptions }}
          />

          <Menu
            anchorEl={anchorRef.current}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            keepMounted
            onClose={closeMenu}
            {...{ open }}
            transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {learnReviewOptions.map(({ button, explanation }, index) => (
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
      )}
    </Unless>
  )
}

function ButtonOrButtonGroup({
  anchorRef,
  buttonText,
  learnReviewOptions,
  stylingProps,
  onClickMainButton,
  onClickModeSwitcher,
}: {
  anchorRef: RefObject<HTMLButtonElement>
  buttonText: string
  learnReviewOptions: ButtonOption[]
  stylingProps: ButtonProps | ButtonGroupProps
  onClickMainButton: () => void
  onClickModeSwitcher: () => void
}) {
  return (
    <If condition={learnReviewOptions.length > 1}>
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
