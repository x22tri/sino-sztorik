import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Button, MenuItem, Typography, Menu, Box } from '@mui/material'
import { useState, useRef, RefObject } from 'react'
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
  const [open, setOpen] = useState(false)
  const [selectedModeIndex, setSelectedModeIndex] = useState(0)
  const { learnReviewOptions } = useLoaderData() as LoadLessonSelect

  const selectedButton = learnReviewOptions[selectedModeIndex]

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

  useOnChange(lessonNumber, () => setSelectedModeIndex(0))

  return (
    <Unless condition={!learnReviewOptions?.length || !selectedButton}>
      {() => (
        <>
          <ButtonWithModeSwitcher
            onClickModeSwitcher={clickModeSwitcher}
            {...{ anchorRef, learnReviewOptions, selectedButton }}
          />

          <Menu
            anchorEl={anchorRef.current}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            keepMounted
            onClose={closeMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            {...{ open }}
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

function ButtonWithModeSwitcher({
  anchorRef,
  learnReviewOptions,
  selectedButton,
  onClickModeSwitcher,
}: {
  anchorRef: RefObject<HTMLButtonElement>
  learnReviewOptions: ButtonOption[]
  selectedButton: ButtonOption
  onClickModeSwitcher: () => void
}) {
  return (
    <Box display='flex' gap={2} sx={{ maxWidth: '300px' }}>
      <Button
        component={Link}
        to={selectedButton.link}
        variant={selectedButton.button === LEARN_BUTTON ? 'contained' : 'outlined'}
        sx={{ width: 1 }}
      >
        {selectedButton.button}
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
