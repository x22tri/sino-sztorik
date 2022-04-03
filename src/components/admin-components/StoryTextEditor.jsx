// @refresh reset

import { createEditor, Editor, Range, Text, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { useField } from 'formik';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useTheme } from '@mui/styles';
import PopupTooltip from '../../auxiliaries/PopupTooltip';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SlateLeaf = ({ attributes, children, leaf }) => {
    const theme = useTheme()
    if (leaf.keyword) children = (
        <PopupTooltip title='Ezt jelenti az aktuális írásjel.'>
            <Box component='strong' sx={{color: theme.palette.primary.dark, borderBottom: '1px dashed', cursor: 'help'}}>
                {children}
            </Box>
        </PopupTooltip>)

    if (leaf.primitive) children = (
    <PopupTooltip title='Így hívjuk majd az írásjelet, amikor más írásjelek eleméül szolgál, így könnyebb lesz beleillesztenünk a történetbe.'>
        <Box component='span' sx={{color: theme.palette.tertiary.main, borderBottom: '1px dashed', cursor: 'help'}}>
            {children}
        </Box>
    </PopupTooltip>)

    if (leaf.constituent) children = (
    <PopupTooltip title={`Utalás erre: ${leaf.constituent}`}>
        <Box component='span' sx={{borderBottom: '1px dashed', cursor: 'help'}}>
            {children}
        </Box>
    </PopupTooltip>)

    if (leaf.italic) children = <em>{children}</em>
    if (leaf.underline) children = <u>{children}</u>
    return <span {...attributes}>{children}</span>
    };

const toggleMark = (editor, format, constituentValue) => {
    // Don't insert a "constituent" reference without a reference.
    if (format === 'constituent' && !constituentValue) return;

    // The following is takena nd modified from https://github.com/ianstormtaylor/slate/issues/4162
    const getWholeWord = () => {
        // Get start and end, modify it as we move along.
        let [start, end] = Range.edges(editor.selection);

        // Move forward along until we hit a different tree depth
        while (true) {
            const after = Editor.after(editor, end, {unit: 'word'})
            const wordAfter = after && Editor.string(editor, { anchor: end, focus: after });
            if (after && wordAfter && wordAfter.length && wordAfter[0] !== ' ') {
                end = after; 
                if (end.offset === 0) break // Means we've wrapped to beginning of another block
            } else break
        }

        // Move backwards
        while (true) {
            const before = Editor.before(editor, start, {unit: 'word'});
            const wordBefore = before && Editor.string(editor, { anchor: before, focus: start });
            if (before && wordBefore && wordBefore.length && wordBefore[wordBefore.length - 1] !== ' ') {
                start = before;
                if (start.offset === 0) break // Means we've wrapped to beginning of another block
            } else break
        }

        return { anchor: start, focus: end }
    }

    let selectionRange
    Range.isExpanded(editor.selection) ? selectionRange = editor.selection : selectionRange = getWholeWord()

    // Only one mark can be active at a time, so any non-zero length of the marks array will not add a mark.
    // The following is an implementation of the built-in Editor.addMark and Editor.removeMark functions, 
    // but ones that work with collapsed selections.
    !!Object.keys(Editor.marks(editor)).length
        ? Transforms.unsetNodes(editor, format, { at: selectionRange, match: Text.isText, split: true })
        : Transforms.setNodes(editor, { [format]: constituentValue || true }, { at: selectionRange, match: Text.isText, split: true })
        
}

const FormattingToolbar = ({constituentValue, setConstituentValue}) => {
    const theme = useTheme()
    const [searchTermValue, setSearchTermValue] = useState('')

    const MarkButton = ({ format, content, keybind, constituentValue = undefined }) => {
        const editor = useSlate();
        return (
            <Box display='flex' flexDirection='column' alignItems='center'>
                <ToggleButton value={format} selected={Editor.marks(editor) && !!Editor.marks(editor)[format]} 
                sx={{textTransform: 'none', py: '6px'}} 
                onMouseDown={event => {event.preventDefault(); toggleMark(editor, format, constituentValue)}}>
                    {content}
                </ToggleButton>
                <Box fontSize='10px' paddingTop='2px' color={theme.palette.primary.lowPrioText}>
                    {keybind || ''}
                </Box>
            </Box>
        );
    };

    // To-Do: take this out of here and implement it somewhere else as it is shared across components.
    const handleSearchConstituent = async (event) => {
        event.nativeEvent.stopImmediatePropagation()
        if (event.key === 'Enter') {
            setSearchTermValue('')
            try {
                const searchedCharInfo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/force-search/${searchTermValue}`)
                const searchedCharInfoJson = await searchedCharInfo.json()

                // If only one character was found, add it to the similar group.
                if (Array.isArray(searchedCharInfoJson) && searchedCharInfoJson.length === 1) {
                    let foundChar = searchedCharInfoJson[0].character
                    setConstituentValue(foundChar.charChinese)
                }
                else {
                    // setSearchedChar(searchedCharInfoJson)
                    // To-Do: Handle multiple results (implement in LessonSelectAppbar search bar, SimilarList first)
                    console.log(searchedCharInfoJson)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    
    return (
        <ToggleButtonGroup size="small" sx={{display: 'flex', justifyContent: 'center', gap: '6px', pb: '15px'}}>
            <MarkButton format="keyword" keybind='(Ctrl + K)' content={
                <Box component='strong' sx={{color: theme.palette.primary.dark}}>
                Kulcsszó
                </Box>} 
            />
            <MarkButton format="primitive" keybind='(Ctrl + P)' content={
                <Box component='span' sx={{color: theme.palette.tertiary.main}}>
                Jelentés alapelemként
                </Box>} 
            />
            <Box display='flex' flexDirection='row'>
                <MarkButton format="constituent" {...{constituentValue}} keybind='(Ctrl + O)' 
                    content={!constituentValue ? 'Alapelemek keresése:' : `Alapelem beszúrása: ${constituentValue}`}  
                />
                    <TextField size='small' color='primary' variant='standard'
                        sx={{paddingTop: '10px', paddingLeft: '8px'}}
                        InputProps={{endAdornment: <InputAdornment position="end"><FontAwesomeIcon icon={faSearch} /></InputAdornment>}}
                        value={searchTermValue} 
                        onChange={event => {event.preventDefault(); event.nativeEvent.stopImmediatePropagation(); setSearchTermValue(event.target.value)}}
                        onKeyDown={event => {if (event.key === 'Enter') event.preventDefault(); event.nativeEvent.stopImmediatePropagation(); handleSearchConstituent(event)}}
                    />
            </Box>
            {/* <MarkButton format="italic" content='I' />
            <MarkButton format="underline" content='U' /> */}
        </ToggleButtonGroup>
    );
};

const HOTKEYS = {
    "k": "keyword",
    "p": "primitive",
    "i": "italic",
    "u": "underline",
    "o": "constituent"
};
  

export const StoryTextEditor = ({findAutomaticConstituentsInLeaves, resetSignal, setResetSignal, setFieldValue, values, ...props}) => {
    const theme = useTheme()
    const editor = useMemo(() => withReact(withHistory(createEditor())), [])
    const [field] = useField(props)
    const [constituentValue, setConstituentValue] = useState('')
  
    const renderElement = useCallback(props => (
    <Box padding='10px' borderRadius='4px' sx={{border: `1px solid ${theme.components.MuiOutlinedInput.styleOverrides.notchedOutline.borderColor}`}}>
        {props.children}
    </Box>), [theme.components.MuiOutlinedInput.styleOverrides.notchedOutline.borderColor])

    const renderLeaf = useCallback(props => <SlateLeaf {...props} />, [])

    useEffect(() => {
        const resetEditable = () => {
           let totalNodes = editor.children.length // Get initial total nodes to prevent deleting affecting the loop
           if (values.story.length <= 0) return // No saved content, don't delete anything to prevent errors
           for (let i = 0; i < totalNodes - 1; i++) Transforms.removeNodes(editor, {at: [i]}) // Remove every node except the last one, otherwise SlateJS will return error as there's no content
           for (const value of values.story) {Transforms.insertNodes(editor, value, {at: [editor.children.length]})} // Add content to SlateJS
           Transforms.removeNodes(editor, {at: [0]}) // Remove the last node that was leftover from before
       }
       if (resetSignal) {resetEditable(); setResetSignal(false)}
    }, [editor, resetSignal, setResetSignal, values.story])
  
    return (
    <Box sx={{width: '100%'}}>
        <Slate {...{editor}} value={values.story} onChange={value => {setFieldValue('story', value)}}>
            <FormattingToolbar {...{constituentValue, setConstituentValue}}/>
            <Box display='flex' sx={{typography: 'h4', color: theme.palette.primary.lowPrioText, paddingTop: '6px'}}>Történet</Box>
            <Editable id={field.name} {...{renderElement, renderLeaf}} 
                onBlur={() => setFieldValue('automaticConstituents', findAutomaticConstituentsInLeaves(values.story[0].children))}
                onKeyDown={event => {
                // Overriding default characters with Hungarian quote marks and dashes.
                const previousCharPosition = window.getSelection()?.focusOffset - 1
                const textboxContent = window.getSelection()?.focusNode?.data
                const previousCharacter = textboxContent && textboxContent[previousCharPosition] ? textboxContent[previousCharPosition] : null
                if (event.key === '"') {
                    event.preventDefault();
                    previousCharacter === ' ' || textboxContent === '﻿' ? editor.insertText('„') : editor.insertText('”') // "Empty" textboxes have a no-width whitespace character in them.
                }
                if (event.key === '-') {
                    event.preventDefault();
                    previousCharacter === ' ' ? editor.insertText('–') : editor.insertText('-')
                }
                // Preventing theme change.
                if (event.key === 't') event.nativeEvent.stopImmediatePropagation();
                // Activating the hotkeys.
                if (event.ctrlKey && HOTKEYS[event.key]) {
                    event.preventDefault(); 
                    toggleMark(editor, HOTKEYS[event.key], constituentValue)
                }
            }}/>
        </Slate>
    </Box>
    );
  };