import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import PopupTooltip from "../../../auxiliaries/PopupTooltip";
import { useTheme } from '@mui/system';

// Setting up the different messages to be displayed.
const primitiveTooltipText = 'Így hívjuk majd az írásjelet, amikor más írásjelek eleméül szolgál, így könnyebb lesz beleillesztenünk a történetbe.'
const keywordTooltipText = 'Ezt jelenti az aktuális írásjel.'
const unspecifiedConstituent = 'A karakter egyik alapeleme.'
const clickToViewConstituent = 'Kattints, hogy megtekintsd ezt az alapelemet.'

// Setting up the interactive JSX elements to be inserted into the Story.
const PrimitiveMeaningSegment = ({ content }) => {
    const theme = useTheme()
    return (
    <PopupTooltip title={primitiveTooltipText}>
        <Box component='span' sx={{color: theme.palette.tertiary.main, borderBottom: '1px dashed', cursor: 'help'}}>
        {content}
        </Box>
    </PopupTooltip>
    )
}

const KeywordSegment = ({ content }) => {
    const theme = useTheme()
    return (
    <PopupTooltip title={keywordTooltipText}>
        <Box component='span' sx={{color: theme.palette.primary.dark, borderBottom: '1px dashed', cursor: 'help', fontWeight: 'bold'}}>
        {content}
        </Box>
    </PopupTooltip>
    )
}

const ConstituentSegment = ({ content, charChinese, small, state, dispatch, uniqueIndex,}) => {
    const theme = useTheme()
    const hoverBackgroundColor = theme.palette.divider
    return (
    <PopupTooltip title={!small ? clickToViewConstituent : unspecifiedConstituent}>
        <Box component='span' 
        onClick={() => !small && dispatch({type: 'click', payload: {...{charChinese, uniqueIndex}}})}
        onMouseOver={() => !small && dispatch({type: 'hover', payload: charChinese})}
        onMouseLeave={() => !small && dispatch({type: 'unhover'})}

        sx={{borderBottom: '1px dashed', cursor: 'help', fontStyle: 'italic',
        backgroundColor: (state?.clickedConstituent === uniqueIndex) && hoverBackgroundColor, 
        '&:hover': { backgroundColor: !small && hoverBackgroundColor } }}>
        {content}
        </Box>
    </PopupTooltip>
    )
}

// The exported function: the story with all keyword, primitive and constituent references turned into JSX elements.
const Story = ({ story, small, state, dispatch }) => {

    let [replacedText, setReplacedText] = useState('')

    useEffect(() => {
        const reactStringReplace = require('react-string-replace')

        // Splits the story into lines.
        let storySplitIntoParagraphs = story.split('\n\n')
        // Replaces elements in the format {k|keyword}, {p|primitive} and {charChinese|constituent}.
        .map(stringLine => reactStringReplace(stringLine, /{k\|(.*?)}/, (match, _, offset) => (
            <KeywordSegment key={match + offset} content={match} />
        )))
        .map(stringLine => reactStringReplace(stringLine, /{p\|(.*?)}/, (match, _, offset) => (
            <PrimitiveMeaningSegment key={match + offset} content={match} />
        )))
        .map((stringLine, lineIndex) => reactStringReplace(stringLine, /{(.*?\|.*?)}/g, (match, _, offset) => (      
            <ConstituentSegment 
                key={match + offset} 
                charChinese={match.split('|')[0]} 
                content={match.split('|')[1]}
                uniqueIndex={lineIndex.toString() + offset.toString()}
                {...{small, state, dispatch, match, stringLine}}
            />
        )))
        // Puts the individual lines of the story into separate paragraphs.
        .map((stringLine, index) => 
        <Box component='p' textAlign='justify' marginTop='0' lineHeight='200%' key={index}>
            {stringLine}
        </Box>)

        setReplacedText(storySplitIntoParagraphs)

    }, [story, small, state, dispatch]); 
    
    // The main return on the export: the story with all references converted into underlined objects.
    return replacedText
}

export default Story