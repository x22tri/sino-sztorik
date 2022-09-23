import React, { useState, forwardRef } from 'react'
import { useTheme } from '@mui/system'

import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import ConditionalWrapper from '../../../auxiliaries/ConditionalWrapper'
import Recap from '../Recap'
import './Lists.css'

const PrimitiveAsSecondElement = ({ primitive }) => (
  <>
    <Box
      component='span'
      paddingRight='4px'
      color={useTheme().palette.tertiary.main}
    >
      <FontAwesomeIcon icon={faCube} />
    </Box>
    <Typography
      variant='detailsItem'
      className='list-item-second-element-span'
      color={useTheme().palette.tertiary.main}
    >
      {primitive}
    </Typography>
  </>
)

const PrimitiveAsThirdElement = ({
  primitive,
  transitionTimeout,
  in: inProp,
}) => (
  <Collapse in={inProp} timeout={transitionTimeout}>
    <ListItem sx={{ py: 0 }}>
      <ListItemText
        className='list-item-third-element'
        sx={{ paddingLeft: '40px' }}
        primary={
          <Box display='flex' sx={{ color: useTheme().palette.tertiary.main }}>
            <KeyboardReturnIcon
              fontSize='small'
              sx={{
                transform: 'scaleX(-1)',
                color: useTheme().palette.primary.detailsElementText,
              }}
            />
            <Box component='span' paddingRight='4px'>
              <FontAwesomeIcon icon={faCube} />
            </Box>
            <Typography variant='detailsItemPrimitive'>{primitive}</Typography>
          </Box>
        }
      />
    </ListItem>
  </Collapse>
)

// The main export: a list of elements that all have Chinese characters on their left side and Hungarian text the right side.
const ClickableCharListElement = forwardRef(
  (
    {
      character,
      fade = false,
      dispatch,
      state,
      id,
      index,
      firstElement = <FontAwesomeIcon icon={faQuestionCircle} />,
      secondElement = 'Ismeretlen',
      thirdElement = null,
      transitionTimeout,
      in: inProp,
    },
    ref
  ) => {
    const theme = useTheme()

    // Sets the popover state.
    const [anchorEl, setAnchorEl] = useState(null)
    const [content, setContent] = useState({})
    const [clickedIndex, setClickedIndex] = useState(null)

    const handleClick = (event, character) => {
      if (!character) return
      else {
        setAnchorEl(event.currentTarget || ref.current)
        setContent(character)
        setClickedIndex(index)
      }
    }

    // The returned component.
    return (
      <>
        <ListItemButton
          onClick={event => handleClick(event, character)}
          selected={clickedIndex === index && !!character}
          sx={{
            padding: '6px 0 2px',
            backgroundColor:
              character?.charChinese &&
              character?.charChinese === state?.hoveredConstituentChinese &&
              theme.palette.action.hover,
          }}
          {...{ id, ref }}
        >
          <Box>
            <ListItem disablePadding>
              <ListItemIcon
                className='list-item-first-element'
                sx={{
                  color: theme.palette.primary.detailsElementText,
                  marginBottom: '5px',
                }}
              >
                <Typography variant='detailsItemChinese'>
                  {firstElement}
                </Typography>
              </ListItemIcon>

              <ConditionalWrapper
                condition={fade}
                wrapper={children => (
                  <Fade in={inProp} timeout={transitionTimeout} appear={false}>
                    {children}
                  </Fade>
                )}
              >
                <ListItemText
                  className='list-item-second-element'
                  sx={{ color: theme.palette.primary.detailsElementText }}
                  primary={
                    <Typography
                      variant='detailsItem'
                      className='list-item-second-element-span'
                    >
                      {secondElement === character?.primitiveMeaning ? (
                        <PrimitiveAsSecondElement primitive={secondElement} />
                      ) : (
                        secondElement
                      )}
                    </Typography>
                  }
                />
              </ConditionalWrapper>
            </ListItem>

            {thirdElement && (
              <PrimitiveAsThirdElement
                primitive={thirdElement}
                in={inProp}
                {...{ transitionTimeout }}
              />
            )}
          </Box>
        </ListItemButton>

        {content && (
          <Recap
            {...{ content, anchorEl, setAnchorEl, setClickedIndex, dispatch }}
          />
        )}
      </>
    )
  }
)

export default ClickableCharListElement
