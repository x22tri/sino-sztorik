import React from "react";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const PopupTooltip = styled(({ className, title, ...props }) => (

    <Tooltip {...props}
    enterDelay={500}
    leaveTouchDelay={3000}
    enterTouchDelay={50} 
    title={<Typography component='span'>{title}</Typography>}
    classes={{ popper: className }}
     />
  ))

  (({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.background.tooltip,
      color: '#efefef',
      textAlign: 'justify'
    },
  }));

  export default PopupTooltip