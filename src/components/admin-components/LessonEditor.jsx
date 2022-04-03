import { useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { Formik, Form, FieldArray, useField } from 'formik';
import { useTheme } from "@mui/styles";

import Alert from '@mui/material/Alert';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from "@mui/material/Paper";
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { darken } from '@material-ui/core/styles'

import ListWrapper from "./ListWrapper"
import { LessonContentCharacter, SecondaryColorButton, LowEmphasisButton } from "../../component-library/GenericComponents";

const AdminTitleInput = ({ color, ...props }) => { 
    const theme = useTheme() 
    const [field, meta] = useField(props)

    return (
        <Box component={TextField} multiline {...field} {...props} size='small' 
        value={field.value || ''}
        sx={{typography: 'topbarLogoText', '& .MuiOutlinedInput-notchedOutline': { border: 0 },
        '& .MuiInputBase-root': { fontFamily: 'inherit', fontWeight: 'inherit', fontSize: 'inherit' } }} 
        onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}
        helperText={meta.touched && meta.error ? meta.error : null} 
        placeholder='Add meg a lecke nevét...'
        inputProps={{style: { textAlign: 'center', color: theme.palette.secondary.main } }}
        />
    );
  };

const AdminPrefaceInput = ({ version, index, ...props }) => {
    const theme = useTheme() 
    const [field, meta] = useField(props)

    const backgroundColorActive = theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.primary.dark
    const backgroundColorInactive = theme.palette.type === 'dark' ? darken(theme.palette.grey[900], 0.1) : darken(theme.palette.background.default, 0.1)

    return (
        <Paper elevation={field.value ? 10 : 0} sx={{
            textAlign: 'center', padding: '10px', my: '5px', border: !field.value && `1px dashed ${theme.palette.primary.lowPrioText}`,
            backgroundColor: field.value ? backgroundColorActive : backgroundColorInactive}}
        >
            {/* Display tier number. */}
            <Box display='flex' justifyContent='start' sx={{typography: 'h4'}} color={field.value && theme.palette.primary.light}>
                {version.tier}. kör
            </Box>

            {/* Show preface. */}
            <Box component={TextField} multiline {...field} {...props} size='small' width='100%' display='flex'
            value={field.value || ''}
            sx={{'& .MuiOutlinedInput-notchedOutline': { border: 0 } }} 
            onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}
            helperText={meta.touched && meta.error ? meta.error : null}
            placeholder='Adj meg előszót ehhez a körhöz...'
            inputProps={{style: { lineHeight: '200%', textAlign: !field.value ? 'center' : 'justify', color: field.value && theme.palette.primary.contrastText } }}
            />

            {/* If the lesson has characters, show them. */}
            {!!version.characters?.length && (
            <>
            <Box color={field.value && theme.palette.primary.contrastText} fontWeight='bold' marginTop='20px'>
                A lecke tartalma:
            </Box>

            <Box display='flex' flexWrap='wrap' justifyContent='center' marginTop='10px'>
                {version.characters.map((char, index) => <LessonContentCharacter key={index} char={char.character?.charChinese} fontSize={20} />)}
            </Box>
            </>)}
        </Paper>
    );
}

const LessonEditor = () => {
    const theme = useTheme()
    const [lessonState, setLessonState] = useOutletContext()
    const { lessonId } = useParams()
    const [emptyPrefaceArray, setEmptyPrefaceArray] = useState([]);
    const [snackbar, setSnackbar] = useState(null);

    if (!lessonState) return <div>Hiba</div> 
    else {
        const lesson = lessonState.find(lesson => lesson.lessonNumber === +lessonId)
        let initialValues = {name: lesson?.name || '', tiers: lesson?.tiers || []}

        // The validator function.
        const validate = values => {
            const errors = {};
            if (!values.name) errors.name = 'A lecke neve nem maradhat üresen.'
            return errors;
        }

        // The function that sends changes to the backend.
        const sendValuesHandler = async (values) => {
            try {
                const request = {name: values.name, tiers: values.tiers.map(({tier, preface}) => ({tier, preface}))}
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/lesson/update/${lessonId}`,
                    {method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(request)}
                  );
                if (response?.ok) {
                    let responseJSON = await response.json()
                    setLessonState(lessonState.map(item => item.lessonNumber === +lessonId 
                        ? {...item, name: values.name, tiers: values.tiers} 
                        : item))
                    setSnackbar({ children: responseJSON.message, severity: 'success' });
                } else if (response) {
                    let responseJSON = await response.json()
                    setLessonState(lessonState.map(item => item.lessonNumber === +lessonId 
                        ? {...item, name: values.name, tiers: values.tiers} 
                        : item))
                    setSnackbar({ children: responseJSON.message, severity: 'error' });
                }                
            } catch (error) {
                console.log(error)
                setLessonState(lessonState.map(item => item.lessonNumber === +lessonId 
                    ? {...item, name: values.name, tiers: values.tiers} 
                    : item))
                setSnackbar({ children: 'Hiba történt a mentéskor.', severity: 'error' });
            }
        }

        // The dialog that appears when the admin tries to send an empty preface to a lesson that has characters.
        const EmptyPrefaceDialog = ({values}) => {
            const dialogText = emptyPrefaceArray.length === 1 ?
            `A(z) ${emptyPrefaceArray[0].tier}. kör tartalmaz karaktereket, de nem adtál meg hozzá előszót. Biztos elküldöd a leckét?` :
            `A(z) ${emptyPrefaceArray.map(element => element.tier).join('., ').replace(/, ([^,]*)$/, ' és $1.')} körök tartalmaznak karaktereket, de nem adtál meg hozzájuk előszót. Biztos elküldöd a leckéket?`

            return (
            <Dialog open={!!emptyPrefaceArray.length} onClose={() => setEmptyPrefaceArray([])}>
                <DialogTitle>
                {"Elmentesz egy üres leckét?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEmptyPrefaceArray([])}>Vissza</Button>
                    <Button onClick={() => {sendValuesHandler(values); setEmptyPrefaceArray([])}}
                        sx={{backgroundColor: theme.palette.tertiary.main, color: theme.palette.primary.contrastText,
                        '&:hover': { backgroundColor: theme.palette.primary.lightPrimitive } }}>
                        Mentés
                    </Button>
                </DialogActions>
            </Dialog>
        )}

        // The main return on the LessonEditor component.
        return (
        <>
        <ListWrapper title={`${lessonId}. lecke szerkesztése`}>
            <Box margin='auto' maxWidth='1000px'>                
                <Formik enableReinitialize {...{initialValues, validate}} 
                onSubmit={(values => {
                    const existingLessonsWithNoPreface = values.tiers?.filter(tier => tier.characters.length && !tier.preface) 
                    existingLessonsWithNoPreface.length ? setEmptyPrefaceArray(existingLessonsWithNoPreface) : sendValuesHandler(values)
                })}
                >
                    {({ resetForm, values }) => (
                    <Form>
                        <Box display='flex' flexDirection='column'>
                            <AdminTitleInput name="name" />
                            <FieldArray render={arrayHelpers => lesson?.tiers?.map((version, index) => ( 
                                <AdminPrefaceInput key={index} name={`tiers[${index}].preface`} {...{version, index}} />
                            )) || 'Hiba'} />

                            {/* Show the buttons below the lesson versions. */}
                            <Box display='flex' justifyContent='space-between' marginTop='20px'>
                                <LowEmphasisButton component={Link} to={`/admin/character-list/${lessonId}`} text='Karakterlista' />

                                {/* The following two are on the right and are therefore lumped together in a Box. */}
                                <Box display='flex' gap={2}>
                                    <LowEmphasisButton onClick={() => resetForm(initialValues)} text='Változtatások elvetése' />
                                    <SecondaryColorButton type='submit' text='Változtatások mentése' />
                                </Box>
                            </Box>
                        </Box>
                        <EmptyPrefaceDialog {...{values}} />
                    </Form>)}
                </Formik>
            </Box>
        </ListWrapper>
        {!!snackbar && (
        <Snackbar open onClose={() => setSnackbar(null)} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
        )}
        </>
        )
    }
    }

export default LessonEditor