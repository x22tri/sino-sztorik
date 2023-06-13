import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Button, MenuItem, Typography, Menu, Box } from '@mui/material'
import { useState, useRef, RefObject, useEffect } from 'react'
import { LEARN_BUTTON, LESSON_START_MORE_OPTIONS } from '../../shared/strings'
import { Unless, When } from 'react-if'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import { ButtonOption, LoadLessonSelect } from '../../shared/logic/loadLessonSelect'
import ToolbarButton from '../../shared/components/ToolbarButton'

export function LearnReviewButton() {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const params = useParams<{ lessonNumber: string }>()
  const lessonNumber = Number(params.lessonNumber)
  const [isModeSwitcherOpen, toggleModeSwitcher] = useState(false)
  const { learnReviewOptions } = useLoaderData() as LoadLessonSelect
  const [selectedModeIndex, setSelectedModeIndex] = useState(0)

  useOnChange(lessonNumber, () => {
    setSelectedModeIndex(0)
  })

  function clickMenuItem(index: number) {
    setSelectedModeIndex(index)
    toggleModeSwitcher(false)
  }

  function clickModeSwitcher() {
    toggleModeSwitcher(prevOpen => !prevOpen)
  }

  function closeMenu({ target }: Event) {
    if (anchorRef.current?.contains(target as HTMLElement)) {
      return
    }

    toggleModeSwitcher(false)
  }

  return (
    <Unless condition={!learnReviewOptions?.length}>
      <ButtonWithModeSwitcher onClickModeSwitcher={clickModeSwitcher} {...{ anchorRef, learnReviewOptions, selectedModeIndex }} />

      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        keepMounted
        onClose={closeMenu}
        open={isModeSwitcherOpen}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {learnReviewOptions.map(({ buttonText, explanation }, index) => (
          <MenuItem
            key={index}
            onClick={() => clickMenuItem(index)}
            selected={index === selectedModeIndex}
            sx={{ display: 'block' }}
          >
            <Typography noWrap lineHeight={1}>
              {buttonText}
            </Typography>

            <Typography color='text.secondary' noWrap variant='caption'>
              {explanation}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Unless>
  )
}

function ButtonWithModeSwitcher({
  anchorRef,
  learnReviewOptions,
  selectedModeIndex,
  onClickModeSwitcher,
}: {
  anchorRef: RefObject<HTMLButtonElement>
  learnReviewOptions: ButtonOption[]
  selectedModeIndex: number
  onClickModeSwitcher: () => void
}) {
  const [{ link, buttonText }, setSelectedButton] = useState(learnReviewOptions[selectedModeIndex])

  useEffect(() => {
    if (learnReviewOptions[selectedModeIndex]) {
      setSelectedButton(learnReviewOptions[selectedModeIndex])
    }
  }, [learnReviewOptions, selectedModeIndex])

  return (
    <Box display='flex' gap={2} sx={{ maxWidth: '300px' }}>
      <Button component={Link} to={link} variant={buttonText === LEARN_BUTTON ? 'contained' : 'outlined'} sx={{ width: 1 }}>
        {buttonText}
      </Button>

      <When condition={learnReviewOptions.length > 1}>
        <ToolbarButton
          icon={faEllipsisVertical}
          innerRef={anchorRef}
          onClick={onClickModeSwitcher}
          size='small'
          tooltip={LESSON_START_MORE_OPTIONS}
        />
      </When>
    </Box>
  )
}
