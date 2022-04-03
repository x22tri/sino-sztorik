import React from "react";

import { useTheme } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { SecondaryColorButton, LessonContentCharacter } from '../../component-library/GenericComponents'

import getRomanNumeralForTier from '../../auxiliaries/getRomanNumeralForTier'
import splitPrefaceIntoParagraphs from '../../auxiliaries/splitPrefaceIntoParagraphs'
import './LessonStartPage.css';

export default function LessonStartPage({ onArrowClick, currentTier, currentLesson, lessonName, preface, characterArray }) {
    const theme = useTheme()
    const backgroundColor = theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.primary.dark

    return (
        <Box className='lesson-start-page' sx={{backgroundColor: backgroundColor}}>
            <Box className='lesson-start-body'>
                <Box sx={{color: theme.palette.secondary.main}}>
                    <Typography variant='h5'>
                    {`${getRomanNumeralForTier(currentTier)}. KÖR, ${currentLesson}. LECKE`}
                    </Typography>
                </Box>
                <Box className='lesson-start-name' sx={{color: theme.palette.secondary.main}}>
                    <Typography variant='mainPageSecondaryHeading'>
                    {lessonName}
                    </Typography>
                </Box>
                <Box className='lesson-start-text' sx={{color: theme.palette.primary.contrastText}}>
                {splitPrefaceIntoParagraphs(preface)}
                </Box>

                <Box className='lesson-start-character-list-header' sx={{color: theme.palette.secondary.main}}>
                A lecke tartalma:
                </Box>

                <Box className='lesson-start-character-list' sx={{color: theme.palette.primary.contrastText}}>
                {characterArray.map((char, index) => <LessonContentCharacter key={index} char={char.character.charChinese} />)}                
                </Box>
                    
                <SecondaryColorButton onClick={() => onArrowClick('right')} text='Kezdés' endIcon={<ArrowRightAltIcon sx={{transform: 'scaleX(1.3) scaleY(1.3)'}} />} />
            </Box>
        </Box>
        );
}