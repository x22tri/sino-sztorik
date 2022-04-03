import React from "react";
import { useTheme } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Component for hotkey indicators in the corner of the active Tab.
const TabHotkey = ({ value, index, characters }) => {

    const theme = useTheme()

    if (index !== value) return null
    else {
        const TabHotkeyWrapper = ({ children, right, left }) => (
            <Box component='span' fontSize={8} position='absolute' top='5px' {...{right, left}}
            sx={{color: theme.palette.primary.lowPrioText, borderColor: theme.palette.primary.lowPrioText}}>
                {children}
            </Box>
        )

        const ButtonKey = ({ keyPrompt, marginRight, marginLeft }) => (
            <Box component='span' border='1px solid' borderRadius='2px' padding='0.5px 2px'
            {...{marginRight, marginLeft}}>
            {keyPrompt}
            </Box>
        )

        const ButtonArrow = ({ arrow }) => (
            <Box component='span'>
            {arrow}
            </Box>
        )

        return (
        <>
        {(characters && value < (characters.length - 1)) && (
            <TabHotkeyWrapper right='0'>
                <ButtonKey keyPrompt='E' marginRight='2px' />
                <ButtonArrow arrow='⮞' />
            </TabHotkeyWrapper>
        )}
            
        {(value > 0) && (
            <TabHotkeyWrapper left='0'>
                <ButtonArrow arrow='⮜' />
                <ButtonKey keyPrompt='Q' marginLeft='2px' />
            </TabHotkeyWrapper>
        )}
        </>

    )
    }
}

const TabPanel = ({ children, value, index, ...other }) => ( 
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box padding='12px' textAlign='justify'>
          <Typography component='div' fontSize={14}>{children}</Typography>
        </Box>
      )}
    </div>
  )

export { TabHotkey, TabPanel }