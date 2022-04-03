import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import PopupTooltip from "../../auxiliaries/PopupTooltip";
import ConditionalWrapper from "../../auxiliaries/ConditionalWrapper";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

// Setting up the styled elements to be used by multiple appbars.
const TopbarButton = ({iconContent, textContent, tooltip, color = undefined, hideTextWhenSmall, ...props}) => {
    const theme = useTheme()
    return (
        <ConditionalWrapper condition={!!tooltip}
            wrapper={children => (
                <PopupTooltip title={tooltip}>
                    <Box display='flex' component='span' alignItems='center'>
                        {children}
                    </Box>
                </PopupTooltip>
                )} // The spans are needed because PopupTooltip needs its child to be able to hold a ref.
        >
            {textContent &&
            <Button {...props} sx={{textTransform: 'none', color: color || theme.palette.primary.topbarButton,
                '&:hover': { color: theme.palette.secondary.main, backgroundColor: 'inherit' } }}>
                <Typography fontWeight='bold' fontSize={14} noWrap sx={{display: hideTextWhenSmall && {xs: 'none', md: 'block'} }}>
                    {textContent}
                </Typography>
            </Button>}
            
            {iconContent &&
            <IconButton {...props} sx={{textTransform: 'none', color: color || theme.palette.primary.topbarButton,
                '&:hover': { color: theme.palette.secondary.main, backgroundColor: 'inherit' }, transform: 'scale(0.9)'}}>
                {iconContent}
            </IconButton>}
        </ConditionalWrapper>
        )
}

// Adding the "Light theme / Dark theme" button in the top right,
// along with a text label explaining what it does on larger sizes. 
const ThemeChangeButton = ({ themeToggle, ...props }) => {
    const theme = useTheme()
    return (
        <TopbarButton {...props} onClick={themeToggle} textContent='Téma váltása' tooltip='Váltás sötét/világos kinézet között (T)'
           hideTextWhenSmall endIcon={<FontAwesomeIcon icon={theme.palette.type === 'dark' ? faSun : faMoon} />} 
        />
)}

const Logo = () => {
    const theme = useTheme()
    const logoImage = require(`../../assets/logo.png`).default
    return (
    <Box display='flex' flexGrow={1} alignItems='center'>
        <img src={logoImage} alt='' width='auto' height='28px' />
        <Typography variant='topbarLogoText' sx={{marginLeft: '8px', color: theme.palette.tertiary.main, fontWeight: 'bold', display: {xs: 'none', md: 'block'}}}>
            Sino-sztorik
        </Typography>
    </Box>
)}

const AppbarWrapper = ({ borderBottom = undefined, color = undefined, children }) => {
    const theme = useTheme()    
    return (
        <>
        <AppBar elevation={0} color='transparent' style={{borderBottom: borderBottom || `2px solid ${theme.palette.divider}`}}>
            <Toolbar variant='dense' disableGutters sx={{padding: '0 10px', backgroundColor: color || theme.palette.primary.topbarBackground}}>
            {children}
            </Toolbar>
        </AppBar>
        <Toolbar variant='dense' /> {/* Needed for spacing */}
        </>
    )
}

export { AppbarWrapper, TopbarButton, ThemeChangeButton, Logo }