import { Link } from 'react-router-dom';
import { FieldArray } from 'formik';
import { useTheme } from '@mui/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';

import PopupTooltip from '../../auxiliaries/PopupTooltip';
import { AdminTextInput, emptyLineDictionary } from './CharacterEditScreen';

const AdditionalInfoField = ({buttonTooltip, errors, name, notFoundText, textInputLabel, textInputLabelKey, title, titleLink, values}) => {

    const AdditionalInfoTitle = ({onClick}) => {
        const theme = useTheme()
        return (
        <Grid container spacing={1} width='100%' sx={{marginBottom: '15px', alignItems: 'center'}}>
            <Grid item xs={10}>
                <Link to={titleLink}>
                    <FormHelperText sx={{marginLeft: '6px', color: theme.palette.primary.dark}}>{title}</FormHelperText>
                </Link>
            </Grid>
            <Grid item xs={2}>
                <Box display='flex' maxWidth='32px' justifyContent='center'>
                    <PopupTooltip title={buttonTooltip}>
                        <Button size='small' {...{onClick}} sx={{minWidth: 0, padding: 0,  width: '60%', lineHeight: 1.55,
                            color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main}}
                        >
                            +
                        </Button>
                    </PopupTooltip>
                </Box>
            </Grid>
        </Grid>
    )}

    

    return (
        <>
        <Divider variant='middle' sx={{margin: '20px 0 15px'}} />
        <FieldArray {...{name}} render={arrayHelpers => (
            <>
            <AdditionalInfoTitle onClick={() => arrayHelpers.push(emptyLineDictionary[name] || '')} />

            {!!values[name]?.length ? values[name].map((_, index) => (
                <Grid container spacing={1} width='100%' key={index} sx={{marginBottom: '10px'}} 
                // onBlur={() => deleteEmptyLines(values, name, emptyLineDictionary)}
                >
                    {!Array.isArray(textInputLabel) ?

                    <Grid item xs={10}>
                        <AdminTextInput label={textInputLabel} name={`${name}.${index}`} sx={{ width: '100%' }} />
                    </Grid> :

                    <>
                    {textInputLabel.map((_ , i) => (
                    <Grid item xs={Math.floor(10 / textInputLabel.length)} key={i}>
                    <AdminTextInput label={textInputLabel[i]} name={`${name}.${index}.${textInputLabelKey[i]}`} sx={{ width: '100%' }} />
                    </Grid>
                    ))}
                    </>}
                    
                    <Grid item xs={2}>
                        <IconButton onClick={() => arrayHelpers.remove(index)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                    {/* {console.log(meta)} */}
                    
                    {errors?.[name] && index === values[name].length - 1 && <FormHelperText sx={{padding: '4px 0 0 14px'}}>{errors?.[name]}</FormHelperText>}
                </Grid>
            )) : 
            <Box display='flex' justifyContent='center'>{notFoundText}</Box>}
            </>
            )}
        />
        </>
    )
}

const AdditionalInfoMenu = ({errors, values}) => (
    <>
    <AdditionalInfoField 
        {...{errors, values}}
        name='otherUses'
        title='A karakter egyéb jelentései' 
        titleLink='/admin/other-use-list'
        buttonTooltip='Egyéb jelentés hozzáadása' 
        textInputLabel={['Egyéb jelentés', 'Kiejtése ilyenkor']}
        textInputLabelKey={['otherUseHungarian', 'pinyin']}
        notFoundText='Nincs egyéb jelentés.' 
    />
    <AdditionalInfoField
        {...{errors, values}}
        name='similarAppearance'
        title='Hasonló kinézetű karakterek'
        titleLink='/admin/similar-list/appearance'
        buttonTooltip='Hasonló kinézetű karakter hozzáadása' 
        textInputLabel='Hasonló kinézetű karakter' 
        notFoundText='Nincs hasonló kinézetű karakter.' 
    />
    <AdditionalInfoField
        {...{errors, values}}
        name='similarMeaning'
        title='Hasonló jelentésű karakterek'
        titleLink='/admin/similar-list/meaning'
        buttonTooltip='Hasonló jelentésű karakter hozzáadása' 
        textInputLabel='Hasonló jelentésű karakter' 
        notFoundText='Nincs hasonló jelentésű karakter.' 
    />
    <AdditionalInfoField
        {...{errors, values}}
        name='phrases'
        title='Kifejezések a karakterrel'
        titleLink='/admin/phrase-list'
        buttonTooltip='Kifejezés hozzáadása' 
        textInputLabel={['Kifejezés', 'Jelentése']}
        textInputLabelKey={['phraseChinese', 'phraseHungarian']}
        notFoundText='Nincs kifejezés a karakterrel.' 
    />
    </>
)

export { AdditionalInfoMenu }