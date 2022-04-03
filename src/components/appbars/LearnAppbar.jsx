import React from "react";
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { keywordPrimitiveStatusFinder } from "../../auxiliaries/keywordPrimitiveStatusFinder";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { AppbarWrapper, TopbarButton, ThemeChangeButton } from './AppbarWrapper'
import './appbars.css';

const LearnAppbar = ({ currentChar, currentCharacterIndex, lessonLength, lastCharacterInLesson, themeToggle, onArrowClick }) => {

    // Setting up the styled elements.
    const theme = useTheme()

    const topbarContentColor = theme.palette.type === 'dark' ? theme.palette.grey[600] : theme.palette.primary.light
    const topbarBackgroundColor = theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.primary.dark
    const topbarBorderBottom = `0px solid`

    const LessonProgressBox = () => (
    <Box className={'disable-select topbar-progressbox centerer'} sx={{color: theme.palette.primary.topbarButton, fontWeight: 'bold'}}>
        {currentChar && `${currentCharacterIndex + 1}/${lessonLength}`}
    </Box>
    )

    const DetailsButton = () => (
        <Box sx={{display: { xs: 'flex', md: 'none' } }}>
            <TopbarButton onClick={() => console.log('click')} textContent='Részletek' startIcon={<FontAwesomeIcon icon={faBars} />} />
        </Box>
    )

    const BackToLastChar = () => {
        const renderedPropertyDictionary = {
            none: [null],
            primitiveOnly: ['primitiveMeaning'],
            keywordOnly: ['keyword'],
            keywordAndPrimitive: ['keyword']
        }

        const renderedProperty = keywordPrimitiveStatusFinder(lastCharacterInLesson)
        const renderedText = lastCharacterInLesson[renderedPropertyDictionary[renderedProperty]]

        return (
            <TopbarButton color={!currentChar && topbarContentColor}
                onClick={() => onArrowClick('left')} textContent={renderedText} startIcon={<ArrowRightAltIcon transform="scale(-1.4)" />} />
        )
    }

    const QuitLessonButton = () => (
        <Link to="/">
            <TopbarButton color={!currentChar && topbarContentColor} iconContent={<CloseIcon transform="scale(1.4)"/>} tooltip='Kilépés a leckeválasztóba (Esc)' />
        </Link>
    )

    // The main return on the function.
    return (
    <AppbarWrapper color={!currentChar && topbarBackgroundColor} borderBottom={!currentChar && topbarBorderBottom}>
        
        {/* Adding the "Show details" icon button (along with a text label) in the top left 
        if the viewport is smaller than medium and we're still in the character array.
        If we're at the LessonEndPage, a back arrow that leads to the last character in the array is shown
        in the top left instead of the "Details" button.
        Nothing is shown when neither condition is met (i.e. we're at the LessonStartPage). */}
        {currentChar && <DetailsButton />}
        {!currentChar && (currentCharacterIndex >= lessonLength) && <BackToLastChar />}

        <LessonProgressBox />
        <ThemeChangeButton {...{themeToggle}} color={!currentChar && topbarContentColor} />
        <QuitLessonButton />
    </AppbarWrapper>
    )
}

export default LearnAppbar