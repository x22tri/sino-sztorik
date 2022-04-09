import { useContext, useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { lighten, darken } from '@material-ui/core/styles';


import LessonSelectAppbar from "./appbars/LessonSelectAppbar";
import AuthContext from "../context/auth-context";
import getRomanNumeralForTier from '../auxiliaries/getRomanNumeralForTier'
import PopupTooltip from "../auxiliaries/PopupTooltip";
import LessonMainPage from "./learn-components/LessonMainPage";
import { SecondaryColorButton, WhiteButton, ErrorField } from "../component-library/GenericComponents";

import './LessonSelect.css'

const TierStatus = ({tier, status, cardInactive}) => {
    const theme = useTheme()

    // let tierRoman
    // try {
    //     useEffect(() => {
    //         const fetchTierRomanNumbers = async () => {
    //         tierRoman = await getRomanNumeralForTier(tier)
    //       }
    //       fetchTierRomanNumbers()
    //     }, [])
    //     } catch (err) {
    //         throw new Error('Hiba a körök lekérése közben.')
    //     }

    const colorDictionary = {
        'Még nincs feloldva': {dark: [theme.palette.grey[600], theme.palette.primary.contrastText], light: [theme.palette.grey[600], theme.palette.primary.contrastText]},
        'Soron következő lecke': {dark: [undefined, theme.palette.secondary.main], light: [undefined, theme.palette.secondary.main]},
        'Már megtanult lecke': {dark: [undefined, theme.palette.background.default], light: [undefined, theme.palette.primary.light]},
        'Ebben a körben nincs ilyen lecke': {dark: [theme.palette.grey[800], theme.palette.grey[700]], light: [theme.palette.grey[500], darken(theme.palette.primary.dark, 0.3)]}
    }

    // let currentTierRoman = await getRomanNumeralForTier(currentTier)

    return (
        <PopupTooltip title={status || 'A lecke állapotát nem sikerült lekérni.'}>
            <Box component='span' sx={{margin: '0 5px'}}>
                {colorDictionary[status] && colorDictionary[status][theme.palette.type] && colorDictionary[status][theme.palette.type][+!cardInactive] ?
                
                <Typography variant='lessonSelectTier' color={colorDictionary[status][theme.palette.type][+!cardInactive]}>
                {getRomanNumeralForTier(tier)}
                </Typography>
                
                :

                <Typography variant='lessonSelectTier'>?</Typography>
                }
            </Box>
        </PopupTooltip>
    )
}

const LessonCard = ({lesson, currentTier, currentLesson}) => {
    const theme = useTheme()
    
    // The card should be grayed out if the user hasn't reached it yet.
    const cardInactive = !!(lesson.tiers[0].status === 'Még nincs feloldva' || lesson.tiers[0].status === 'Ebben a körben nincs ilyen lecke')

    const colorDictionary = {
        textInactive: {dark: theme.palette.grey[800], light: theme.palette.grey[600]},
        textActive: {dark: theme.palette.grey[400], light: theme.palette.grey[200]},
        backgroundInactive: {dark: theme.palette.grey[900], light: theme.palette.grey[400]},
        backgroundActive: {dark: theme.palette.grey[800], light: theme.palette.primary.dark},
        backgroundHover: {dark: lighten(theme.palette.grey[800], 0.1), light: darken(theme.palette.primary.dark, 0.1)},
    }

    const themeType = theme.palette.type

    const cardTextColor = cardInactive ? colorDictionary.textInactive[themeType] : colorDictionary.textActive[themeType]
    const cardBackgroundColor = cardInactive ? colorDictionary.backgroundInactive[themeType] : colorDictionary.backgroundActive[themeType]

    return (
        <Grid item position='relative' sx={{flexBasis: {xs: '250px'}, margin: '20px' }}>
            <Paper className='lesson-card-parent' elevation={10} sx={{
                backgroundColor: cardBackgroundColor, 
                padding: '10px', height: '100%',
                ':hover': { backgroundColor: !cardInactive && colorDictionary.backgroundHover[themeType] }
            }}>
                <Box position='absolute' left='50%' sx={{transform:'translate(-50%, 0)'}}>
                    <Typography color={cardTextColor}>
                        {lesson.lessonNumber}.
                    </Typography>
                </Box>

                <Box padding='25px' height='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='accentSemiBold' color={cardTextColor}>
                        {lesson.name}
                    </Typography>
                </Box>

                <Box display='flex' className='lesson-card-review-button' gap='10px'
                position='absolute' left='50%' bottom='50%' sx={{transform: 'translate(-50%, 50%)'}}>
                    
                    {!cardInactive 
                        && !(lesson.tiers[currentTier - 1]?.status === 'Soron következő lecke') &&
                    
                    <Link to={`/review/${lesson.lessonNumber}`}><WhiteButton text='Ismétlés' /></Link>}

                    {lesson.lessonNumber === currentLesson && <Link to="/learn"><SecondaryColorButton text='Tanulás' /></Link>}
                </Box>

                <Box position='absolute' left='50%' bottom='0' sx={{transform:'translate(-50%, 0)'}}>
                    {lesson.tiers.map((lessonTier, i) => <TierStatus key={i} tier={lessonTier.tier} status={lessonTier.status} {...{cardInactive}} />)}
                </Box>
            </Paper>
            
        </Grid>
    )
}

const GreetingCard = ({displayName, currentTier, currentLesson, currentLessonName}) => {
    const theme = useTheme()
    // const [greetingCardLoading, setGreetingCardLoading] = useState(true)

    // let currentTierRoman
    // try {
    //     useEffect(() => {
    //         const fetchGreetingCard = async () => {
    //         currentTierRoman = await getRomanNumeralForTier(currentTier)
    //         }
    //         fetchGreetingCard()
    //       }, [])
    //     } catch (err) {
    //         throw new Error('Hiba az üdvözlőkártya lekérése közben.')
    //     }

    
    // if (greetingCardLoading) return <div>Betöltés...</div>

    // else 
    const nextLessonBGColor = theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.primary.dark

    return (
        
        <Box display='flex' flexDirection='column' alignItems='center' padding='60px 0 100px' 
            sx={{backgroundColor: nextLessonBGColor, color: theme.palette.primary.contrastText}}>

            <Typography fontSize={20} fontWeight='bold' marginBottom='60px'>
            Üdv, {displayName}!
            </Typography>

            <Box display='flex' borderRadius='16px' padding='30px 100px' margin='0 20px' boxShadow={2} 
            sx={{flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            backgroundColor: lighten(nextLessonBGColor, 0.05)}}>
            A soron következő lecke:

            <Typography variant='mainPageSecondaryHeading' lineHeight='0.9' color={theme.palette.secondary.main} margin='20px 0'>
                {currentLessonName}
            </Typography>

            <Typography variant='lessonSelectNumber' marginBottom='40px'>
            ({getRomanNumeralForTier(currentTier)}. kör, {currentLesson}. lecke)
            </Typography>

            <Link to="/learn"><SecondaryColorButton text='Tanulás' endIcon={<ArrowRightAltIcon sx={{transform: 'scaleX(1.3) scaleY(1.3)'}} />} /></Link>
            </Box>
        </Box>
    )
}

const LessonCardList = memo(({lessonSelectData, userData}) => (lessonSelectData.map((lesson, index) => (
    <LessonCard key={index} currentTier={userData.currentTier} currentLesson={userData.currentLesson} {...{lesson}} />))
))

// Forces the server to return all info about a character, even if user is uneligible.
const ForceSearchButton = ({auth, lastSearch, setSearchedChar}) => {
    const handleForceSearchChar = async () => {
        try {
            const searchedCharInfo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/force-search/${lastSearch}`, {
                headers: {'Authorization': `Bearer ${auth.token}`}
              })
            const searchedCharInfoJson = await searchedCharInfo.json()
            searchedCharInfoJson.status = searchedCharInfo.status // Adding the status to the returned object.
            
            if (Array.isArray(searchedCharInfoJson) && searchedCharInfoJson.length === 1) setSearchedChar(searchedCharInfoJson[0])
            else setSearchedChar(searchedCharInfoJson)
        } catch (err) {
            setSearchedChar(err);
        }
    }

    return (
        <Box display='flex' alignItems='center' justifyContent='center' padding='10px 16px 0'>
            <SecondaryColorButton onClick={handleForceSearchChar} text='Megtekintem mégis' />
        </Box>
    )}

const LessonSelect = ({themeToggle, textFieldRef, searchTerm, setSearchTerm}) => {
    const auth = useContext(AuthContext)

    // Getting the all lessons' data from the server.
    const [lessonSelectData, setLessonSelectData] = useState()
    const [userData, setUserData] = useState()
    const [searchedChar, setSearchedChar] = useState()
    const [lastSearch, setLastSearch] = useState() // Needed as the search term is erased before user could click "See anyway"

    
    // Load lessons and change page title on mount.
    try {
    useEffect(() => {
        if (!auth.token) return;
        document.title = 'Sino-sztorik'

        const fetchLessonSelect = async () => {
          const lessonTable = await fetch(`${process.env.REACT_APP_BACKEND_URL}/learn/select`, {
            headers: {'Authorization': `Bearer ${auth.token}`}
          })
          const lessonConverted = await lessonTable.json()
          setLessonSelectData(lessonConverted.lessonArray)
          setUserData(lessonConverted.user)
      }
      fetchLessonSelect()
      }, [auth.token])
    } catch (err) {
        throw new Error('Hiba a leckék lekérése közben.')
    }

    // Returning the lesson select screen.
    if (!lessonSelectData || !userData) return <div>Betöltés...</div>
    else return (
        <>
        <LessonSelectAppbar {...{
            themeToggle, 
            searchedChar, 
            setSearchedChar,
            searchTerm, 
            setSearchTerm,
            setLastSearch
        }} />
        <main>
            {/* The default state is a lesson selection menu. */}
            {!searchedChar && 
            <>
            <GreetingCard 
                displayName={userData.displayName} 
                currentTier={userData.currentTier} 
                currentLesson={userData.currentLesson}
                currentLessonName={userData.currentLessonName}  
            />

            <Grid container textAlign="center" alignItems="stretch" justifyContent='center' maxWidth='1000px' margin='auto'>
                <Grid item xs={12} marginTop='40px'>
                    <Typography>Inkább <strong>át szeretnél ismételni egy már megtanult leckét</strong>? Itt kiválaszthatod.</Typography>
                    <Typography>(Az ismétlés nincs hatással az előrehaladásodra.)</Typography>
                </Grid>
                <LessonCardList {...{lessonSelectData, userData}}/>
            </Grid>
            </>}

            {/* If a character is searched for in the LessonSelectAppbar, the selection screen is replaced by a LessonMainPage. */}
            {searchedChar && !searchedChar.message && (
                <LessonMainPage currentChar={searchedChar} {...{textFieldRef}} />
            )}

            {/* If there is an error message, show it. */}
            {/* If user just lacks privileges for the character, they can choose to show it anyway. */}
            {searchedChar?.message && (
                <ErrorField>
                    {searchedChar.message}
                    {searchedChar.status === 401 && <ForceSearchButton {...{auth, lastSearch, setSearchedChar}} />}
                </ErrorField>
            )}
        </main>
        </>
    )}

export default LessonSelect