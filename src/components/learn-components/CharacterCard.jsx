import React from "react";

import { useTheme } from '@mui/system';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import ArrowButton from "./charcard-components/ArrowButton";
import { CharacterInfo } from "./charcard-components/CharacterInfo"
import Story from "./charcard-components/Story";
import './CharacterCard.css';

// A function that checks if there is an illustration for the current character.
// const getIllustration = (id) => {
//     let illustration
    
//     try {illustration = require(`../../assets/${id}.png`).default}
//     catch (err) {illustration = undefined}
//     return illustration
// }

const HeadingBox = ({ text, headingBoxEndText, headingBoxEndTextColor }) => {
    const theme = useTheme()
    return (
    <>
    <Box className='heading-box'>
        <Typography variant='h4' color={theme.palette.primary.lowPrioText}>{text}</Typography>
        {headingBoxEndText && <Typography variant='h4' color={headingBoxEndTextColor}>{headingBoxEndText}</Typography>}
    </Box>
    <Divider sx={{marginBottom: '10px'}}/>
    </>
    )
}

// Displays the arrows for the previous and the next character.
const ArrowBox = ({ characterArray, currentCharacterIndex, onArrowClick }) => {
    const previousChar = characterArray[currentCharacterIndex - 1]?.character
    const nextChar = characterArray[currentCharacterIndex + 1]?.character

    return (
        <Box className='arrows-box'>
            <ArrowButton
            direction='left'
            onClick={() => onArrowClick('left')}
            text={previousChar?.keyword && `${previousChar.keyword} (${previousChar.charChinese})`
            || previousChar?.primitiveMeaning && `${previousChar.primitiveMeaning} (${previousChar.charChinese})`
            || 'Vissza a lecke elejére'}
            />
            <ArrowButton
            direction='right'
            onClick={() => onArrowClick('right')}
            text={nextChar?.keyword && `${nextChar.keyword} (${nextChar.charChinese})`
            || nextChar?.primitiveMeaning && `${nextChar.primitiveMeaning} (${nextChar.charChinese})`
            || 'Lecke befejezése'}
            />
        </Box>
    )
}

export default function CharacterCard({ characterArray, currentChar, currentCharacterIndex, onArrowClick, state, dispatch }) {

    const theme = useTheme()

    // The main return on the function: the combination of CharacterInfo, Story,
    // and if the illustration / notes for the current character (if applicable).
    if (!currentChar?.character) return null
    else {
        // const illustration = getIllustration(currentChar?.charID)
        const illustration = false

        const reminderFrame = !!currentChar?.reminder
        const newPrimitiveFrame = !!currentChar?.newPrimitive

        // Setting up the character card's styles.
        let elevation = 3
        let paperBorder = null
        let keywordHeadingBoxEndText = null
        let keywordHeadingBoxEndTextColor = null

        // When in search mode (i.e. there is no characterArray), don't show the special frames.
        if (characterArray && reminderFrame) {
            elevation = 0
            paperBorder = `2px dashed ${theme.palette.primary.lowPrioText}`
            keywordHeadingBoxEndText = 'EMLÉKEZTETŐ'
        }
        if (characterArray && newPrimitiveFrame) {
            elevation = 0
            paperBorder = `2px dashed ${theme.palette.tertiary.main}`
            keywordHeadingBoxEndText = 'ÚJ JELENTÉS ALAPELEMKÉNT!'
            keywordHeadingBoxEndTextColor = theme.palette.tertiary.main
        }

        return (
        <Box className='character-card-box'>
            <Paper className='character-paper' {...{elevation}} sx={{border: paperBorder}}>
                <HeadingBox text='KULCSSZÓ' 
                    headingBoxEndText={keywordHeadingBoxEndText} 
                    headingBoxEndTextColor={keywordHeadingBoxEndTextColor} 
                />
                <CharacterInfo char={currentChar.character} />

                <HeadingBox text='TÖRTÉNET' 
                    headingBoxEndText={currentChar.character.prequel ? `ELŐZMÉNY: ${currentChar.character.prequel}` : null}
                />
                <Story story={currentChar.character.story} {...{ dispatch, state }}/>
            </Paper>

            {(illustration || currentChar.character.notes) &&    
            <Paper variant='outlined' className='illustration-notes-paper' sx={{backgroundColor: theme.palette.background.taglineSecondary}}>
                {illustration &&
                    <>
                    <HeadingBox text='ILLUSZTRÁCIÓ' />
                    <Box className='illustration'>
                        <img src={illustration} alt={currentChar.illustrationAltText || 'A karakter illusztrációja.'} />
                    </Box> 
                    </>}
            
                {currentChar.character.notes &&
                <>
                    <HeadingBox text='MEGJEGYZÉSEK' />
                    <Box sx={{color: theme.palette.primary.detailsElementText}}>
                    {currentChar.character.notes}
                    </Box>
                </>}
            </Paper>}

            {characterArray && onArrowClick && <ArrowBox {...{characterArray, currentCharacterIndex, onArrowClick}} />}
        </Box>
        )
    }
}