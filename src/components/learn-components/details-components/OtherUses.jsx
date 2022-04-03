import React from 'react';
import { useTheme } from '@mui/system';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

import ListHeading from './ListHeading'
import './Lists.css'

const OtherUses = ({ otherUseArray, transitionTimeout, nameAndIcon, in: inProp }) => {

    const theme = useTheme()

    if (!otherUseArray || !otherUseArray.length) return null
    else return (
    <>
    <ListHeading
        badgeContent={!inProp ? otherUseArray.length : 0}
        heading={nameAndIcon[0]}
        icon={nameAndIcon[1]}
        in={inProp}
        {...{transitionTimeout}}
    />
    <Box height='8px' />
    <Collapse in={inProp} timeout={transitionTimeout}>
        <List disablePadding className='list'>
            {otherUseArray.map((element, index) =>
            <ListItem disablePadding className='list-item-container' key={index}>
                <ListItemIcon className='list-item-first-element' sx={{color: theme.palette.primary.detailsElementText}}>
                    <Typography variant='detailsItemPinyin'>
                    {element.pinyin}
                    </Typography>
                </ListItemIcon>
                <ListItemText className='list-item-second-element' sx={{color: theme.palette.primary.detailsElementText}} primary={ 
                    <Typography variant='detailsItem' className='list-item-second-element-span' sx={{backgroundColor: theme.palette.background.default}}>
                    {element.otherUseHungarian}
                    </Typography>
                }/>
            </ListItem>)}
        </List>
    </Collapse>
    <Box height='12px' />
    </>
    )
}

export default OtherUses