import React from 'react';
import { useTheme } from '@mui/system';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import ListHeading from './ListHeading'
import './Lists.css'

const Frequency = ({ frequency, in: inProp, nameAndIcon, transitionTimeout }) => {

    const theme = useTheme()
       
    const frequencyCheck = frequency => {
    if (typeof frequency !== 'number') return [theme.palette.secondary.unknownCharacter, 'Nem elérhető']
    else if (frequency < 500) return [theme.palette.secondary.veryCommonCharacter, 'Nagyon gyakori']
    else if (frequency < 1000) return [theme.palette.secondary.quiteCommonCharacter, 'Elég gyakori']
    else if (frequency < 1500) return [theme.palette.secondary.commonCharacter, 'Gyakori']
    else if (frequency < 2000) return [theme.palette.secondary.uncommonCharacter, 'Nem gyakori']
    else if (frequency < 3000) return [theme.palette.secondary.rareCharacter, 'Elég ritka']
    else return [theme.palette.secondary.veryRareCharacter, 'Ritka']
    }
    
    // Render nothing if frequency isn't found.
    if (!frequency) return null
    else {
        const [iconColor, frequencyText] = frequencyCheck(frequency)
        return (
        <>
            <ListHeading
                badge={false}
                content={frequency}
                heading={nameAndIcon[0]}
                icon={nameAndIcon[1]}
                in={inProp}
                {...{iconColor, transitionTimeout}}
            />
            <Box height='4px' />
            <Collapse in={inProp} timeout={transitionTimeout}>
                <List dense disablePadding className='list'>
                    <ListItem disablePadding className='list-item-container'>
                        <ListItemIcon className='list-item-first-element' sx={{color: theme.palette.primary.detailsElementText}}>
                            <Typography variant='detailsItem'>
                            {frequency}
                            </Typography>
                        </ListItemIcon>
                        <ListItemText className='list-item-second-element' sx={{color: theme.palette.primary.detailsElementText}} primary={
                            <Typography variant='detailsItem' className='list-item-second-element-span' sx={{backgroundColor: theme.palette.background.default}}>
                            {frequencyText}
                            </Typography>
                        }/>
                    </ListItem>
                </List>
            </Collapse>
            <Box height='16px' />
        </>
    )
}
}

export default Frequency