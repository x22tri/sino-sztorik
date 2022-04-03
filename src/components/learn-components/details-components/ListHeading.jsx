import React from 'react';

import { styled, useTheme } from '@mui/system';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';
import Badge from '@mui/material/Badge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledBadge = styled(Badge)(({ background }) => ({
    '& .MuiBadge-badge': {
      right: 6,
      backgroundColor: background,
      color: '#fff'
    },
  }));

const ListHeading = ({ badgeContent, heading, icon, iconColor, in: inProp, transitionTimeout }) => {

    const theme = useTheme()

    return (
        <ListItem disablePadding>
            <ListItemIcon className='list-item-icon' sx={{ color: iconColor || theme.palette.primary.lowPrioSidebarText, fontSize: 30 }}>
                <StyledBadge background={theme.palette.primary.dark} {...{badgeContent}}>
                    <FontAwesomeIcon icon={icon} fixedWidth/>
                </StyledBadge>
            </ListItemIcon>
        <Fade in={inProp} timeout={transitionTimeout} appear={false}>
            <ListItemText primary={
                <Typography variant='caption'>
                {heading}
                </Typography>
                }
            sx={{whiteSpace: 'nowrap', color: theme.palette.primary.lowPrioSidebarText}}>
            </ListItemText>
        </Fade>
        </ListItem>
    )
}

export default ListHeading