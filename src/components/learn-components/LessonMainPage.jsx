import { useState } from 'react';

import Box from '@mui/material/Box';

import CharacterCard from "./CharacterCard";
import Details from "./Details";
import useConstituentReducer from "../../auxiliaries/useConstituentReducer";
import useEventListener from "../../auxiliaries/useEventListener";

const LessonMainPage = ({currentChar, characterArray, currentCharacterIndex, onArrowClick, searchBarTextFieldRef }) => {

    // This reducer manages the hover/click connection between Story and the list of constituents.
    const [state, dispatch] = useConstituentReducer()

    // Setting up state for whether the constituent list is in the compact or wide view.
    const [wideDetails, setWideDetails] = useState(true)
    const detailsToggle = () => setWideDetails(prevMode => !prevMode)

    // Setting up the hotkey to toggle wide / compact mode for the constituent list.
    useEventListener('keydown', ({ key }) => {
        if (key === 'r' && document.activeElement !== searchBarTextFieldRef?.current) detailsToggle()
    })

    return (
        <Box display='flex' marginTop='15px'>
            <Details {...{currentChar, wideDetails, detailsToggle, state, dispatch }} />
            <CharacterCard {...{currentChar, characterArray, currentCharacterIndex, state, dispatch, onArrowClick }} />
            <Box flex={1} /> 
        </Box>
)}

export default LessonMainPage