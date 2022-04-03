import React from 'react';

import { useTheme } from '@mui/system';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

import ConditionalWrapper from "../../../auxiliaries/ConditionalWrapper";
import './Lists.css'

// The ListElement component. Takes the props "color" (= font color), 
// "fontVariantFirst" and "fontVariantSecond" (= Typography classes),
// "in" (= the trigger for the fade animation), 
// "firstElement", "secondElement", and "thirdElement"
// (where "thirdElement" is only used for the primitive meaning in the list of constituents).
// Optionally takes "collapsible", a bool value that collapses the entire element (instead of fading out the secondElement).

const ListElement = (props) => {

    const theme = useTheme()
    // Setting up default props for the ListElement (font style and color).
    const {
        color = theme.palette.primary.detailsElementText,
        fontVariantFirst = 'detailsItemChinese',
        fontVariantSecond = 'detailsItem',
        fontVariantThird = 'detailsItemPrimitive',
        firstElement,
        secondElement,
        thirdElement,
        collapsible,
        tableWidthSpacing,
        transitionTimeout
        } = props;

    return (
    <>
    <ListItem disablePadding className='list-item-container'>
        <ListItemIcon className='list-item-first-element' sx={{ paddingRight: `${tableWidthSpacing}px`, color}}>
            <Typography variant={fontVariantFirst}>
            {firstElement}
            </Typography>
        </ListItemIcon>

        <ConditionalWrapper
            condition={!collapsible}
            wrapper={children => <Fade in={props.in} timeout={transitionTimeout} appear={false}>{children}</Fade>}
        >
            <ListItemText className='list-item-second-element' sx={{color}}
                primary={ 
                    <Typography variant={fontVariantSecond} className='list-item-second-element-span' sx={{backgroundColor: theme.palette.background.default}}>
                    {secondElement ||
                    <Box sx={{color: theme.palette.tertiary.main}}>
                        <Box component='span' paddingRight='4px' >
                            <FontAwesomeIcon icon={faCube}/>
                        </Box>
                        <Typography variant={fontVariantThird}>
                        {thirdElement}
                        </Typography>
                    </Box>}
                    </Typography>
                }/>
        </ConditionalWrapper>
    </ListItem>

    {(secondElement && thirdElement) && (
        <Collapse in={props.in} timeout={transitionTimeout}>
            <ListItem sx={{py: 0}}>
                <ListItemText inset primary={
                    <Box display='flex' flexDirection='row' sx={{color: theme.palette.tertiary.main}}>
                        <KeyboardReturnIcon fontSize='small' sx={{transform: 'scaleX(-1)', color}}/>
                        <Box component='span' paddingRight='4px' >
                            <FontAwesomeIcon icon={faCube}/>
                        </Box>
                        <Typography variant={fontVariantThird}>
                        {thirdElement}
                        </Typography>
                    </Box>
                    }/>
            </ListItem>
        </Collapse>
        )
        }
    </>
    ) 
    }

export default ListElement