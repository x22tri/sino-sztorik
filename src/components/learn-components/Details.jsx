import React from 'react'
import { styled, useTheme } from '@mui/system'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
  faEye,
  faLightbulb,
  faCubes,
  faBook,
  faChartColumn,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons'

import Frequency from './details-components/Frequency'
import OtherUses from './details-components/OtherUses'
import ClickableCharList from './details-components/ClickableCharList'
import PopupTooltip from '../../auxiliaries/PopupTooltip'

import './Details.css'

const detailsWidthCollapsed = 50
const detailsWidthExpanded = 240
const transitionTimeout = 700

const nameIconDictionary = {
  similarAppearance: ['HASONLÓ KINÉZET', faEye],
  similarMeaning: ['HASONLÓ JELENTÉS', faLightbulb],
  constituentList: ['A KARAKTER ALAPELEMEI', faCubes],
  phrases: ['ÖSSZETÉTELEKBEN', faBook],
  frequency: ['GYAKORISÁG', faChartColumn],
  otherUses: ['EGYÉB JELENTÉSEK', faCommentDots],
}

export default function Details({
  currentChar,
  detailsToggle,
  dispatch,
  state,
  wideDetails,
}) {
  const theme = useTheme()

  const StyledIconButton = styled(IconButton)(() => ({
    color: theme.palette.primary.lowPrioSidebarText,
    '&:hover': {
      opacity: 0.6,
      backgroundColor: 'inherit',
    },
  }))

  // The main return on the exported function.
  if (!currentChar) return null
  else
    return (
      <List
        dense
        className='details-box centerer'
        sx={{
          display: { xs: 'none', md: 'flex' },
          backgroundColor: theme.palette.background.default,
          paddingTop: '6px',
        }}
      >
        <Collapse
          orientation='horizontal'
          in={wideDetails}
          timeout={transitionTimeout}
          collapsedSize={`${detailsWidthCollapsed}px`}
          sx={{
            '& .MuiCollapse-wrapperInner': {
              width: `${detailsWidthExpanded}px`,
            },
          }}
        >
          {/* Expand/Collapse chevron button */}
          {(currentChar.character?.constituents?.length ||
            currentChar.character?.frequency) && (
            <PopupTooltip title={'Részletek megjelenítése/elrejtése'}>
              <Box
                className='chevron-box'
                style={{
                  transition: `transform ${transitionTimeout}ms`,
                  transform: !wideDetails ? '' : 'rotate(180deg)',
                }}
              >
                <StyledIconButton onClick={detailsToggle}>
                  <ChevronLeftIcon />
                </StyledIconButton>
              </Box>
            </PopupTooltip>
          )}

          <ClickableCharList
            in={wideDetails}
            nameAndIcon={nameIconDictionary.constituentList}
            type='constituentList'
            // currentChar={currentChar?.character}
            sourceArray={currentChar.character?.constituents}
            {...{ currentChar, state, dispatch, transitionTimeout }}
          />

          <Frequency
            in={wideDetails}
            frequency={currentChar.character?.frequency}
            nameAndIcon={nameIconDictionary.frequency}
            {...{ transitionTimeout }}
          />

          <ClickableCharList
            in={wideDetails}
            nameAndIcon={nameIconDictionary.phrases}
            type='phrases'
            sourceArray={currentChar.phrases}
            {...{ currentChar, dispatch, transitionTimeout }}
          />

          <ClickableCharList
            in={wideDetails}
            nameAndIcon={nameIconDictionary.similarAppearance}
            type='similarAppearance'
            sourceArray={currentChar.similarAppearance}
            {...{ currentChar, dispatch, transitionTimeout }}
          />

          <ClickableCharList
            in={wideDetails}
            nameAndIcon={nameIconDictionary.similarMeaning}
            type='similarMeaning'
            sourceArray={currentChar.similarMeaning}
            {...{ currentChar, dispatch, transitionTimeout }}
          />

          <OtherUses
            in={wideDetails}
            nameAndIcon={nameIconDictionary.otherUses}
            otherUseArray={currentChar.otherUses}
            {...{ transitionTimeout }}
          />
        </Collapse>
      </List>
    )
}
