import React from "react";

import { useTheme } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// The button that the user can navigate between characters with.
export default function ArrowButton({ direction, onClick, text }) {
        const theme = useTheme()

        return (
        <Button {...{onClick}} sx={{color: theme.palette.primary.lowPrioText, textTransform: "none", '&:hover': {opacity: 0.7} }}>
        {/* If the direction is left, the arrow will point to the left and the text will come after the arrow. */}
            {direction === 'left'
            ?
            <>
                <ArrowRightAltIcon fontSize="large" sx={{transform: 'scaleX(-1)', marginRight: '4px'}}/>
                <Box component='span'>{text}</Box>
            </>
            :
            <>
                <Box component='span'>{text}</Box>
                <ArrowRightAltIcon fontSize="large" sx={{marginLeft: '4px'}}/>
            </>
            }
        </Button>
        )
    }