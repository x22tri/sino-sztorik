import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useTheme } from "@mui/styles";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { darken, lighten } from '@material-ui/core/styles'
import { LessonContentCharacter } from "../../component-library/GenericComponents";

import ListWrapper from "./ListWrapper"

const AllLessons = () => {
    const theme = useTheme()
    const backgroundColorActive = theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.primary.dark
    const backgroundColorInactive = theme.palette.type === 'dark' ? darken(theme.palette.grey[900], 0.1) : darken(theme.palette.background.default, 0.1)

    const [lessonState, setLessonState] = useOutletContext()
    const [isLoading, setIsLoading] = useState(false)
    
    // Fetching the lesson data on mount.
    try {
        useEffect(() => {
        const fetchAllLessons = async () => {
            setIsLoading(true)
            const lessonTable = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/all-lessons`);
            const lessonJSON = await lessonTable.json();
            const lessonArray = lessonJSON.lessonArray
        setLessonState(lessonArray);
        setIsLoading(false)
    }
    if (!lessonState) fetchAllLessons()
    }, [lessonState, setLessonState])
    } catch (err) {
        console.log(err);
    };

    // console.log(lessonState)

    if (isLoading) return <div>Betöltés...</div>
    else if (!lessonState) return <div>Hiba</div> 
    else return (
    <ListWrapper title='Leckekezelő'>
    <Grid container textAlign="center" alignItems="stretch" justifyContent='center' margin='auto'>
        {lessonState.map((lesson, index) => (
            <Grid item key={index} component={Link} to={`/admin/lesson/${lesson.lessonNumber}`} sx={{
            flexBasis: {xs: '280px'}, margin: '5px', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit',
            ':hover': { backgroundColor: theme.palette.type === 'light' ? darken(theme.palette.background.default, 0.1) : lighten(theme.palette.background.default, 0.1), 
            cursor: 'pointer' } }}
            > 
                {/* Display the lesson's number and name. */}
                {lesson.lessonNumber}. lecke
                <Box display='flex' justifyContent='center' sx={{typography: 'topbarLogoText', color: theme.palette.secondary.main}}>
                    {lesson.name}
                </Box>

                {/* Display all preface versions. */}
                {lesson.tiers.map((version, index) => (
                <Paper elevation={version?.characters?.length ? 10 : 0} key={index} sx={{
                    textAlign: 'center', position: 'relative', padding: '10px', my: '5px', 
                    backgroundColor: version?.characters?.length ? backgroundColorActive : backgroundColorInactive,
                    border: !version?.characters?.length && `1px dashed ${theme.palette.primary.lowPrioText}` }}
                >                 
                    <Box color={theme.palette.primary.contrastText} fontSize={14} textAlign='justify'>
                        {(version.preface?.length > 50) ? version.preface?.slice(0, 70) + '...' : version.preface}
                    </Box>

                    {!!version?.characters?.length && (
                    <Box flexWrap='wrap' justifyContent='center' marginTop='10px'>
                        
                        {/* Show all characters in the lesson. */}
                        {version.characters.map((char, index) => (
                            <LessonContentCharacter char={char.character?.charChinese || 'Hiba'} key={index} fontSize={20} />
                        ))}
                    </Box>)}
                </Paper>))}
            </Grid>
        ))}        
    </Grid>
    </ListWrapper>
    )
}

export default AllLessons