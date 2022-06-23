import { useState } from 'react'

import Box from '@mui/material/Box'

import CharacterCard from './CharacterCard'
import Details from './Details'
import useConstituentReducer from '../../auxiliaries/useConstituentReducer'

const LessonMainPage = ({
  currentChar,
  characterArray,
  currentCharacterIndex,
  onArrowClick,
}) => {
  // This reducer manages the hover/click connection between Story and the list of constituents.
  const [state, dispatch] = useConstituentReducer()

  // Setting up state for whether the constituent list is in the compact or wide view.
  const [wideDetails, setWideDetails] = useState(true)
  const detailsToggle = () => setWideDetails(prevMode => !prevMode)

  return (
    <Box display='flex' marginTop='15px'>
      <Details
        {...{ currentChar, wideDetails, detailsToggle, state, dispatch }}
      />
      <CharacterCard
        {...{
          currentChar,
          characterArray,
          currentCharacterIndex,
          state,
          dispatch,
          onArrowClick,
        }}
      />
      <Box flex={1} />
    </Box>
  )
}

export default LessonMainPage
