import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup, Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Typography } from '@mui/material'
import { useState, useRef } from 'react'
import { LEARN_BUTTON, LEARN_BUTTON_EXPLANATION, REVIEW_BUTTON, REVIEW_BUTTON_EXPLANATION } from '../../shared/strings'
import { LessonStatuses, TierStatuses } from '../../shared/interfaces'
import { When } from 'react-if'

const { UPCOMING, COMPLETED } = LessonStatuses

const options = [
  { button: LEARN_BUTTON, explanation: LEARN_BUTTON_EXPLANATION },
  { button: REVIEW_BUTTON, explanation: REVIEW_BUTTON_EXPLANATION },
]

export function LearnReviewButton({ tierStatuses }: { tierStatuses: TierStatuses }) {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const availableOptions = options.filter(
    ({ button }) =>
      (button === LEARN_BUTTON && tierStatuses.includes(UPCOMING)) ||
      (button === REVIEW_BUTTON && tierStatuses.includes(COMPLETED))
  )

  const clickActionButton = () => console.info(`You clicked ${options[selectedIndex].button}`)

  const clickMenuItem = (index: number) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const clickToggle = () => setOpen(prevOpen => !prevOpen)

  const closeMenu = ({ target }: Event) => {
    if (anchorRef.current?.contains(target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <ButtonGroup
        color={availableOptions[selectedIndex].button === LEARN_BUTTON ? 'secondary' : 'primary'}
        disableElevation
        variant='contained'
        sx={{ borderRadius: 6, justifySelf: 'center', maxHeight: '42px', width: '100%' }}
      >
        <Button onClick={clickActionButton} sx={{ borderRadius: 6, width: '100%' }}>
          {availableOptions[selectedIndex].button}
        </Button>

        <When condition={availableOptions.length > 1}>
          <Button onClick={clickToggle} ref={anchorRef} sx={{ borderRadius: 6 }}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </When>
      </ButtonGroup>

      <Popper anchorEl={anchorRef.current} {...{ open }} placement='top-end' transition sx={{ zIndex: 1 }}>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={closeMenu}>
                <MenuList autoFocusItem>
                  {availableOptions.map(({ button, explanation }, index) => (
                    <MenuItem
                      key={button}
                      onClick={() => clickMenuItem(index)}
                      selected={index === selectedIndex}
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
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
