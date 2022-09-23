import React, { useState, forwardRef, useEffect } from 'react'

import { useTheme } from '@mui/system'
import Box from '@mui/material/Box'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { CharacterInfo } from './charcard-components/CharacterInfo'
import Story from './charcard-components/Story'
import { TabHotkey, TabPanel } from './TabElements'
import useEventListener from '../../auxiliaries/useEventListener'

const Recap = ({
  anchorEl,
  content,
  setAnchorEl,
  setClickedIndex,
  dispatch,
}) => {
  const theme = useTheme()

  // Creating the array of objects to be mapped to Tabs.
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    Array.isArray(content) ? setCharacters(content) : setCharacters([content])
  }, [content])

  // Setting up state for which Tab we are on.
  const [value, setValue] = useState(0)
  const handleTabChange = (_, newValue) => setValue(newValue)

  // Setting up scrolling when element is rendered.
  const [fieldRef, setFieldRef] = useState(null)
  const recapFieldRef = ref => {
    if (ref) setFieldRef(ref)
  }
  useEffect(() => {
    if (fieldRef)
      fieldRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [fieldRef, value])

  // Resetting state when closing the popper.
  const handleClose = () => {
    setAnchorEl(null)
    setClickedIndex(null)
    setValue(0)
    dispatch({ type: 'unclick' })
  }

  // Setting up scrolling between tabs with the Q and E keys.
  useEventListener(
    'keydown',
    ({ key }) => {
      if (key === 'q') {
        if (value > 0) setValue(value - 1)
      } else if (key === 'e') {
        if (characters && value < characters.length - 1) setValue(value + 1)
      } else {
        handleClose()
      }
    },
    true
  )

  if (!characters) return null
  else
    return (
      <Popper
        placement='bottom-start'
        open={!!anchorEl}
        {...{ anchorEl }}
        style={{ zIndex: 1050 }}
        modifiers={[
          { name: 'flip', enabled: false },
          { name: 'preventOverflow', enabled: false },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Box
            display='flex'
            flexDirection='column'
            width='600px'
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: 5,
              border: `3px double ${theme.palette.divider}`,
              borderRadius: '8px',
              // marginBottom: '16px'
            }}
          >
            {/* Adding the CharacterInfo of the selected character */}
            <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Tabs
                textColor='inherit'
                onChange={handleTabChange}
                {...{ value }}
                centered
                variant='fullWidth'
                TabIndicatorProps={{
                  sx: {
                    height: 3,
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {characters.map((char, index) => (
                  <Tab
                    key={index}
                    component={forwardRef((props, ref) => (
                      <Box {...props} ref={ref} flex={1} position='relative'>
                        <TabHotkey {...{ value, index, characters }} />
                        <CharacterInfo small char={char} />
                      </Box>
                    ))}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Adding the Story of the selected character */}
            <Box ref={recapFieldRef}>
              {characters.map((char, index) => (
                <TabPanel key={index} {...{ value, index }}>
                  {char?.story ? (
                    <Story small story={char.story} />
                  ) : (
                    'A történet nem elérhető.'
                  )}
                </TabPanel>
              ))}
            </Box>
          </Box>
        </ClickAwayListener>
      </Popper>
    )
}

export default Recap
